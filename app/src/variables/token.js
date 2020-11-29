
export const headerAuthorization = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { headers: {'Authorization': `Token ${token}`}}
    }
    return {};
}

export const saveItem = (key, value) =>  {
    localStorage.setItem(key, value);
}

export const removeItem = (key) =>  {
    console.log('item to delete ', key)
    localStorage.removeItem(key);
}

export const getItem = (key) =>  {
    return localStorage.getItem(key);
}