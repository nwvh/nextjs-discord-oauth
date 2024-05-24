const getObject = (key: string): object | null => {
    const value = localStorage?.getItem(key);
    return value ? JSON.parse(value) : null;
};

export default getObject