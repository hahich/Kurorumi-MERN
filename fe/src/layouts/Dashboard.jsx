import { Outlet } from "react-router-dom"
import UserMenu from "../components/UserMenu"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const user = useSelector(state => state.user)
    
    return (
        <section className="bg-white">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
                {/* left */}
                <div className="py-4 sticky top-24 overflow-auto hidden lg:block border-r min-h-[calc(100vh-96px)]">
                    <UserMenu />
                </div>

                {/* right content */}
                <div className=" bg-white min-h-[80vh]">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default Dashboard