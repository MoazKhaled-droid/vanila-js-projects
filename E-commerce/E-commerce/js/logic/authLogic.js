export function saveUserToken(token) {
    localStorage.setItem("userToken", token);
}

export function getUserToken() {
    return localStorage.getItem("userToken");
}

export function removeUserToken() {
    localStorage.removeItem("userToken");
}

export function isLoggedIn() {
    return !!getUserToken();
}

export function showError(errorField,msg){
    errorField.textContent = msg;
    errorField.style.display = "block"
}