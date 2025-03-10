import { useSelector } from "react-redux"
import isAdmin from "../utils/isAdmin"
import PropTypes from "prop-types";

const AdminPermission = ({children}) => {
    const user = useSelector(state => state.user)

  return (
    <div>
        {isAdmin (user.role) ? children : <p className="text-red-500 bg-red-100 p-4">You dont have permission</p>}
    </div>
  )
}

AdminPermission.propTypes = {
    children: PropTypes.func.isRequired,
}

export default AdminPermission