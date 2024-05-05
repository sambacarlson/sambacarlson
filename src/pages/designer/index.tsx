import Link from "next/link";
import React from "react";

export default function Designer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center border-4 border-secondary">
      <p>This page is undergoing maintainance.</p>
      <p>Come back later 🙏🏿</p>
      <Link
        href={"/"}
        className="mt-10 ring-1 cursor-pointer py-2 px-4 ring-secondary rounded-2xl hover:bg-secondary text-secondary hover:text-white duration-300"
      >
        Go Back
      </Link>
    </div>
  );
}
