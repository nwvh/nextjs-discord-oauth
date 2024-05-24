import getObject from "./getObject";
import { ChangeStatus } from "./isLoggedIn";
import Logout from "./logout";

const CheckLogin = () => {
    const data: any = getObject("userData")
    if (!data || !data.username) {
        return Logout()
    }
    ChangeStatus(true)
}

export default CheckLogin