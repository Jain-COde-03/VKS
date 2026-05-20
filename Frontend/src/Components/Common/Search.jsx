/* eslint-disable no-unused-vars */
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles';


const Search = ({ value = "", onChange = () => {}, placeholder = "Search..." }) => {
    return (
        <div className='flex gap-2 items-center w-auto bg-gray-100 border border-gray-300 rounded-4xl py-1 px-2'>
            <IconButton aria-label="Search" size='medium' color='success'>
                <IoIosSearch />
            </IconButton>
            <div className='flex items-center w-100'>
                <input
                    type="text"
                    placeholder={placeholder}
                    className='bg-transparent border-none focus:outline-none w-full'
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
                <span className='text-gray-400 text-lg align-text-top'>|</span>
            </div>
            <IconButton aria-label="Microphone" size='medium' color='success'>
                <IoMdMic fontSize={['22px']} />
            </IconButton>
        </div>
    )
}

export default Search
