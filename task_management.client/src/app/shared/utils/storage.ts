export const setLocalStorage = (key: string, value: any): void => {
    if(typeof value === 'object') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
}

export const getLocalStorage = (key: string): any => {
    const value = localStorage.getItem(key);
    if(value) {
        try {
            return JSON.parse(value);
        } catch {
            return value; // Return as string if parsing fails
        }
    }
    return null;
}

export const removeLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
}