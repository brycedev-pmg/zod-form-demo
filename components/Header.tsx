"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const onChange = (value: string) => {
    router.push(value);
  };
  return (
    <Tabs
      defaultValue="home"
      className="w-full py-4 bg-zinc-50 justify-center items-center"
      onValueChange={onChange}
    >
      <TabsList>
        <TabsTrigger value="/">Home</TabsTrigger>
        <TabsTrigger value="/no-zod">Without Zod</TabsTrigger>
        <TabsTrigger value="/with-zod">With Zod</TabsTrigger>
      </TabsList>
      <TabsContent value="no-zod">
        This form is made with only React Hook Form
      </TabsContent>
      <TabsContent value="with-zod">
        This form is made with Zod + React Hook Form
      </TabsContent>
    </Tabs>
  );
};
