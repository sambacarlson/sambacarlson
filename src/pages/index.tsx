import { Logo } from "@/components/atoms";
import Link from "next/link";
import React from "react";

export default function Home() {
  const [isBusy, setIsBusy] = React.useState(false);
  return (
    <div className="selection:bg-[#ddd] bg-defaultLight w-full min-h-screen flex justify-center items-center md:py-8">
      <div className="bg-white max-w-[800px] p-[40px] mobile:p-[60px] tablet:p-[80px] space-y-8">
        <Logo profile="default" box_size={40} font_size={20} active={true} />
        <p className="text-center">
          Here is a list of my portfolios.👇🏿 Which me are you looking for?
        </p>

        <div className="[&>*]:btn-portforlio [&>*]:w-full md:[&>*]:w-2/3 flex flex-col items-center justify-center space-y-4">
          <Link href={"/teacher"}>Teacher</Link>
          <Link href={"/designer"}>Graphics Designer</Link>
          <Link href={"/theologian"}>Theologian</Link>
          <Link href={"/developer"}>Software developer</Link>
        </div>
      </div>
    </div>
  );
}
