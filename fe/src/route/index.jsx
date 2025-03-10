import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../page/Home';
import SearchPage from '../page/SearchPage';
import Register from '../page/Register';
import Login from '../page/Login';
import ForgotPassword from '../page/ForgotPassword';
import OtpVerifycation from '../page/OtpVerifycation';
import ResetPassword from '../page/ResetPassword';
import UserMenuMobile from '../page/UserMenuMobile';
import Dashboard from '../layouts/Dashboard';
import Profiles from '../page/Profiles';
import MyOrders from '../page/MyOrders';
import Address from '../page/Address';
import Category from '../page/Category';
import SubCategory from '../page/SubCategory';
import UploadProducts from '../page/UploadProducts';
import ProductsAdmin from '../page/ProductsAdmin';
import AdminPermission from '../layouts/AdminPermission';
import ProductsList from '../page/ProductsList';
import ProductsDisPlay from '../page/ProductsDisPlay';
import CartMobile from '../page/CartMobile';
import CheckOut from '../page/CheckOut';
import Success from '../page/Success';
import Cancel from '../page/Cancel';

// Define the router configuration
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verifycation-otp",
                element: <OtpVerifycation />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profiles",
                        element: <Profiles />
                    },
                    {
                        path: "my-orders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "category",
                        element: <AdminPermission><Category /></AdminPermission>
                    },
                    {
                        path: "sub-category",
                        element: <AdminPermission><SubCategory /></AdminPermission>
                    },
                    {
                        path: "upload-products",
                        element: <AdminPermission><UploadProducts /></AdminPermission>
                    },
                    {
                        path: "products",
                        element: <AdminPermission><ProductsAdmin /></AdminPermission>
                    }
                ]
            },
            {
                path: ":category/",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductsList />
                    }
                ]
            },
            {
                path: "products/:products",
                element: <ProductsDisPlay />
            },
            {
                path: "cart",
                element: <CartMobile />
            },
            {
                path: "checkout",
                element: <CheckOut />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            }
        ]
    },
]);
