import cn from "classnames";
import { motion } from "framer-motion";
import { atom, useAtom, useAtomValue } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsClipboardDataFill, BsFillPersonFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

const labels = [
  "Home",
  "About Me",
  "Projects",
  "Contact Me",
  "Error!",
] as const;
const [homeLabel, aboutMeLabel, projectsLabel, contactMeLabel] = labels;
type ElevatorLabel = (typeof labels)[number];

type LinkDetail = {
  href: string;
  label: ElevatorLabel;
  display: ReactNode;
};

const links: LinkDetail[] = [
  {
    href: "/",
    label: homeLabel,
    display: <AiFillHome className="text-xl" />,
  },
  {
    href: "/about",
    label: aboutMeLabel,
    display: <BsFillPersonFill className="text-xl" />,
  },
  {
    href: "/projects",
    label: projectsLabel,
    display: <BsClipboardDataFill className="text-xl" />,
  },
  {
    href: "/contact",
    label: contactMeLabel,
    display: <HiMail className="text-xl" />,
  },
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

const pageIndexAtom = atom({ fromIndex: 0, toIndex: 0 });
const shouldElevatorGoUpAtom = atom(
  (get) => get(pageIndexAtom).toIndex < get(pageIndexAtom).fromIndex
);

const transition = { duration: 1 };
const delayedTransition = { delay: 1, duration: 1 };

type ElevatorProps = PropsWithChildren<{
  currentLabel: ElevatorLabel;
}>;

const Elevator: FC<PropsWithChildren<ElevatorProps>> = ({
  children,
  currentLabel,
}) => {
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);

  return (
    <div className="flex h-full w-full">
      {/* left hand side of the elevator */}
      <div className="ml-auto hidden h-full sm:block sm:min-w-[5rem] md:min-w-[6-rem] lg:min-w-[8rem]" />

      {/* middle of the elevator */}
      <div className="flex h-full flex-grow flex-col xl:max-w-screen-xl">
        {/* top information panel */}
        <div className="flex h-32 flex-col items-center justify-end">
          <p className="mb-4 flex h-8 w-40 items-center justify-center overflow-hidden rounded bg-slate-800">
            <ElevatorLabel currentLabel={currentLabel} />
          </p>
        </div>

        {/* door and page content */}
        <div className="relative w-full flex-1 overflow-hidden bg-content">
          <div className="absolute flex h-full w-full">
            <ElevatorDoor direction="left" />
            <ElevatorDoor direction="right" />
          </div>

          <ElevatorContentArea>{children}</ElevatorContentArea>
        </div>
      </div>

      {/* right hand side of the elevator */}
      <div className="mr-auto flex h-full items-center px-4 md:min-w-[6-rem] lg:min-w-[8rem]">
        <nav className="rounded-md border border-gray-500 bg-gray-400 p-2 shadow-lg">
          <ul className="flex flex-col justify-center gap-4">
            {links.map((link, index) => (
              <ElevatorButton
                key={link.label}
                href={link.href}
                onClick={() => setPageIndex({ ...pageIndex, toIndex: index })}
              >
                {link.display}
              </ElevatorButton>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const ElevatorLabel: FC<{
  currentLabel: ElevatorLabel;
}> = ({ currentLabel }) => {
  const shouldElevatorGoUp = useAtomValue(shouldElevatorGoUpAtom);

  return (
    <motion.span
      className="select-none font-elevator text-xl font-extrabold text-white"
      initial={{ y: shouldElevatorGoUp ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      exit={{
        y: shouldElevatorGoUp ? "100%" : "-100%",
        transition: delayedTransition,
      }}
      transition={transition}
    >
      {currentLabel}
    </motion.span>
  );
};

const ElevatorContentArea: FC<PropsWithChildren> = ({ children }) => {
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
  const shouldElevatorGoUp = useAtomValue(shouldElevatorGoUpAtom);

  return (
    <motion.div
      className="absolute h-full w-full overflow-hidden border-2 border-b-0 border-gray-600"
      initial={{ y: shouldElevatorGoUp ? "-100%" : "100%" }}
      animate={{ y: 0 }}
      exit={{
        y: shouldElevatorGoUp ? "100%" : "-100%",
        transition: delayedTransition,
      }}
      transition={transition}
      onAnimationComplete={(def) => {
        // @ts-expect-error TS2339 (def is not typed properly)
        if (def.y === 0) {
          setPageIndex({ fromIndex: pageIndex.toIndex, toIndex: 0 });
        }
      }}
    >
      {children}
    </motion.div>
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
      initial={{ x: 0, zIndex: 99 }}
      animate={{ x: targetX }}
      exit={{ x: 0, transition: transition }}
      transition={delayedTransition}
    />
  );
};

type ElevatorButtonProps = {
  href: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
};

const ElevatorButton: FC<PropsWithChildren<ElevatorButtonProps>> = ({
  href,
  children,
  onClick,
}) => {
  const router = useRouter();

  return (
    <li
      className={cn("h-9 w-9 rounded-full bg-gray-300", {
        "outline outline-orange-400": router.pathname === href,
      })}
      onClick={onClick}
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
