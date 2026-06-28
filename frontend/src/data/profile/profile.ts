import type { ProfileDataType } from "@/types";

export const myProfile: ProfileDataType = {
  name: "Samba Carlson",
  tagline: "Software Engineer, Educator & Theologian",
  bio: "I'm Samba Carlson — a software engineer, educator, and student of God's Word who believes these callings are deeply connected. I build robust web and mobile applications with TypeScript and Go, teach the next generation as a lecturer and mentor, and study Scripture as a Sunday school teacher, aspiring apologist, and lay expository preacher. Whether I'm writing clean code, guiding a student through a new concept, or digging into the Bible verse by verse, I'm driven by the same pursuit: to understand deeply, communicate clearly, and serve others faithfully.",
  photo: "/me.jpg",
  contact: {
    email: "sambacarlson@gmail.com",
    location: "Molyko, Buea, Cameroon",
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/sambacarlson",
      icon: "github",
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@sambacarlson",
      icon: "youtube",
    },
  ],
};
