import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { type NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <ElevatorLayout
      title="Hello, I am Alan | Not Found"
      currentLabel="Danger Zone"
    >
      <main className="flex h-full flex-col items-center justify-center gap-8 bg-rose-900 px-4 font-main text-white">
        <h1 className="text-4xl font-extrabold">
          Cannot find the page you want
        </h1>
        <p className="flex flex-col gap-4 text-center text-xl">
          <span>Why are you here? You just got into a wrong floor!</span>
          <Link href="/" className="underline">
            Go back to the floor where you should be in
          </Link>
        </p>
      </main>
    </ElevatorLayout>
  );
};

export default NotFoundPage;
