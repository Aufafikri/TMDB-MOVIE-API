import React from 'react'
import '../../styles/dev.css'

const loading = () => {
  return (
    <>
    <div className='flex justify-center items-center min-h-screen'>
        <div className='flex justify-center items-center loader'></div>
    </div>
    </>
  )
}

export default loading