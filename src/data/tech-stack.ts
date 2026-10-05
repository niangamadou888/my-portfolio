export interface Tech {
  readonly name: string;
  readonly icon: string;
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const TECH_STACK: readonly Tech[] = [
  { name: "React", icon: `${DEVICON}/react/react-original.svg` },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "SQL", icon: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "MongoDB", icon: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: "Angular", icon: `${DEVICON}/angularjs/angularjs-original.svg` },
  { name: "Java", icon: `${DEVICON}/java/java-original.svg` },
  { name: "Spring Boot", icon: `${DEVICON}/spring/spring-original.svg` },
  { name: "C#", icon: `${DEVICON}/csharp/csharp-original.svg` },
  { name: "Unity", icon: `${DEVICON}/unity/unity-original.svg` },
  { name: "Git", icon: `${DEVICON}/git/git-original.svg` },
];
