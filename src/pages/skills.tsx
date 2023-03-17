import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import cn from "classnames";
import { LayoutGroup, motion } from "framer-motion";
import { type NextPage } from "next";
import { useMemo, useState, type FC } from "react";

const SkillsPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | Skills" currentLabel="Skills">
      <main className="items-begin flex h-full flex-col flex-wrap justify-center gap-8 px-16 font-main">
        <ProgrammingLanguageSection />

        <WebDevelopmentSection />

        <OthersSection />
      </main>
    </ElevatorLayout>
  );
};

export default SkillsPage;

const rankFields = ["favorite", "proficiency"] as const;
type RankFields = (typeof rankFields)[number];

type LanguageMeta = { name: string } & Record<RankFields, number>;

const languagesMeta: LanguageMeta[] = [
  { name: "Rust", favorite: 1, proficiency: 4 },
  { name: "C++", favorite: 4, proficiency: 1 },
  { name: "Python", favorite: 3, proficiency: 3 },
  { name: "TypeScript", favorite: 2, proficiency: 2 },
];

const ProgrammingLanguageSection: FC = () => {
  const [rankField, setRankField] = useState<RankFields>("favorite");

  const languages = useMemo(() => {
    return [...languagesMeta].sort((a, b) => a[rankField] - b[rankField]);
  }, [rankField]);

  return (
    <section className="w-full">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-end md:gap-4">
        <h2 className="text-xl font-bold">Programming Languages</h2>
        <p className="flex gap-2 text-slate-600">
          <span>Rank by</span>
          {rankFields.map((fieldName, index) => (
            <>
              <button
                key={fieldName}
                onClick={() => setRankField(fieldName)}
                className={cn("underline", {
                  "font-bold": rankField === fieldName,
                })}
              >
                {fieldName}
              </button>
              {index < rankFields.length - 1 && <span key={index}> | </span>}
            </>
          ))}
        </p>
      </div>
      <LayoutGroup>
        <ol className="flex gap-4 px-4">
          {languages.map((language) => (
            <motion.li
              key={language.name}
              layout
              initial="initial"
              animate="animate"
              className="text-lg"
            >
              {language.name}
            </motion.li>
          ))}
        </ol>
      </LayoutGroup>
    </section>
  );
};

const WebDevelopmentSection: FC = () => {
  const skills = [
    "React",
    "Vue.js",
    "Next.js",
    "Astro",
    "Tailwind CSS",
    "tRPC",
    "GraphQL",
    "REST API",
    "Express.js",
    "fastify",
    "FastAPI",
    "Flask",
    "Prisma",
  ];

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold">Web Development</h2>
      <ul className="flex flex-wrap gap-4 px-4">
        {skills.map((name) => (
          <li key={name} className="text-lg">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
};

const OthersSection: FC = () => {
  const skills = ["Docker", "Git", "LaTeX"];
  return (
    <section className="w-full">
      <h2 className="text-xl font-bold">Others</h2>
      <ul className="flex flex-wrap gap-4 px-4">
        {skills.map((name) => (
          <li key={name} className="text-lg">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
};
