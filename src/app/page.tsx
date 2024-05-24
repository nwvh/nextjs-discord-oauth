"use client"
import React, { useEffect, useState } from 'react';
import TokenStatus from '../components/TokenStatus';
import { useDiscordLogin, UseDiscordLoginParams } from 'react-discord-login';
import * as dotenv from "dotenv";
import { ChangeStatus, GetLoginStatus } from '@/utils/isLoggedIn';
dotenv.config({ path: __dirname + '/.env' });




type UseDiscordLogin = (params: UseDiscordLoginParams) => {
  buildUrl: () => string;
  isLoading: boolean;
};


import CheckLogin from '@/utils/checkLogin';
import Logout from '@/utils/logout';
import GetData from '@/utils/getData';
import getObject from '@/utils/getObject';
import GetAvatar from '@/utils/getAvatar';

const storeObject = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

interface DiscordUserData {
  username: string;
  displayName: string;
  email: string;
  id: number;
  MFA: boolean;
  avatar: string;
  discriminator: string;
  bannerColor: string;
  accessToken: string;
}
let userData: any = {}

export default function Home() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URL = process.env.REDIRECT_URL;

  const [storedObject, setStoredObject] = useState<DiscordUserData | null>(null);
  CheckLogin()





  useEffect(() => {
    const obj = getObject("userData") as DiscordUserData;
    setStoredObject(obj);
  }, []);

  const handleSave = () => {
    const DiscordUserData: DiscordUserData = {
      username: userData.username,
      displayName: userData.global_name,
      email: userData.email,
      id: userData.id,
      MFA: userData.mfa_enabled,
      avatar: userData.avatar,
      discriminator: userData.discriminator,
      bannerColor: userData.banner_color,
      accessToken: userData.access_token
    };
    storeObject('userData', DiscordUserData);
  };

  const discordLoginParams: UseDiscordLoginParams = {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URL,
    responseType: 'token', // or 'code'
    scopes: ['identify', 'email', 'guilds', 'connections'],
    onSuccess: (response: any) => {
      ChangeStatus(true)
      userData = response.user
      userData.access_token = response.access_token
      console.log(response)
      handleSave()
    },
    onFailure: (error: any) => {
      Logout()
    },
  };
  const { buildUrl, isLoading } = useDiscordLogin(discordLoginParams);

  return (
    <main>
      <div>
        {
          !GetLoginStatus() ?
            <div className="text-center justify-center flex flex-row min-h-screen items-center">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => (window.location.href = buildUrl())} disabled={isLoading}>
                Sign in with Discord
              </button>
            </div>
            :
            <div className="justify-center min-h-screen items-center">
              <div className='justify-center items-center flex m-5'>
                <img src={GetAvatar()} height={128} width={128} className='rounded-full'></img>
                <h1 className='text-2xl px-5'>Welcome, {GetData().displayName}</h1>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => {
                  window.location.reload()
                  alert("You have been logged out!")
                  Logout()

                }}>Log out</button>
              </div>

              <div className="flex justify-center items-center">
                <table className="rounded-xl divide-y divide-gray-700 bg-gray-800 text-white">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">E-Mail</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">2FA</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Access Token Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{GetData().username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{GetData().id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{GetData().email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{GetData().MFA ? "✅" : "❌"}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><TokenStatus token={GetData().accessToken} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>




            </div>

        }
      </div>
    </main>
  );
}
