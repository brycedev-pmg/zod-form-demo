import { PropsWithChildren } from "react";

export const Page = ({ children, title }: Readonly<PageProps>) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 gap-4 bg-white dark:bg-black">
        {title && <h1>{title}</h1>}
        {children}
      </main>
    </div>
  );
};

interface PageProps extends PropsWithChildren {
  title?: string;
}
