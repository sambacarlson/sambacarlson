import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false)
  return (
    <div className="relative flex flex-row items-center justify-between px-14 py-2 h-[8vh] md:h-[12vh] bg-primary">
      <div className="flex flex-row items-center justify-center">
        <Image src='/sambacarlson-logo-white.png' width={100} height={100} alt="carlson\'s logo" quality={100} className="w-8 h-auto object-contain" />
      </div>
      <div className="hidden md:flex flex-row items-center justify-center space-x-6 text-white">
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:underline duration-300 hover:cursor-pointer"><Link href="#about">About</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:underline duration-300 hover:cursor-pointer"><Link href="#projects">Work</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:underline duration-300 hover:cursor-pointer"><Link href="#experience">Experience</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:underline duration-300 hover:cursor-pointer"><Link href="#contact">Contact</Link> </div>
      </div>
      <div className="hidden md:flex">
        <div onClick={()=>{}} className="px-5 bg-white py-1 text-primary self-center hover:text-white hover:bg-primary hover:ring-1 ring-white  duration-200 hover:cursor-pointer rounded"><Link href="">Resume</Link></div>
      </div>
      <div onClick={()=>{setShowMenu(prevState => !prevState)}} className="md:hidden flex flex-row items-center justify-center text-white">
        {
          !showMenu ?
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z" /></svg>
        </div>
        :
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z" /></svg>
        </div>
        }
      </div> 
      { showMenu &&
        <div className="absolute top-[8vh] pt-10 left-0 w-2/3 h-[100vh] flex md:hidden flex-col items-start space-y-7 justify-start px-12 text-white bg-primary divide-y">
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"><Link href="#about" className="pl-2">About</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"><Link href="#projects" className="pl-2">Work</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"><Link href="#experience" className="pl-2">Experience</Link> </div>
          <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"><Link href="#contact" className="pl-2">Contact</Link> </div>
      </div>
      }
    </div>
  )
}

export default Navbar
