import type { Localized } from "@/i18n/ui";

export interface Certification {
  readonly title: Localized;
  readonly issuer: string;
  readonly date: string;
  readonly link?: string;
  readonly skills: readonly string[];
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    title: { en: "FullStack Engineer", fr: "Ingénieur FullStack" },
    issuer: "EDACY",
    date: "2025",
    skills: ["Full Stack Development", "Software Engineering", "Web Development", "Application Architecture"],
  },
  {
    title: { en: "Legacy Full Stack Developer", fr: "Legacy Full Stack Developer" },
    issuer: "freeCodeCamp",
    date: "2023",
    link: "https://www.freecodecamp.org/certification/niangamadou888/full-stack",
    skills: ["Responsive Web Design", "JavaScript Algorithms", "Data Visualization", "Front End", "Back End"],
  },
  {
    title: { en: "Python Development", fr: "Développement Python" },
    issuer: "FORCE-N",
    date: "2023",
    link: "https://formation.force-n.sn/mod/customcert/verify_certificate.php?contextid=418479&code=FI0GkJ2BIi",
    skills: ["Python", "Angular", "Django", "SQL/NoSQL", "Git", "Docker"],
  },
  {
    title: { en: "Network Administrator", fr: "Administrateur Réseau" },
    issuer: "IMSAS",
    date: "2023",
    skills: ["Network Security", "System Administration", "Protocols", "Troubleshooting", "Infrastructure"],
  },
];
