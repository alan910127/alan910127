import { AnimatePresence, motion } from "framer-motion";
import { useState, type FC, type ReactNode } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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

type CarouselProps = { items: ReactNode[] };

export const Carousel: FC<CarouselProps> = ({ items }) => {
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
          className="absolute inset-4"
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
        className="absolute top-1/2 left-0 z-10 flex -translate-y-1/2 select-none items-center justify-center rounded-full bg-gray-300/50 p-2"
        onClick={() => paginate(-1)}
      >
        <BsChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-0 z-10 flex -translate-y-1/2 select-none items-center justify-center rounded-full bg-gray-300/50 p-2"
        onClick={() => paginate(1)}
      >
        <BsChevronRight />
      </button>
    </>
  );
};
