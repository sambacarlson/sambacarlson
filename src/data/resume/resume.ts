import { EducationType, ExperienceType, ReferenceType, SkillType } from "@/types"

export const myProfileText = "Purposeful Associate software engineer with a passion for building rubust and efficient applications. Having a firm understanding of fundamental software engineering principles and programming languages such as Python, TypeScript and Go. Having a commended team spirit and commitment to continuous learning and inprovement."

export const myExperience: ExperienceType[] = [
  {
    date: "Nov 2022 - Present",
    title: "Developer",
    company: "Iknite Space Buea",
    activities: {
      overview: "Actively contributed, playing major roles to the completion of some of the company's major projects, by constantly writing clean and resusable code in Go, React & Nextjs, Node & Express and  React Native.",
      highlights: [
        "Built JSON APIs in Golang with Gin, and Node.Js with Express, Built Mobile UIs with React native and web frontend with React and NextJs with Typescript.",
        "Used google firebase as backend-as-a-service for some applications, firestore for storage and firebase auth for authentication",
        "Seamlessly contributed in multiple teams simultaneously when need arises, working hard day and night to deliver clean and tested code before deadlines",
        "Effectively collaborated with design teams and product teams to plan sprints, generate, prioritize and groom tickets on Jira",
        "Headed the QA process of one of the major projects which entailed creating QA checklists, planning and executing (mostly manual) regressions tests, approving tickets that passed the tests and cleary reporting any bugs identified on tickets that failed QA testing",
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
      overview: "Guided newcomers into the world of software engineering, counselling them on the prospective career options and recommending paths to take to actualize their dreams",
      highlights: [
        "Created Study plans for undergraduate students who desired to get hands on practical experience and guidiance in web and mobile applications. Also gave them learning resources, oversaw their learning process, giving them multiple projects, reviewing their code and holding training sessions with them regulary and or whenever necessary",
        "Engaged with high school students, university freshmen and undergraduate students on the subject of software engineering, to give them clearer understanding of what it is all about and how to make the most of it if getting into the field",
        "Counselled students on effective study methods and habits to develope to succeed and thrive in school and in the world of engineering",
      ]
    }
  },

  {
    date: "Mar 2021 - May 2021",
    title: "intern",
    company: "New Generation Technologies LTD Buea",
    activities: {
      overview: "Satisfactorily completed a  required academic internship at the company, extending  my stay to learn, improve and participate.",
      highlights: [
        "Satisfactorily collaborated with team mates, passionately learning, contributing, asking lots of questions and taking notes",
        "Actively participated in the company's training programs for students and pupils such as ICT4kids and Electrolabs training sessions, leading comeetees, assisting trainers, reviewing students' python code",
        "Contributed one of the mobile apps developed by the company using fluter. wrote the SRS document for the app with another intern after detailed breifing by the project lead. Also built some pages using the flutter SDK",
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
    details: "Obtained a top-up Bachelor of Technology degree in Software Engineering, first class"
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
      {
        title: "C",
        score: 5
      },
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
        title: "HTML5, CSS3, TailwindCSS",
        score: 8,
      }
    ]
  },
  {
    class: "Backend Technologies",
    skills: [
      {
        title: "Node.js, Express, Mongoose",
        score: 5
      },
      {
        title: "Golang, Gin, Gorm",
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
      {
        title: "Flutter",
        score: 2
      }
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
