import { motion } from "framer-motion";
import { MailIcon, UserIcon, MessageSquareIcon, SendIcon, CheckCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 900));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.85)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  return (
    <section id="contact" className="section-container">
      <span className="section-num" aria-hidden="true">06</span>

      <div className="orb orb-purple" style={{ width: 500, height: 500, top: '-5%', left: '-10%', opacity: 0.1 }} />
      <div className="orb orb-pink" style={{ width: 350, height: 350, bottom: '0%', right: '-8%', opacity: 0.08 }} />

      <div className="section-inner" style={{ maxWidth: '56rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(214, 201, 182, 0.8)' }}>
            06 — {t('nav.contact')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text-pink mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card glow-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Accent corner glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(214,201,182,0.06), transparent 70%)' }}
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 gap-5 text-center"
              >
                <CheckCircleIcon className="w-16 h-16" style={{ color: '#d6c9b6' }} />
                <h3 className="text-2xl font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Message sent!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      <UserIcon className="w-3.5 h-3.5" />
                      Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(214, 201, 182, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(214, 201, 182, 0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      <MailIcon className="w-3.5 h-3.5" />
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(214, 201, 182, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(214, 201, 182, 0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    placeholder="What's this about?"
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(214, 201, 182, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(214, 201, 182, 0.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.subject && (
                    <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <MessageSquareIcon className="w-3.5 h-3.5" />
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(214, 201, 182, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(214, 201, 182, 0.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60"
                  style={{
                    cursor: 'none',
                    background: 'rgba(214, 201, 182, 0.15)',
                    border: '1px solid rgba(214, 201, 182, 0.3)',
                    boxShadow: '0 0 20px rgba(214, 201, 182, 0.15)',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting)
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 35px rgba(214, 201, 182, 0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(214, 201, 182, 0.15)';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-4 h-4" />
                      {t('contact.cta')}
                    </>
                  )}
                </button>

                {/* Alternative contact */}
                <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {t('contact.footer')}{' '}
                  <a
                    href="mailto:amadouniang2001@gmail.com"
                    style={{ color: 'rgba(214, 201, 182, 0.7)', cursor: 'none' }}
                    className="hover:opacity-100 transition-opacity"
                  >
                    amadouniang2001@gmail.com
                  </a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
