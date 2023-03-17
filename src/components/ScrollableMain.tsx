import cn from "classnames";
import { type FC, type PropsWithChildren } from "react";

type ScrollableMainProps = PropsWithChildren<{
  className?: string;
}>;

export const ScrollableMain: FC<ScrollableMainProps> = ({
  children,
  className,
}) => {
  return (
    <main className="flex h-full flex-col justify-center gap-8 font-main">
      <div
        className={cn(
          "w-full overflow-y-auto px-8 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-400",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
};
