import type { ReactElement } from "react";
import { FaAngular, FaJava, FaNode, FaReact, FaUnity } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import { SiExpress, SiMongodb, SiMysql, SiSharp, SiSpringboot, SiTailwindcss, SiTypescript } from "react-icons/si";

const ICON_CLASS = "inline-block mr-1 text-base";

const ICONS: Readonly<Record<string, ReactElement>> = {
  React: <FaReact className={ICON_CLASS} style={{ color: "#61DAFB" }} />,
  TypeScript: <SiTypescript className={ICON_CLASS} style={{ color: "#3178C6" }} />,
  "Tailwind CSS": <SiTailwindcss className={ICON_CLASS} style={{ color: "#06B6D4" }} />,
  "Node.js": <FaNode className={ICON_CLASS} style={{ color: "#339933" }} />,
  Express: <SiExpress className={ICON_CLASS} />,
  MongoDB: <SiMongodb className={ICON_CLASS} style={{ color: "#47A248" }} />,
  Angular: <FaAngular className={ICON_CLASS} style={{ color: "#DD0031" }} />,
  Java: <FaJava className={ICON_CLASS} style={{ color: "#007396" }} />,
  SpringBoot: <SiSpringboot className={ICON_CLASS} style={{ color: "#6DB33F" }} />,
  MySQL: <SiMysql className={ICON_CLASS} style={{ color: "#4479A1" }} />,
  Unity: <FaUnity className={ICON_CLASS} />,
  "C#": <SiSharp className={ICON_CLASS} style={{ color: "#239120" }} />,
  JavaScript: <IoLogoJavascript className={ICON_CLASS} style={{ color: "#F7DF1E" }} />,
  "Next.js": <RiNextjsFill className={ICON_CLASS} />,
};

interface TechTagProps {
  readonly name: string;
}

export default function TechTag({ name }: TechTagProps) {
  const icon = ICONS[name];
  return (
    <span className="tag-pill">
      {icon && <span aria-hidden="true">{icon}</span>}
      {name}
    </span>
  );
}
