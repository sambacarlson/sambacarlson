import Link from "next/link";
import React from "react";

export default function Teacher() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p>This page is undergoing maintainance.</p>
      <p>Come back later 🙏🏿</p>
      <Link
        href={"/"}
        className="mt-10 ring-1 cursor-pointer py-2 px-4 ring-primary rounded-2xl hover:bg-primary hover:text-white duration-300"
      >
        Go Back
      </Link>
    </div>
  );
}
