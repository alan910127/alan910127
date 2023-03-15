import cn from "classnames";
import { motion } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, type PropsWithChildren, type ReactNode } from "react";

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

const transition = { duration: 1 };
const delayedTransition = { delay: 1, duration: 1 };

type ElevatorProps = PropsWithChildren<{
  currentLabel: ElevatorLabel;
}>;

const Elevator: FC<PropsWithChildren<ElevatorProps>> = ({
  children,
  currentLabel,
}) => {
  return (
    <div className="flex h-full w-full">
      {/* left hand side of the elevator */}
      <div className="ml-auto hidden h-full sm:block sm:min-w-[5rem] md:min-w-[6-rem] lg:min-w-[8rem]" />

      {/* middle of the elevator */}
      <div className="flex h-full flex-grow flex-col xl:max-w-screen-xl">
        {/* top information panel */}
        <div className="flex h-32 flex-col items-center justify-end">
          <p className="mb-4 flex h-8 w-40 items-center justify-center overflow-hidden rounded bg-black">
            <motion.span
              className="select-none font-elevator text-xl font-extrabold text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%", transition: delayedTransition }}
              transition={transition}
            >
              {currentLabel}
            </motion.span>
          </p>
        </div>

        {/* door and page content */}
        <div className="relative z-[-100] w-full flex-1 overflow-hidden bg-content">
          <div className="absolute flex h-full w-full">
            <ElevatorDoor direction="left" />
            <ElevatorDoor direction="right" />
          </div>

          <motion.div
            className="absolute h-full w-full overflow-hidden border-2 border-gray-600"
            initial={{ y: "100%" }}
            animate={{ y: 0, zIndex: -1, transitionEnd: { zIndex: 0 } }}
            exit={{ y: "-100%", transition: delayedTransition }}
            transition={transition}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* right hand side of the elevator */}
      <div className="mr-auto flex h-full items-center px-4 md:min-w-[6-rem] lg:min-w-[8rem]">
        <nav className="rounded-md border border-gray-500 bg-gray-400 p-2 shadow-lg">
          <ul className="flex flex-col justify-center gap-4">
            {links.map((link) => (
              <ElevatorButton key={link.label} href={link.href}>
                {link.display}
              </ElevatorButton>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

type ElevatorDoorProps = {
  direction: "left" | "right";
};

const ElevatorDoor: FC<ElevatorDoorProps> = ({ direction }) => {
  const targetX = direction === "left" ? "-100%" : "100%";
  return (
    <motion.div
      key={`door-${direction}`}
      className="box-border h-full w-1/2 border-8 border-gray-300 bg-green-100/30 backdrop-blur"
      initial={{ x: 0 }}
      animate={{ x: targetX, zIndex: 99 }}
      exit={{ x: 0, transition: transition }}
      transition={delayedTransition}
    />
  );
};

type ElevatorButtonProps = {
  href: string;
};

const ElevatorButton: FC<PropsWithChildren<ElevatorButtonProps>> = ({
  href,
  children,
}) => {
  const router = useRouter();

  return (
    <li
      className={cn("h-9 w-9 rounded-full bg-gray-300", {
        "outline outline-orange-400": router.route === href,
      })}
    >
      <Link
        href={href}
        className="flex h-full w-full items-center justify-center"
      >
        {children}
      </Link>
    </li>
  );
};
