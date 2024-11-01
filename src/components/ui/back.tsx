"use client"

import { ArrowUUpLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
  return (
    <>
        <button onClick={() => router.back()}>
            <ArrowUUpLeft size={32} weight="bold" />
        </button>
    </>
  )
}

export default BackButton