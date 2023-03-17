import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { AnimatePresence, motion } from "framer-motion";
import { type NextPage } from "next";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import {
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import apiBuilderImage from "~/images/api-builder.png";
import studyImage from "~/images/study.jpg";

const ProjectsPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | Projects" currentLabel="Projects">
      <main className="flex h-full flex-col items-center justify-center font-main">
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

          {/* <ProjectArticle
            imageSrc={apiBuilderImage}
            imageAlt="API builder"
            title="Next.js REST API Builder"
            repoLink="https://github.com/alan910127/next-api-builder"
          >
            A schema validation based type safe REST API builder designed to
            work with Next.js{" "}
            <code className="rounded bg-gray-100 px-2">pages/api</code>{" "}
            directory.
          </ProjectArticle> */}
        </section>
      </main>
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
    <article className="inline-grid w-full grid-cols-1 items-center overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-2xl md:grid-cols-2">
      <Image src={imageSrc} alt={imageAlt} className="object-cover" />
      <div className="flex flex-col items-start justify-center gap-4 px-4 py-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul className="flex gap-1">
          {(tags ?? []).map((tag) => (
            <li key={tag} className="rounded bg-gray-100 px-2 text-sm">
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

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const wrap = (min: number, max: number, value: number) => {
  const step = max - min;

  while (value < min) value += step;
  while (value >= max) value -= step;

  return value;
};

const Carousel = <TItem extends ReactNode>({ items }: { items: TItem[] }) => {
  const [[currentIndex, slideDirection], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage(([index]) => [
      wrap(0, items.length, index + newDirection),
      newDirection,
    ]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={currentIndex}
          className="inline-flex h-full w-full items-center px-8"
          custom={slideDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(1);
            }
          }}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-4 z-10 flex -translate-y-1/2 select-none items-center justify-center rounded-full bg-gray-300/50 p-2"
        onClick={() => paginate(-1)}
      >
        <BsChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 z-10 flex -translate-y-1/2 select-none items-center justify-center rounded-full bg-gray-300/50 p-2"
        onClick={() => paginate(1)}
      >
        <BsChevronRight />
      </button>
    </>
  );
};
