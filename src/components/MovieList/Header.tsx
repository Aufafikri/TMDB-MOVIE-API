import React from 'react'
import { titleProps } from '../../../types/props/title'

const Header = ({ title }: titleProps) => {
  return (
    <div className='p-4 mt-4'>
        <h1 className='text-2xl text-textHeader font-bold dark:text-white'> {title} </h1>
    </div>
  )
}

export default Header