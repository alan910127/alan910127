import { motion } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren, type ReactNode } from "react";

const labels = ["Home", "About Me", "Projects", "Contact Me"] as const;
const [home, aboutMe, projects, contactMe] = labels;
type ElevatorLabel = (typeof labels)[number];

type LinkDetail = {
  href: string;
  label: ElevatorLabel;
  display: ReactNode;
};

const links: LinkDetail[] = [
  { href: "/", label: home, display: <div>A</div> },
  { href: "/about", label: aboutMe, display: <div>A</div> },
  { href: "/projects", label: projects, display: <div>A</div> },
  { href: "/contact", label: contactMe, display: <div>A</div> },
];

type ElevatorLayoutProps = PropsWithChildren<{
  title: string;
  currentLabel: ElevatorLabel;
}>;

export const ElevatorLayout: NextPage<ElevatorLayoutProps> = ({
  title,
  children,
  currentLabel,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Li-Lun's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Elevator currentLabel={currentLabel}>{children}</Elevator>
    </>
  );
};

type ElevatorProps = PropsWithChildren<{
  currentLabel: ElevatorLabel;
}>;

const Elevator = ({
  children,
  currentLabel,
}: PropsWithChildren<ElevatorProps>) => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-32 w-full bg-elevator">
        <p className="absolute bottom-0 mb-4 ml-16 h-8 w-40 overflow-hidden rounded bg-black font-elevator text-xl font-extrabold text-orange-300">
          <motion.span
            className="absolute inset-0 flex select-none items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1, delay: 1 } }}
            transition={{ duration: 1 }}
          >
            {currentLabel}
          </motion.span>
        </p>
      </div>
      <div className="flex h-full justify-between">
        <div className="hidden bg-elevator" />
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute z-0 flex h-full w-full">
            <motion.div
              key="door-left"
              className="z-0 box-border h-full w-1/2 border-8 border-gray-300 bg-green-100/30 backdrop-blur"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: 0, transition: { delay: 0, duration: 1 } }}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.div
              key="door-right"
              className="z-0 box-border h-full w-1/2 border-8 border-gray-300 bg-green-100/30 backdrop-blur"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: 0, transition: { delay: 0, duration: 1 } }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
          <motion.div
            className="absolute -z-10 h-full w-full"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { delay: 1, duration: 1 } }}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.div>
        </div>
        <div className="h-full bg-elevator px-4">
          <menu className="mt-16 flex flex-col gap-4">
            {links.map((link, index) => (
              <li
                key={index}
                className={`h-9 w-9 rounded-full bg-gray-500 ${
                  router.route === link.href ? "outline outline-orange-400" : ""
                }`}
              >
                <Link
                  href={link.href}
                  className="flex h-full w-full items-center justify-center text-white"
                >
                  {link.display}
                </Link>
              </li>
            ))}
          </menu>
        </div>
      </div>
    </div>
  );
};
