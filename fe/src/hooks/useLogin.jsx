import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLogin(false)
          return;
        }
        const res = await Axios({
          ...SummaryApi.getMe,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.error) {
          console.log(res.data.message);
          setIsLogin(false);
        } else if (res.data.success) {
          token
          setIsLogin(true);
          setUserDetails(res.data.user)
        }
      } catch (error) {
        console.error(error);
        setIsLogin(false);
      }
    };

    fetchData();
  }, [isLogin]);

  return { isLogin, setIsLogin, userDetails, setUserDetails };
};

export default useLogin;