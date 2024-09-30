"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex w-full justify-center">
      <div className="flex text-center flex-col py-10 md:py-28 items-center  gap-8 md:gap-24 w-full max-w-screen-xl mx-5 md:mx-20">
        <h1 className="text-secondaryColor max-w-[50rem] text-2xl  md:text-6xl font-bold">
          404
        </h1>
        <Button onClick={() => router.push("/")}>Home Page</Button>
      </div>
    </main>
  );
}
