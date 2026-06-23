import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { myProfile, myExperience, myEducation, myTeaching, myTheology } from "@/data";
import { getThemeColor } from "@/utils";
import type { ExperienceType, EducationType } from "@/types";

export default function Home() {
  const router = useRouter();
  const [showMenu, setShowMenu] = React.useState(false);
  const [theme, setTheme] = React.useState("default");
  const [themeLight, setThemeLight] = React.useState("defaultLight");

  React.useEffect(() => {
    const [t, tl] = getThemeColor("developer");
    setTheme(t);
    setThemeLight(tl);
  }, []);

  const anchors = [
    { href: "/#about", label: "About" },
    { href: "/#engineering", label: "Engineering" },
    { href: "/#theology", label: "Theology" },
    { href: "/resume", label: "Resume" },
  ];

  const devExperience = myExperience.filter((e) => e.domain === "development");
  const teachingExperience = myExperience.filter((e) => e.domain === "teaching");

  return (
    <main className="flex flex-col justify-between min-h-[100vh] text-black bg-white">
      <title>Samba Carlson</title>

      {/* ===== Navbar ===== */}
      <div className="fixed w-full z-30">
        <div className="relative flex justify-between px-14 py-2 h-[6vh] tablet:h-[8vh] bg-defaultLight">
          <div className="w-fit flex flex-row items-center justify-center">
            <div
              onClick={() => router.replace("/")}
              className="relative flex items-center justify-center cursor-pointer"
            >
              <div
                className="rounded-full border-2 absolute bg-white"
                style={{
                  width: 60,
                  height: 60,
                  borderWidth: 4,
                  borderInlineColor: theme,
                  borderBlockColor: themeLight,
                }}
              />
              <p
                className="text-center font-mono font-black z-10"
                style={{ fontSize: 20, color: theme }}
              >
                K<span style={{ color: themeLight }}>S</span>C
              </p>
            </div>
          </div>

          <div className="hidden tablet:flex flex-row items-center justify-center tablet:space-x-3 desktop:space-x-6 text-black">
            {anchors.map((anchor, index) => (
              <div
                key={index}
                className="px-3 duration-500 hover:cursor-pointer rounded-md hover:border-t"
                style={{ borderTopColor: theme }}
              >
                <Link href={anchor.href}>{anchor.label}</Link>
              </div>
            ))}
          </div>

          <div
            onClick={() => setShowMenu((prev) => !prev)}
            className="tablet:hidden flex flex-row items-center justify-center text-default"
          >
            {!showMenu ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z" />
              </svg>
            )}
          </div>

          {showMenu && (
            <div className="absolute top-[8vh] pt-10 left-0 w-2/3 h-[100vh] flex tablet:hidden flex-col items-start justify-start px-12 text-black bg-defaultLight divide-y">
              {anchors.map((anchor, index) => (
                <div
                  key={index}
                  onClick={() => setShowMenu(false)}
                  className="w-full flex items-end py-4 hover:px-2 duration-200 hover:cursor-pointer"
                >
                  <Link href={anchor.href} className="pl-2 hover:bg-white w-full py-2 duration-200">
                    {anchor.label}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[12vh]"></div>

      {/* ===== Hero ===== */}
      <section id="home" className="flex-1 flex flex-col pt-2 tablet:flex-row items-center justify-center space-y-2 tablet:space-y-0 min-h-[80vh] py-3 px-6 md:mx-5 md:ml-16">
        <div className="flex-2 flex flex-col space-y-1 justify-center tablet:pr-4 w-[85vw] tablet:w-[45vw]">
          <h1 className="text-3xl font-normal tablet:font-semibold w-full">
            {myProfile.name}
          </h1>
          <p className="text-2xl">{myProfile.tagline}</p>
          <p className="">{myProfile.bio}</p>
          <div className="flex flex-row gap-4 pt-4">
            <Link href="#about" className="[&>*]:btn-portforlio">
              <span className="btn-portforlio inline-block">Learn more</span>
            </Link>
            <Link href="">
              <span className="btn-portforlio inline-block">Contact</span>
            </Link>
          </div>
        </div>
        <div className="hidden tablet:flex flex-1 bg-green-50">
          <Image
            src={myProfile.photo}
            width={500}
            height={500}
            alt={myProfile.name}
            className="w-auto h-[50vh] transform -scale-x-100 shadow-inner"
          />
        </div>
        <div className="tablet:hidden flex justify-center py-4">
          <Image
            src={myProfile.photo}
            width={300}
            height={300}
            alt={myProfile.name}
            className="min-w-[100px] w-[60vw] h-auto rounded-full object-contain"
          />
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="py-16 px-6 tablet:px-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-default pb-2">
          About Me
        </h2>
        <div className="flex flex-col tablet:flex-row gap-8 items-start">
          <div className="tablet:w-2/3 space-y-4">
            <p className="leading-7">{myProfile.bio}</p>
          </div>
          <div className="tablet:w-1/3 flex justify-center">
            <Image
              src="/me1.jpg"
              width={200}
              height={200}
              alt={myProfile.name}
              className="rounded-2xl object-cover w-[200px] h-[200px]"
            />
          </div>
        </div>
      </section>

      {/* ===== Engineering ===== */}
      <section id="engineering" className="py-16 px-6 tablet:px-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-secondary pb-2">
          Software Engineering
        </h2>
        <div className="space-y-8">
          <p className="leading-7">
            I&apos;m a software developer with over 3 years of professional
            experience, particularly interested in building optimal and robust
            web, desktop and mobile applications. I work primarily with
            TypeScript and Go, and I care deeply about clean code, good
            architecture, and shipping reliable software.
          </p>
          <div className="flex flex-col space-y-6">
            {devExperience.map((exp: ExperienceType, index: number) => (
              <div
                key={exp.date}
                className={`pb-6 ${index < devExperience.length - 1 ? "border-b border-secondaryLight" : ""}`}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-row items-baseline gap-3">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-defaultLight italic">{exp.company}</span>
                  </div>
                  <em className="text-sm text-secondary">{exp.date}</em>
                  <p className="leading-7">{exp.activities.overview}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.activities.highlights.map((highlight: string, hIndex: number) => (
                      <li key={hIndex} className="text-secondary">
                        <span className="text-black">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Teaching ===== */}
      <section id="teaching" className="py-16 px-6 tablet:px-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-primary pb-2">
          Teaching
        </h2>
        <div className="space-y-8">
          <p className="leading-7">{myTeaching.bio}</p>
          <div className="flex flex-col space-y-6">
            {teachingExperience.map((exp: ExperienceType, index: number) => (
              <div
                key={exp.date}
                className={`pb-6 ${index < teachingExperience.length - 1 ? "border-b border-primaryLight" : ""}`}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-row items-baseline gap-3">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-defaultLight italic">{exp.company}</span>
                  </div>
                  <em className="text-sm text-primary">{exp.date}</em>
                  <p className="leading-7">{exp.activities.overview}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.activities.highlights.map((highlight: string, hIndex: number) => (
                      <li key={hIndex} className="text-primary">
                        <span className="text-black">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Subjects taught in school
            </h3>
            <div className="flex flex-wrap gap-2">
              {myTeaching.subjectsInSchool.map((subject, i) => (
                <span key={i} className="bg-primaryLight text-default rounded-full px-4 py-1 text-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Subjects taught out of school ({myTeaching.outSchoolContext})
            </h3>
            <div className="flex flex-wrap gap-2">
              {myTeaching.subjectsOutSchool.map((subject, i) => (
                <span key={i} className="bg-primaryLight text-default rounded-full px-4 py-1 text-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Theology ===== */}
      <section id="theology" className="py-16 px-6 tablet:px-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-tertiary pb-2">
          Theology
        </h2>
        <div className="space-y-6">
          <p className="leading-7">{myTheology.bio}</p>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-tertiary">
              {myTheology.tradition}
            </h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-tertiary">
              Roles &amp; Aspirations
            </h3>
            <div className="flex flex-wrap gap-2">
              {myTheology.roles.map((role, i) => (
                <span key={i} className="bg-tertiaryLight text-default rounded-full px-4 py-1 text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Education ===== */}
      <section id="education" className="py-16 px-6 tablet:px-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-default pb-2">
          Education
        </h2>
        <div className="flex flex-col space-y-6">
          {myEducation.map((edu: EducationType, index: number) => (
            <div
              key={index}
              className={`pb-6 ${index < myEducation.length - 1 ? "border-b border-defaultLight" : ""}`}
            >
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-bold">{edu.school}</h3>
                <em className="text-sm text-default">{edu.date}</em>
                <h4 className="font-semibold italic">{edu.degree}</h4>
                <p className="leading-7">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <div id="contact" className="p-3 tablet:py-5 tablet:px-16 min-h-[24vh] grid grid-cols-2 justify-center text-default bg-defaultLight">
        <div className="col-span-2 tablet:col-span-1 flex flex-col space-y-4">
          <h3
            className="text-xl font-semibold w-full border-b py-4"
            style={{ borderBlockEndColor: theme }}
          >
            Contact / Address
          </h3>
          <div className="flex flex-row space-x-3 tablet:space-x-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill={theme}
                d="M3 21V7h6V5l3-3l3 3v6h6v10H3Zm2-2h2v-2H5v2Zm0-4h2v-2H5v2Zm0-4h2V9H5v2Zm6 8h2v-2h-2v2Zm0-4h2v-2h-2v2Zm0-4h2V9h-2v2Zm0-4h2V5h-2v2Zm6 12h2v-2h-2v2Zm0-4h2v-2h-2v2Z"
              />
            </svg>
            <p>{myProfile.contact.location}</p>
          </div>
        </div>
        <div className="col-span-2 tablet:col-span-1 flex flex-col space-y-4">
          <h3
            className="text-xl font-semibold border-b w-full py-4"
            style={{ borderBlockEndColor: theme }}
          >
            Links
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center space-x-3 tablet:space-x-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                <path
                  fill={theme}
                  d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-2.2 2L16 14.78L6.2 8ZM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24Z"
                />
              </svg>
              <Link href={`mailto:${myProfile.contact.email}`} className="hover:underline">
                {myProfile.contact.email}
              </Link>
            </div>
            {myProfile.socialLinks.map((link) => (
              <div
                key={link.label}
                className="flex flex-row items-center space-x-3 tablet:space-x-5"
              >
                {link.icon === "github" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill={theme}
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                    />
                  </svg>
                )}
                <Link href={link.href} target="_blank" className="hover:underline">
                  {link.href.replace("https://", "")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}