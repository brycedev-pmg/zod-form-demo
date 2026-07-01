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
    </Page>
  );
}
