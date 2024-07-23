import React from 'react'
import { titleProps } from '../../../types/props/title'

const Header = ({ title }: titleProps) => {
  return (
    <div className='p-4 mt-4 flex justify-between'>
        <h1 className='text-2xl dark:text-white font-bold'> {title} </h1>
    </div>
  )
}

export default Header