import { ScrollableMain } from "@/components/ScrollableMain";
import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import cn from "classnames";
import { LayoutGroup, motion } from "framer-motion";
import { type NextPage } from "next";
import { useMemo, useState, type FC } from "react";

const SkillsPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | Skills" currentLabel="Skills">
      <ScrollableMain className="flex flex-col gap-8">
        <ProgrammingLanguageSection />

        <SkillSection
          title="Web Development"
          skillsList={[
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
          ]}
        />

        <SkillSection title="Others" skillsList={["Docker", "Git", "LaTeX"]} />
      </ScrollableMain>
    </ElevatorLayout>
  );
};

export default SkillsPage;

const rankFields = ["favorite", "proficiency"] as const;
type RankFields = (typeof rankFields)[number];

type LanguageMeta = { name: string } & Record<RankFields, number>;

const languagesMeta: LanguageMeta[] = [
  { name: "Rust", favorite: 1, proficiency: 4 },
  { name: "C++", favorite: 3, proficiency: 1 },
  { name: "Python", favorite: 4, proficiency: 3 },
  { name: "TypeScript", favorite: 2, proficiency: 2 },
];

const ProgrammingLanguageSection: FC = () => {
  const [rankField, setRankField] = useState<RankFields>("favorite");

  const languages = useMemo(() => {
    return [...languagesMeta].sort((a, b) => a[rankField] - b[rankField]);
  }, [rankField]);

  return (
    <section className="w-full">
      <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-end">
        <h2 className="text-xl font-bold">Programming Languages</h2>
        <p className="flex flex-wrap gap-2 text-slate-600">
          <span>Rank by</span>
          <div>
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
          </div>
        </p>
      </div>
      <LayoutGroup>
        <ol className="my-4 flex flex-wrap gap-4 pl-4">
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

type SkillSectionProps = {
  title: string;
  skillsList: string[];
};

const SkillSection: FC<SkillSectionProps> = ({ skillsList, title }) => {
  return (
    <section className="w-full">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <ul className="flex flex-wrap gap-4 px-4">
        {skillsList.map((name) => (
          <li key={name} className="text-lg">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
};
