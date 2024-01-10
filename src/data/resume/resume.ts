import { EducationType, ExperienceType, LinksType, ReferenceType, SkillType } from "@/types"

export const myProfileText = "Purposeful software developer with a passion for building rubust and efficient applications. Having a firm understanding of fundamental software engineering principles and programming languages such as Python, TypeScript and Go. Having a commended team spirit and commitment to continuous learning and inprovement."

export const myExperience: ExperienceType[] = [
  {
    date: "Nov 2022 - Present",
    title: "Developer",
    company: "Iknite Space Buea",
    activities: {
      overview: "Actively contributed, playing major roles to the completion of some of the company's major projects, by constantly writing clean and resusable code in Go, React & Nextjs, Node & Express and  React Native",
      highlights: [
        "Led the development of JSON APIs, web and mobile UIs with Golang, Node.Js, React.Js and React Native",
        "Utilized the power of google firebase as backend-as-a-service for some applications, firestore for storage and firebase auth for authentication",
        "Ensuring on-time delivery of high-quality code",
        "Effectively collaborated with design teams and product teams to plan sprints, generate, prioritize and groom tickets on Jira",
        "Headed QA processes, which intailed planning, executing and reporting regressions tests",
        "Enthusiatically engaged in all company activities and events, upholding the Iknite Space culture as momentous"
      ]
    }
  },
  // {
  //   date: "Oct 2021 - June 2023",
  //   title: "Lecturer",
  //   company: "Trustech Higher institute Buea",
  //   activities: {
  //     overview: "Instructed First and second year students  in Graphic design, Multimedia, and Engineering mathematics",
  //     highlights: [
  //       "Lectured Graphic Design concept and expecially focused on practicals with vaious tools including Adobe Photoshop, Illustrator, After Effects and Figma",
  //       "Actively participated in the grading of the Higher National Diploma Examinations for 2022 and 2023 sessions.",
  //       "Also Assisted students overcome their difficulties programming in HTML, CSS and Javascript while preparing for their national exams through revision sessions."
  //     ]
  //   }
  // },
  {
    date: "Early 2022 - Present",
    title: "Teacher / Mentor",
    company: "-",
    activities: {
      overview: "Guided newcomers into the world of software engineering, counselling them on the prospective career options and recommending paths to take to successfully transition into fulfilling careers",
      highlights: [
        "Created comprehensive learning plans for undergraduate students to get hands on practical experience and guidiance in web and mobile applications. Providing/recommending learning resources, giving exercises, reviewing code and holding training sessions",
        "Engaged with high school students, university freshmen and undergraduate students on the subject of software engineering, to give them clearer understanding of what it is all about and how to make the most of it if getting into the field",
        "Counselled students on effective study methods and habits to develop to succeed and thrive in school and in the world of engineering",
      ]
    }
  },

  {
    date: "Mar 2021 - May 2021",
    title: "intern",
    company: "New Generation Technologies LTD Buea",
    activities: {
      overview: "Satisfactorily completed a required academic internship at the company, extending  my stay to learn, improve and participate.",
      highlights: [
        "Exceeded expectations through enthusiastic collaboration with team mates, passionately learning, contributing, asking lots of questions and taking notes",
        "Actively participated in the company's training programs for students and pupils such as ICT4kids and Electrolabs training sessions, spearheading hands-on workshops, and inspiring pupils to pursue tech careers",
        "Contributed to one of the companies top mobile projects, co-writing the SRS document with other interns, and building the UI for multiple screens using the flutter SDK",
      ]
    }
  },
  {
    date: "",
    title: "",
    company: "",
    activities: {
      overview: "",
      highlights: []
    }
  }
]

export const myEducation: EducationType[] = [
  {
    date: "Oct 2020 - Jul 2021",
    school: "HIBMAT Buea",
    degree: "BTech Software Eng.",
    details: "Obtained a first class top-up Bachelor of Technology degree in Software Engineering"
  },
  {
    date: "Oct 2016 - Aug 2020",
    school: "HIBMAT Buea",
    degree: "HND Hardware Maintenance",
    details: "Obtained a Higher National Diploma in hardware maintenance"
  }
]

export const myReference: ReferenceType[] = [
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
export const mySkills: SkillType[] = [
  {
    class: "Programming Languages",
    skills: [
      {
        title: "JavaScript, TypeScript",
        score: 7
      },
      {
        title: "Golang",
        score: 7
      },
      {
        title: "Python 3",
        score: 9
      },
      // {
      //   title: "C",
      //   score: 5
      // },
    ]
  },
  {
    class: "Frontend Technologies",
    skills: [
      {
        title: "React, Nextjs",
        score: 7
      },
      {
        title: "TailwindCSS",
        score: 8,
      }
    ]
  },
  {
    class: "Backend Technologies",
    skills: [
      {
        title: "Node.js, Express",
        score: 5
      },
      {
        title: "Golang, Gin",
        score: 7
      }
    ]
  },
  {
    class: "Mobile Development",
    skills: [
      {
        title: "React Native",
        score: 6
      },
      // {
      //   title: "Flutter",
      //   score: 2
      // }
    ]
  },
  {
    class: "Databases",
    skills: [
      {
        title: "PostgreSQL",
        score: 7
      },
      {
        title: "MongoDB",
        score: 7
      }
    ]
  },
  {
    class: "Devops",
    skills: [
      {
        title: "Docker",
        score: 6
      },
      {
        title: "Github actions",
        score: 6
      }
    ]
  },
  // {
  //   class: "Creative Design",
  //   skills: [
  //     {
  //       title: "Photoshop, Illustrator",
  //       score: 8
  //     },
  //     {
  //       title: "Premiere Pro, After effects",
  //       score: 7
  //     }
  //   ],
  //   specialty: { specialty: "design" }
  // },
  {
    class: "UI & UX Design",
    skills: [
      {
        title: "Figma",
        score: 6
      }
    ]
  },

  {
    class: "Languages",
    skills: [
      {
        title: "English",
        score: 10
      },
      {
        title: "French",
        score: 3
      }
    ]
  }
]


export const myLinks: LinksType[] = [
  {
    title: "GitHub",
    ref: "https://github.com/sambacarlson"
  },
  {
    title: "Portfolio",
    ref: "https://sambacarlson.vercel.app"
  }
]