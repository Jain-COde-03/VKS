/* eslint-disable no-unused-vars */
import React from 'react'
import Search from '../Common/Search'
import Location from '../Common/Location'

const Navbar = () => {
    return (
        <div className='flex gap-2 items-center px-4 py-2 h-20'>
            <div className="logo"><img src="../public/images/logo2.png" alt="VKS" height={150} width={190} /></div>
            <Location />
            <Search />
        </div>
    )
}

export default Navbar
