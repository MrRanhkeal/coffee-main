export const setAccesToken = (value) => {
    localStorage.setItem('accessToken', value);
}

export const getAccesToken = () => {
    return localStorage.getItem('accessToken')
}

export const setProfile = (value) => {
    return localStorage.getItem('profile', value)
}

export const getProfile = () => {
    try {
        var profile = localStorage.getItem('profile');
        if (profile !== "" && profile !== null && profile !== undefined) {
            return JSON.parse(profile);
        }
        return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
export const setPermission = (array) => {
    localStorage.setItem("permission", array);
};

export const getPermission = () => {
    // convert string json to object
    try {
        var permission = localStorage.getItem("permission");
        if (permission !== "" && permission !== null && permission !== undefined) {
            return JSON.parse(permission);
        }
        return null;
    } catch (err) {
        console.log("not found permission",err);
        return null;

    }
};
