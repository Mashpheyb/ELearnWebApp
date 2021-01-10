function getStoredData() {
    let storedData = localStorage.getItem("elearnweb-token");
    return JSON.parse(storedData);
}

function storeTokenData(data) {
    if (data) {
        localStorage.setItem("elearnweb-token", JSON.stringify(data));
    }
}

function getTokenData() {
    let storedData = getStoredData();

    if (storedData && storedData.token) {
        return storedData.token;
    }

    return null;
}

function getUserData() {
    let storedData = getStoredData();

    if (storedData && storedData.userdata) {
        return storedData.userdata;
    }

    return null;
}

function logout() {
    localStorage.setItem("elearnweb-token", null);
}

export { getTokenData, getUserData, storeTokenData, logout };