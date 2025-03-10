import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col items-center justify-center gap-5'>
            <p className='text-red-900 text-lg font-bold'>Order Cancel</p>
            <Link to={"/"} className='border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white'>Go to Home</Link>
        </div>
    )
}

export default Cancel
