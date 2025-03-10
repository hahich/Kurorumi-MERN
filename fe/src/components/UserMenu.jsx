import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummarryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import { LuExternalLink } from "react-icons/lu";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const res = await Axios({
                ...SummarryApi.logout
            });

            if (res.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close()
        }
    }
    return (
        <div>
            <div className="font-semibold text-xl">My Account</div>
            <div className="text-lg capitalize flex items-center gap-2">
                <span className="max-w-52 text-ellipsis line-clamp-1">
                    {user.name || user.mobile}
                    <span className="text-medium text-red-500">{user.role === "Admin" ? " (Admin)" : ""}</span>
                </span>
                <Link to={"/dashboard/profiles"} className="hover:text-blue-500">
                    <LuExternalLink size={15} />
                </Link>
            </div>
            <Divider />
            <div className="grid gap-2 text-lg">

                {
                    isAdmin(user.role) && (
                        <div className="grid gap-2">
                            <Link onClick={handleClose} to={"/dashboard/category"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                                Category
                            </Link>

                            <Link onClick={handleClose} to={"/dashboard/sub-category"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                                Sub Category
                            </Link>

                            <Link onClick={handleClose} to={"/dashboard/upload-products"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                                Upload Products
                            </Link>

                            <Link onClick={handleClose} to={"/dashboard/products"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                                Products
                            </Link>
                        </div>
                    )
                }

                <Link onClick={handleClose} to={"/dashboard/my-orders"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                    My Orders
                </Link>

                <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 hover:text-white hover:bg-blue-500 transition-none lg:transition duration-300">
                    My Address
                </Link>

                <button onClick={handleLogOut} className="text-left text-red-500 hover:text-white hover:bg-red-500 px-2 transition-none lg:transition duration-300">
                    Log Out
                </button>
            </div>
        </div>
    );
};

UserMenu.propTypes = {
    close: PropTypes.func,
};

export default UserMenu;