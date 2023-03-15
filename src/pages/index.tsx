import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <ElevatorLayout title="Hello, I am Alan" currentLabel="Home">
      <main className="flex flex-col items-center overflow-y-auto py-16">
        <h1 className="text-xl">
          Hello, I am{" "}
          <strong className="text-3xl font-bold text-yellow-900">
            Li-Lun Lin
          </strong>
        </h1>
      </main>
    </ElevatorLayout>
  );
};

export default Home;
