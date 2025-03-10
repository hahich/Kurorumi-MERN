import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className=" mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
                <p>© All Right Reserved 2024.</p>
                <div className="flex items-center gap-2 justify-center">
                    <a href="" className="hover:text-blue-500"><FaFacebook size={20} /></a>
                    <a href="" className="hover:text-red-400"><FaInstagramSquare size={20}/></a>
                    <a href="" className="hover:text-blue-300"><FaLinkedin size={20}/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer