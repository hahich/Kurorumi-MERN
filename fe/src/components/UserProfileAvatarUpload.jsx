import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from "prop-types";

const UserProfileAvatarUpload = ({ close }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleUploadAvatarImg = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            setLoading(true);
            const res = await Axios({
                ...SummarryApi.uploadAvatar,
                data: formData
            });
            const { data: responseData } = res;
            dispatch(updateAvatar(responseData.data.avatar));
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-slate-900 bg-opacity-60 p-4 flex items-center justify-center">
            <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
                <button className="w-fit block ml-auto" onClick={close}>
                    <IoIosCloseCircle size={25} />
                </button>
                <div className="w-20 h-20 flex items-center justify-center drop-shadow-lg mx-4">
                    {
                        user.avatar ? (
                            <img src={user.avatar} alt="User Avatar" className="w-full h-full rounded-full" />
                        ) : (
                            <FaUserCircle size={60} />
                        )
                    }
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="uploadProfile">
                            <div className="cursor-pointer mt-3 w-min-20 text-sm border transition duration-300 border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full">
                                {loading ? "Loading..." : "Upload"}
                            </div>
                            <input type="file" id="uploadProfile" className="hidden" onChange={handleUploadAvatarImg} />
                        </label>
                    </div>
                </form>
            </div>
        </section>
    );
};

UserProfileAvatarUpload.propTypes = {
    close: PropTypes.func.isRequired,
};

export default UserProfileAvatarUpload;