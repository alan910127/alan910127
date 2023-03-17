import { ElevatorLayout } from "@/layouts/ElevatorLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import composeImage from "~/images/compose.jpg";

const emailContentSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

type EmailContent = z.infer<typeof emailContentSchema>;

const ContactPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(emailContentSchema);

  const sendEmail = (data: EmailContent) => {
    window.location.href = `mailto:lilunlin.cs@gmail.com?subject=${data.subject}&body=${data.body}`;
  };

  return (
    <ElevatorLayout
      title="Hello, I am Alan | Contact"
      currentLabel="Contact Me"
    >
      <main className="flex h-full flex-col items-center justify-center gap-8 px-16 font-main">
        <h1 className="text-2xl font-bold">
          Feel free to send an email if you are interested to talk with me!
        </h1>
        <section className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          <Image
            src={composeImage}
            alt="compose a mail"
            className="hidden rounded-lg shadow-lg md:block"
          />
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(sendEmail)}
            className="flex flex-col items-stretch gap-4"
          >
            <fieldset className="flex flex-col">
              <label htmlFor="subject" className="text-xl font-semibold">
                Subject
              </label>
              <input
                id="subject"
                className="rounded border border-gray-300"
                {...register("subject")}
              />
              {errors.subject && (
                <span className="text-red-600">{errors.subject.message}</span>
              )}
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="body" className="text-xl font-semibold">
                Body
              </label>
              <textarea
                id="body"
                className="h-64 resize-none rounded border border-gray-300"
                {...register("body")}
              />
              {errors.body && (
                <span className="text-red-600">{errors.body.message}</span>
              )}
            </fieldset>
            <button className="rounded-full bg-gray-500 py-2 text-white transition-transform duration-300 hover:scale-110 hover:bg-gray-600">
              Submit
            </button>
          </form>
        </section>
      </main>
    </ElevatorLayout>
  );
};

export default ContactPage;

const useZodForm = <S extends z.ZodSchema>(schema: S) => {
  return useForm<z.infer<S>>({ resolver: zodResolver(schema) });
};
