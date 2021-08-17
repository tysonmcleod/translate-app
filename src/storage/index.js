export const getStorage = key => {
    const data = localStorage.getItem(key);
    if(data){
        return data;
    }
    return false;
}

export const setStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export const clearStorage = () => {
    localStorage.clear();
}


// add authentication