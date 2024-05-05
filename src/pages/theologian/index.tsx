import Link from "next/link";
import React from "react";

export default function Theologian() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center border-4 border-tertiary">
      <p>This page is undergoing maintainance.</p>
      <p>Come back later 🙏🏿</p>
      <Link
        href={"/"}
        className="mt-10 ring-1 cursor-pointer py-2 px-4 ring-tertiary rounded-2xl hover:bg-tertiary hover:text-white duration-300"
      >
        Go Back
      </Link>
    </div>
  );
}
