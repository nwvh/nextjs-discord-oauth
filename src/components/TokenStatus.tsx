import React from 'react';
import useCheckToken from '../hooks/useCheckToken';

interface TokenStatusProps {
    token: string;
}

const TokenStatus: React.FC<TokenStatusProps> = ({ token }) => {
    const { message, status } = useCheckToken(token);

    if (status === "401") {
        return <div className='m-5'>Error: {message}</div>;
    }

    return (
        <div className='m-5'>
            <h1>{message ? message : 'Loading...'}</h1>
        </div>
    );
};

export default TokenStatus;
