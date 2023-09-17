import { Experience, Education, Reference, Skill } from "./resumeTypes"

export const profileText = "Purposeful Junior software developer with a passion for building rubust and efficient applications. Having a firm understanding of fundamental software engineering principles and programming languages such as Python, TypeScript and Go. Having a commended team spirit and commitment to continous learning and inprovement."

export const myExperience: Experience[] = [
  {
    date: "Nov 2022 - Present",
    title: "Developer",
    company: "Iknite Space",
    activities: {
      overview: "Actively contributed to the completion of some of the company's major projects, constantly writing clean and resusable code in Go, React & Nextjs, Node & Express and  React Native.",
      highlights: [
        "seamlessly worked in various teams on the different projects.",
        "Effective collaborated with design teams and project managment to generate user stories, plan sprints and groom tickets",
        "Was also the QA engineer on one of the major projects which entailed creating QA checklists and executing regressions tests",
      ]
    }
  },
  {
    date: "Oct 2021 - June 2023",
    title: "Lecturer",
    company: "Trustech Higher institute Buea",
    activities: {
      overview: "Instructed First and second year students  in Graphic design, Multimedia, and Engineering mathematics",
      highlights: [
        "Lectured Graphic Design concept and expecially focused on practicals with vaious tools including Adobe Photoshop, Illustrator, After Effects and Figma",
        "Actively participated in the grading of the Higher National Diploma Examinations for 2022 and 2023 sessions.",
        "Also Assisted students overcome their difficulties programming in HTML, CSS and Javascript while preparing for their national exams through revision sessions."
      ]
    }
  },
  {
    date: "Mar 2021 - May 2021",
    title: "intern",
    company: "New Generation Technologies LTD Buea",
    activities: {
      overview: "Effectively participated in the company's activities and programs including ICT4kids and Electrolabs",
      highlights: [
        "Contributed t",
        "Designed designed ICT4Kids 2021 program flyers with Adobe photoshop"
      ]
    }
  }
]

export const myEducation: Education[] = [
  {
    date: "Oct 2020 - Jul 2021",
    school: "HIBMAT Buea",
    degree: "BTech Software Eng.",
    details: "Obtained and top up Bachelor of Technology in Software Engineering with a GPA of 3.76 on 4"
  },
  {
    date: "Oct 2016 - Aug 2020",
    school: "HIBMAT Buea",
    degree: "HND Hardware Maintenance",
    details: "Obtained The Higher national diploma in hardware maintenance with an average of 13 on 20"
  }
]

export const myReference: Reference[] = [
  {
    name: "Dr Ngolah Kenneth",
    org: "Academic supervisor. HIBMAT",
    email: "timngolah@yahoo.com"
  },
  {
    name: "Amin Jefferson",
    org: "Manager. Iknite Space",
    email: "amin@iknite.studio"
  }
]

// skill score should be from 1 to 10
export const mySkills : Skill[] = [
  {
    class: "frontend development",
    skills: [
      {
        title: "React, Nextjs",
        score: 7
      },
      {
        title: "css, Tailwindcss",
        score: 8,
      }
    ]
  },
  {
    class: "backend development",
    skills: [
      {
        title: "node, express",
        score: 7
      },
      {
        title: "golang, gin",
        score: 7
      }
    ]
  },
  {
    class: "mobile development",
    skills: [
      {
        title: "react native",
        score: 6
      }
    ]
  },
  {
    class: "Programming languages",
    skills: [
      {
        title: "TypeScript",
        score: 7
      },
      {
        title: "Python 3",
        score: 8
      },
      {
        title: "Go",
        score: 7
      },
      {
        title: "SQL",
        score: 8
      },
      {
        title: "C",
        score: 5
      }
    ]
  },
  {
    class: "graphic design",
    skills: [
      {
        title: "adobe Ps, Ai, Pr, Ae, Au",
        score: 7
      },
      {
        title: "figma",
        score: 6
      }
    ]
  },
  {
    class: "Other Technologies",
    skills: [
      {
        title: "docker",
        score: 4
      },
      {
        title: "redux, redux toolkit",
        score: 5
      }
    ]
  },
  {
    class: "Leadership",
    skills: [
      {
        title: "Teaching, coordinating",
        score: 8
      },
      {
        title: "conflict resolution",
        score: 6
      }
    ]
  },
  {
    class: "Languages",
    skills: [
      {
        title: "English",
        score: 9
      },
      {
        title: "French",
        score: 3
      }
    ]
  }
]