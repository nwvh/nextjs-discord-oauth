let isLoggedIn = false

const ChangeStatus = (status: boolean) => {
    isLoggedIn = status
}

const GetLoginStatus = () => {
    return isLoggedIn
}

export { GetLoginStatus, ChangeStatus }