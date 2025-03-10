import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Success = () => {
    const location = useLocation();
    // Kiểm tra xem location.state có tồn tại và có thuộc tính text không
    const message = location.state && location.state.text ? location.state.text : "Payment Successfully";
    return (
        <div className='m-2 w-full max-w-md bg-blue-200 p-4 py-5 rounded mx-auto flex flex-col items-center justify-center gap-5'>
            <p className='text-blue-500 font-bold text-lg text-center'>{message}</p>
            <Link to={"/"} className='border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white'>Go to Home</Link>
        </div>
    );
}
export default Success;