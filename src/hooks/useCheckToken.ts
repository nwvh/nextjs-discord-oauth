import { useState, useEffect } from 'react';

const useCheckToken = (token: string) => {
    const [message, setMessage] = useState<string | null>(null);
    const [status, setCode] = useState<string | null>(null);

    useEffect(() => {
        const fetchTokenStatus = async () => {
            try {
                const response = await fetch(`/api/checkToken?token=${token}`);
                const data = await response.json();
                setCode(`${response.status}`);
                setMessage(`${data.message}`);
            } catch (err) {
                setMessage('Error fetching data');
                console.error(err);
            }
        };

        fetchTokenStatus();
    }, [token]);

    return { message, status };
};

export default useCheckToken;
