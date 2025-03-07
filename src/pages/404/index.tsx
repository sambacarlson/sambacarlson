import { useRouter } from 'next/navigation'
import React from 'react'

export default function PageNotFound() {
  const router = useRouter()
  const goBack = () => router.back()
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center space-y-4">
        <p className="text-[4rem]">OOPSIE 🤥</p>
        <p className="">Can't find what you are looking for</p>
        <button onClick={goBack} className="border border-default hover:bg-defaultLight px-12 py-1 w-fit">Go Back</button>
      </div>
    </div>
  )
}
