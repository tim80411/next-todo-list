"use client";

import { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full flex text-center md:text-left justify-center">
      <div className=" flex flex-col py-10 md:py-44 items-center  gap-8 md:gap-16 w-full max-w-screen-xl mx-5 md:mx-20">
        <h2 className="md:text-xl text-primaryColor font-bold">
          Something fail, please try again later
        </h2>
        <span className="md:text-xl text-black">{error.message}</span>
        <Button onClick={() => router.push("/")}>Home Page</Button>
      </div>
    </main>
  );
}
