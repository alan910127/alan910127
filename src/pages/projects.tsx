import { Carousel } from "@/components/Carousel";
import { ScrollableMain } from "@/components/ScrollableMain";
import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { type NextPage } from "next";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { type FC, type PropsWithChildren } from "react";

import apiBuilderImage from "~/images/api-builder.png";
import studyImage from "~/images/study.jpg";

const ProjectsPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | Projects" currentLabel="Projects">
      <ScrollableMain className="h-full">
        <section className="relative h-full w-full">
          <Carousel
            items={[
              <ProjectArticle
                key="Next.js API Builder"
                imageSrc={apiBuilderImage}
                imageAlt="API builder"
                title="Next.js REST API Builder"
                tags={[
                  "Next.js",
                  "TypeScript",
                  "RESTful API",
                  "Type Inference",
                  "Schema Validation",
                ]}
                repoLink="https://github.com/alan910127/next-api-builder"
              >
                A schema validation based type safe REST API builder designed to
                work with Next.js{" "}
                <code className="rounded bg-gray-100 px-2">pages/api</code>{" "}
                directory.
              </ProjectArticle>,

              <ProjectArticle
                key="placeholder"
                imageSrc={studyImage}
                imageAlt="placeholder"
                title="Placeholder"
                repoLink="https://github.com/alan910127/next-api-builder"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto doloribus voluptates dolorem minima id corporis, ipsa
                nam provident dolorum similique earum, praesentium voluptatem
                nihil nulla tempore aspernatur exercitationem! Accusantium,
                eveniet!
              </ProjectArticle>,
            ]}
          />
        </section>
      </ScrollableMain>
    </ElevatorLayout>
  );
};

export default ProjectsPage;

type ProjectArticleProps = PropsWithChildren<{
  imageSrc: ImageProps["src"];
  imageAlt: ImageProps["alt"];
  title: string;
  repoLink: string;
  tags?: string[];
}>;

const ProjectArticle: FC<ProjectArticleProps> = ({
  imageSrc,
  imageAlt,
  title,
  repoLink,
  tags,
  children,
}) => {
  return (
    <article className="inline-grid h-full grid-cols-1 items-center overflow-y-auto rounded-xl bg-white shadow-2xl scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-400 md:grid-cols-2">
      <Image src={imageSrc} alt={imageAlt} className="object-cover" />
      <div className="flex flex-col items-start justify-center gap-4 px-4 py-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul className="flex w-full gap-1 overflow-x-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-400">
          {tags &&
            tags.map((tag) => (
              <li
                key={tag}
                className="whitespace-nowrap rounded bg-gray-100 px-2 text-sm"
              >
                {tag}
              </li>
            ))}
        </ul>
        <p>{children}</p>
        <Link
          href={repoLink}
          className="rounded-lg bg-blue-300 px-4 py-2 hover:bg-blue-400"
        >
          GitHub Repository
        </Link>
      </div>
    </article>
  );
};
