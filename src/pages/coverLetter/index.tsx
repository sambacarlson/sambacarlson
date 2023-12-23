import { myCoverLetter } from '@/data'
import React from 'react'

export default function CoverLetter() {
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center py-8">
      <p className="bg-white max-w-[800px] p-[80px]">
        {myCoverLetter.body}
      </p >
    </div>
  )
}
