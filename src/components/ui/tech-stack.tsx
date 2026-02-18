interface TechItemProps {
  name: string;
  icon: string;
}

function TechItem({ name, icon }: TechItemProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-full text-sm group hover:bg-primary/10 transition-all duration-300">
      <img
        src={icon}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
      />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  const technologies = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Angular",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
    },
    {
      name: "Next",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    },
    {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
      name: "Unity",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech) => (
        <TechItem key={tech.name} {...tech} />
      ))}
    </div>
  );
}
