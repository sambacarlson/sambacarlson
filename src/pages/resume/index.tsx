import { MdEmail } from 'react-icons/md'
import { SiLinkedin } from 'react-icons/si'
import { PiPhoneCallFill } from 'react-icons/pi'
import { MdLocationOn } from 'react-icons/md'
import Image from 'next/image'
import { profileText, myEducation, myReference, myExperience, mySkills } from "@/data/resumeData/resumeData"
import { Education, Experience, Reference, Skill } from '@/types/resumeTypes'



export default function Resume() {
  const downloadPDF = () => {
    console.log('download resume pdf')
  };
  return (
    <main className="flex flex-col items-center text-primary w-full lg:max-w-[1000px] min-h-[1000px] mx-auto font-gothic border">
      <h4 onClick={downloadPDF} className="fixed right-[5%] top-10 rounded-lg py-2 px-4 hover:cursor-pointer z-20 border-2 text-sm border-yellow-400 text-yellow-400 bg-emerald-900 animate-pulse hover:animate-none duration-300 hover:border-white active:border-yellow-400 active:bg-emerald-700">Download PDF</h4>
      <div className="relative grid grid-cols-5 w-full">
        <div className="absolute top-0 h-[17em] md:h-[8.5rem] w-full bg-secondary border-b-[0.4em] border-stone-600" />
        <div className="col-span-5 md:col-span-2 p-4 md:p-8 flex flex-col items-center md:mr-2 md:bg-stone-50">
          <div className="overflow-hidden bg-stone-600 md:border-[0.4em] border-stone-600 w-[9em] h-[9em] md:h-[12em] md:w-[12em] rounded-full  z-10 ">
            <Image src="/me1.jpg" alt="Samba Carlson" width={360} height={360} className="object-cover h-full transform -scale-x-100" />
          </div>
        </div>
        <div className="col-span-5 md:col-span-3 p-4 md:p-8 md:pl-0 flex flex-col justify-cente h-full z-10">
          <div className="flex flex-col items-center md:items-start justify-end flex-1 text-white">
            <h1 className="text-xl md:text-3xl font-bold">Samba Carlson</h1>
            <h3 className="font-bold text-base md:text-md tracking-[0.5em] text-center">SOFTWARE DEVELOPER</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-8 md:mt-10">
            <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1 break-all"><span className="text-secondary pt-[0.4rem]"><MdEmail /></span><p>sambacarlson@gmail.com</p></div>
            <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1"><span className="text-secondary pt-[0.4rem]"><PiPhoneCallFill /></span><p>+237677964952</p></div>
            <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1 break-all"><span className="text-secondary pt-[0.4rem]"><SiLinkedin /></span><p>linkedin.com/in/sambacarlson</p></div>
            <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1"><span className="text-secondary pt-[0.4rem]"><MdLocationOn /></span><p>Molyko Buea</p></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 w-full self-center h-full mt-0 md:mt-[6em], flex-1">
        <div className="col-span-5 md:col-span-2  flex flex-col p-4 md:p-8 md:mr-2 md:bg-stone-50">
          <div className="hidden md:flex flex-col">
            <h3 className="font-bold text-xl text-secondary border-b border-secondaryLight">Profile</h3>
            <p className="my-2">{profileText}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary mt-0 md:mt-4 border-b border-secondaryLight ">Skills</h3>
            {
              mySkills.map(skill => (
                <Skill key={skill.class + mySkills.indexOf(skill)} skill={skill} />
              ))
            }
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary mt-8 md:mt-4 border-b border-secondaryLight">Education</h3>
            <div className="flex flex-col my-2">
              {
                myEducation.map((ed: Education) => (
                  <Education key={ed.school + ed.degree} edu={{ date: ed.date, school: ed.school, degree: ed.degree, details: ed.details }} />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary mt-8 md:mt-4 border-b border-secondaryLight">Refereces</h3>
            <div className="my-2 flex-col space-y-2">
              {
                myReference.map((rf: Reference) => (
                  <Reference key={rf.name + rf.email} reference={{ name: rf.name, org: rf.org, email: rf.email }} />
                ))
              }
            </div>
          </div>
        </div>
        <div className="col-span-5 order-first md:order-last md:col-span-3 w-full p-4 md:p-8 md:pl-0">
          <div className="flex md:hidden flex-col">
            <h3 className="font-bold text-xl text-secondary border-b border-secondaryLight">Profile</h3>
            <p className="">{profileText}</p>
          </div>
          <h3 className="font-bold text-xl text-secondary mt-8 md:mt-0 border-b border-secondaryLight">Experience</h3>
          <div className="flex flex-col space-y-4">
            {
              myExperience.map((ex: Experience) => (
                <Experience key={ex.date} exp={{ date: ex.date, title: ex.title, company: ex.company, activities: { overview: ex.activities.overview, highlights: [...ex.activities.highlights] } }} />
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}

const Experience = ({ exp }: { exp: Experience }) => {
  return (
    <div className="grid grid-cols-5 my-2">
      <em className="col-span-5 md:col-span-1 text-secondary text-sm">{exp.date}</em>
      <div className="col-span-5 md:col-span-4 flex flex-col">
        <div className="flex flex-row">
          <h4 className="font-bold text-lg">{exp.title} </h4>
          <span className="mx-4 md:mx-12 font-sm font-semibold italic">{exp.company}</span>
        </div>
        <p className="pr-4 md:pr-8 ">{exp.activities.overview}</p>
        <ul className="list-disc list-outside pl-[0.9em]">
          {exp.activities.highlights.map((item: string) => (
            <li key={item} className="text-secondary"><span className="text-primary">{item}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Education = ({ edu }: { edu: Education }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <h4 className="font-bold">{edu.school}</h4>
          <em className="text-sm text-secondary">{edu.date}</em>
        </div>
        <h5 className="font-sm font-semibold italic">{edu.degree}</h5>
      </div>
      <p className="">{edu.details}</p>
    </div>
  )
}

const Reference = ({ reference }: { reference: Reference }) => {
  return (
    <div className="flex flex-col">
      <h4 className="font-bold">{reference.name}</h4>
      <p className="">{reference.org}</p>
      <em className="text-secondary">{reference.email}</em>
    </div>
  )
}

const Skill = ({ skill }: { skill: Skill }) => {
  return (
    <div className="flex flex-col my-2">
      <h4 className="font-bold">{skill.class}</h4>
      <ul className="list-disc list-inside">
        {
          skill.skills.map(skill => (
            <div key={skill.title + skill.score} className="flex flex-row justify-between gap-4">
              <li className="font-sm italic"><span className="text-secondary">{skill.title}</span></li>
              <Score score={skill.score} />
            </div>
          ))
        }
      </ul>
    </div>
  )
}


const Score = ({ score }: { score: number }) => {
  return (
    <div className="flex w-full max-w-[100px] h-2 bg-secondaryLight self-center rounded-e-md">
      <div style={{ width: `${score * 10}%` }} className="h-full bg-secondary rounded-e-md"></div>
    </div>
  )
}