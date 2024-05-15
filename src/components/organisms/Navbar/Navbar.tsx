import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from "@/components/atoms";
import { ProfileType, RouteType } from "@/types";
import { getThemeColor } from "@/utils";
import { useRouter } from "next/router";

const Navbar = ({ profile }: { profile: ProfileType }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [[theme, themeLight], setTheme] = React.useState<[string, string]>([
    "default",
    "defaultLight",
  ]);
  const [currentRoute, setCurrentRoute] = React.useState<string>("/developer");
  React.useEffect(() => {
    setTheme(getThemeColor(profile));
    setCurrentRoute(router.pathname);
  }, [profile]);

  const routes: RouteType[] = [
    { path: "/developer", label: "Home" },
    { path: "/developer/work", label: "Work" },
    { path: "/developer/experience", label: "Experience" },
    { path: "/developer/contact", label: "Contact" },
  ];

  return (
    <div
      className="relative flex justify-between px-14 py-2 h-[8vh] tablet:h-[12vh] bg-defaultLight"
      style={{}}
    >
      <div className="w-fit flex flex-row items-center justify-center">
        {/* <Image src='/sambacarlson-logo-white.png' width={100} height={100} alt="carlson\'s logo" quality={100} className="w-8 h-auto object-contain" /> */}
        <Logo box_size={40} font_size={20} profile={profile} redirect_url="/" />
      </div>
      <div className="hidden tablet:flex flex-row items-center justify-center tablet:space-x-3 desktop:space-x-6 text-black">
        {routes.map((route, index) => (
          <div
            key={index}
            onClick={() => {
              setShowMenu((prevState) => !prevState);
            }}
            className={`w-full grid px-3 duration-500 hover:cursor-pointer rounded-md hover:border-t ${currentRoute === route.path && `text-[${theme}]`
              }`}
            style={{
              color: currentRoute === route.path ? theme : "",
              borderTopColor: theme
            }}
          >
            <Link href={`${route.path}`}>{route.label}</Link>{" "}
          </div>
        ))}
      </div>
      <div className="hidden tablet:flex">
        <div
          onClick={() => { }}
          className="px-5 bg-white py-1 text-center self-center hover:text-white hover:bg-defaultLight hover:ring-1 active:ring-default ring-white  duration-200 hover:cursor-pointer rounded"
          style={{ color: theme }}
        >
          <Link href="/developer/resume">Resume</Link>
        </div>
      </div>
      <div
        onClick={() => {
          setShowMenu((prevState) => !prevState);
        }}
        className="tablet:hidden flex flex-row items-center justify-center text-white"
      >
        {!showMenu ? (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"
              />
            </svg>
          </div>
        ) : (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
          </div>
        )}
      </div>
      {showMenu && (
        <div className="absolute top-[8vh] pt-10 left-0 w-2/3 h-[100vh] flex tablet:hidden flex-col items-start justify-start px-12 text-black bg-defaultLight divide-y">
          {
            routes.map((route, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowMenu((prevState) => !prevState);
                }}
                className="w-full flex items-end py-4 hover:px-2 duration-200 hover:cursor-pointer"
                style={{
                  color: currentRoute === route.path ? theme : "",
                }}
              >
                <Link href={route.path} className="pl-2 hover:bg-white w-full py-2 duration-200">
                  {route.label}
                </Link>
              </div>
            ))
          }
          <div className="w-full flex items-end py-4 hover:px-2 duration-200 hover:cursor-pointer">
            <Link href={"developer/resume"} className="pl-2 hover:bg-white w-full py-2 duration-200">Resume</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar
