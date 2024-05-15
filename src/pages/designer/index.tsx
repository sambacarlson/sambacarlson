import { Navbar } from "@/components/organisms";
import Link from "next/link";
import React from "react";

export default function Designer() {
  return (
    <div className="flex flex-col">
      <Navbar profile={"designer"} />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p>This page is undergoing maintainance.</p>
      <p>Come back later 🙏🏿</p>
      <Link
        href={"/"}
          className="mt-10 ring-1 cursor-pointer py-2 px-4 ring-quatenary rounded-2xl hover:bg-quatenary text-quatenary hover:text-white duration-300"
      >
        Go Back
      </Link>
    </div>
    </div>
  );
}
