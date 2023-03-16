import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { type NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan | Not Found" currentLabel="Error!">
      <main className="flex h-full flex-col items-center justify-center gap-8 bg-rose-900 font-main text-white duration-300">
        <h1 className="text-4xl font-extrabold">
          Cannot found the page you want
        </h1>
        <p className="text-center text-xl">
          Why are you here? You just got into a wrong floor!
          <br />
          <Link href="/" className="underline">
            Go back to the floor where you should be in
          </Link>
        </p>
      </main>
    </ElevatorLayout>
  );
};

export default NotFoundPage;
