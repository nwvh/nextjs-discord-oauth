import getObject from "./getObject"
import Logout from "./logout"

const GetData = () => {
    const data: any = getObject("userData")
    if (!data) {
        return Logout()
    }
    return data
}

export default GetData