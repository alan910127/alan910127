import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { type NextPage } from "next";
import Link from "next/link";

const ContactPage: NextPage = () => {
  return (
    <ElevatorLayout
      title="Hello, I am Alan | Server Error"
      currentLabel="Server Error"
    >
      <main className="flex h-full flex-col items-center justify-center gap-8 font-main">
        <Link
          href="https://en.wikipedia.org/wiki/Wu_Bai"
          className="text-4xl font-bold underline"
        >
          500
        </Link>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/FXg4LXsg14s?start=75&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </main>
    </ElevatorLayout>
  );
};

export default ContactPage;
