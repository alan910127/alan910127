import { ScrollableMain } from "@/components/ScrollableMain";
import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { motion } from "framer-motion";
import { type NextPage } from "next";
import Image from "next/image";

import hobbyImage from "~/images/hobby.jpg";
import studyImage from "~/images/study.jpg";

const AboutPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | About" currentLabel="About Me">
      <ScrollableMain className="flex flex-col gap-8 lg:gap-16">
        <motion.section
          className="flex w-full items-center gap-8"
          initial={{ opacity: 0, x: "-25%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Image
            src={studyImage}
            alt="Study"
            className="hidden w-1/4 rounded object-cover shadow-lg lg:block"
            placeholder="blur"
          />
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="text-3xl font-bold">Who am I</h2>
            <p className="px-4 text-xl">
              My name is Li-Lun Lin (林立倫). I am currently a junior in
              computer science at National Yang Ming Chiao Tung University
              (NYCU). I am also working on a Human Computer Interaction (HCI)
              research project about mobile advertising at Mobile and Ubiquitous
              Interaction (MUI) Lab.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="flex w-full flex-row-reverse items-center gap-8"
          initial={{ opacity: 0, x: "25%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Image
            src={hobbyImage}
            alt="Study"
            className="hidden w-1/4 rounded object-cover shadow-lg lg:block"
            placeholder="blur"
          />
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="text-3xl font-bold">My Favorite Things</h2>
            <p className="px-4 text-xl">
              I am insterested with various things. For entertainment, I likes
              to play badminton with my friends at school, in addition, the
              online game I like the most is KartRider and my favorite anime
              character is Crayon Shinchan.
            </p>
          </div>
        </motion.section>
      </ScrollableMain>
    </ElevatorLayout>
  );
};

export default AboutPage;
