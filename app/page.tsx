import { Page } from "@/components/Page";
import Image from "next/image";

export default function Home() {
  return (
    <Page>
      <Image
        src="/zod-logo.webp"
        alt="Logo"
        width={128}
        height={128}
        className="self-center"
      />
      <h1 style={{ textAlign: "center" }}>Zod + React Hook Form = ❤️</h1>
      <div
        id="demo-explanation"
        className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-300"
      >
        <p>
          This demo compares two approaches to building forms in React with
          React Hook Form, highlighting what Zod adds to the developer
          experience.
        </p>
        <p>
          The <strong>Plain Typescript </strong> tab shows a form built with{" "}
          <strong>React Hook Form </strong> alone, where every field&apos;s
          validation rules are written in each controlled input.
        </p>
        <p>
          The <strong>With Zod</strong> tab shows the same form powered by a{" "}
          <strong>Zod</strong> schema. A single schema defines validation and
          types, keeping the form logic declarative, reusable, and type-safe.
        </p>
        <p>
          Use the tabs above to switch between the two implementations and see
          the difference for yourself.
        </p>
      </div>
    </Page>
  );
}
