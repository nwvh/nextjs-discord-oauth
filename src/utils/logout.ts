import { ChangeStatus } from "./isLoggedIn"


const Logout = () => {
    localStorage?.removeItem("userData")
    ChangeStatus(false)
}

export default Logout