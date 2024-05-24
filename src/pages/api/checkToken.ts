import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // if (req.method !== "POST") return;
    const token: any = req.query.token;
    const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // const userData = await userResponse.json();
    // console.log(userData)

    if (!userResponse.ok) {
        return res.status(401).json({ message: `Token has expired or is invalid!` })
    }
    return res.status(200).json({ message: `Token is valid!` })
}