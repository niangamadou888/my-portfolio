import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Mail, MessageSquare, Send, User } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

const CONTACT_ENDPOINT = "/api/contact";

type Field = "name" | "email" | "subject" | "message";

export interface ContactLabels {
  readonly name: string;
  readonly namePlaceholder: string;
  readonly email: string;
  readonly emailPlaceholder: string;
  readonly subject: string;
  readonly subjectPlaceholder: string;
  readonly message: string;
  readonly messagePlaceholder: string;
  readonly send: string;
  readonly sending: string;
  readonly successTitle: string;
  readonly successText: string;
  readonly errors: Readonly<Record<Field, string>>;
  readonly tooMany: string;
  readonly failed: string;
  readonly orEmail: string;
}

interface ContactFormProps {
  readonly labels: ContactLabels;
  readonly email: string;
}

interface FieldShellProps {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly error?: string;
  readonly children: ReactNode;
}

function FieldShell({ id, label, icon, error, children }: FieldShellProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/70">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs mt-1 text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ labels, email }: ContactFormProps) {
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // A second click can land before React re-renders the disabled button; this blocks the duplicate POST.
  const inFlight = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  useEffect(() => setReady(true), []);

  // The form is replaced by the success panel; move focus there so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const failedMessage = `${labels.failed} ${email}.`;

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    if (inFlight.current) return;
    inFlight.current = true;
    setSendError(null);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 429) {
        setSendError(labels.tooMany);
        return;
      }
      if (!response.ok) {
        setSendError(failedMessage);
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setSendError(failedMessage);
    } finally {
      inFlight.current = false;
    }
  };

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    className: "form-input",
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  if (submitted) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-center justify-center py-16 gap-5 text-center"
      >
        <CheckCircle className="w-16 h-16 text-[#d6c9b6]" aria-hidden="true" />
        <p className="text-2xl font-semibold text-white/90">{labels.successTitle}</p>
        <p className="text-white/70">{labels.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell
          id="contact-name"
          label={labels.name}
          icon={<User className="w-3.5 h-3.5" aria-hidden="true" />}
          error={errors.name ? labels.errors.name : undefined}
        >
          <input {...register("name")} {...fieldProps("name")} placeholder={labels.namePlaceholder} autoComplete="name" />
        </FieldShell>
        <FieldShell
          id="contact-email"
          label={labels.email}
          icon={<Mail className="w-3.5 h-3.5" aria-hidden="true" />}
          error={errors.email ? labels.errors.email : undefined}
        >
          <input
            {...register("email")}
            {...fieldProps("email")}
            type="email"
            placeholder={labels.emailPlaceholder}
            autoComplete="email"
          />
        </FieldShell>
      </div>

      <FieldShell id="contact-subject" label={labels.subject} error={errors.subject ? labels.errors.subject : undefined}>
        <input {...register("subject")} {...fieldProps("subject")} placeholder={labels.subjectPlaceholder} />
      </FieldShell>

      <FieldShell
        id="contact-message"
        label={labels.message}
        icon={<MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />}
        error={errors.message ? labels.errors.message : undefined}
      >
        <textarea
          {...register("message")}
          {...fieldProps("message")}
          rows={5}
          placeholder={labels.messagePlaceholder}
          style={{ resize: "none" }}
        />
      </FieldShell>

      <button
        type="submit"
        disabled={!ready || isSubmitting}
        className="btn-glow w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60"
        style={{
          background: "rgba(214, 201, 182, 0.15)",
          border: "1px solid rgba(214, 201, 182, 0.3)",
          boxShadow: "0 0 20px rgba(214, 201, 182, 0.15)",
        }}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            {labels.sending}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {labels.send}
          </>
        )}
      </button>

      {sendError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-red-200"
          style={{ background: "rgba(248, 113, 113, 0.08)", border: "1px solid rgba(248, 113, 113, 0.25)" }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{sendError}</span>
        </div>
      )}

      <p className="text-center text-sm text-white/65">
        {labels.orEmail}{" "}
        <a href={`mailto:${email}`} className="text-[#d6c9b6] hover:text-white transition-colors">
          {email}
        </a>
      </p>
    </form>
  );
}
