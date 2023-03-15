import { type AppType } from "next/dist/shared/lib/utils";
import { Electrolize, Inter } from "next/font/google";

import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const electrolize = Electrolize({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-electrolize",
});

const MyApp: AppType = ({ Component, pageProps, router }) => {
  return (
    <AnimatePresence mode="wait">
      <div
        key={(router as { asPath: string }).asPath}
        className={`${inter.variable} ${electrolize.variable} h-screen w-full`}
      >
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  );
};

export default MyApp;
