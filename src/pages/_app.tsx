import { type AppType } from "next/dist/shared/lib/utils";
import { Electrolize, Sofia_Sans } from "next/font/google";

import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

const main = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-main",
});

const elevator = Electrolize({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-elevator",
});

const MyApp: AppType = ({ Component, pageProps, router }) => {
  return (
    <AnimatePresence mode="wait">
      <div
        key={(router as { asPath: string }).asPath}
        className={`${main.variable} ${elevator.variable} h-screen w-full`}
      >
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  );
};

export default MyApp;
