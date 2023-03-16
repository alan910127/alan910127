import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { motion } from "framer-motion";
import { type NextPage } from "next";
import Image from "next/image";
import avatar from "~/images/avatar.jpg";

const HomePage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan" currentLabel="Home">
      <main className="flex h-full flex-col items-center justify-center gap-16 px-4 font-main">
        <motion.section
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          <Image src={avatar} alt="Avatar" className="h-64 w-64 rounded-full" />
        </motion.section>
        <motion.section
          className="flex flex-col gap-4 text-slate-700"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <h1 className="flex flex-col items-center text-2xl">
            <span>Hello, my name is</span>
            <strong className="text-6xl font-bold">Li-Lun Lin</strong>
          </h1>
          <p className="-mt-4 text-center text-xl">You can also call me Alan</p>
          <p className="text-center text-xl italic text-slate-500">
            A passionate learner in Computer Science and new technology
          </p>
        </motion.section>
      </main>
    </ElevatorLayout>
  );
};

export default HomePage;
