import GetData from "./getData";

const GetAvatar = () => {
    const userId = GetData().id
    const userAvatar = GetData().avatar
    return `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png    `
}

export default GetAvatar