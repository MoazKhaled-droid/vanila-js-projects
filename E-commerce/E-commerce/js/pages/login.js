import { loginUser } from "../api/authApi.js";
import { toggleLoader, switchDarkLight } from "../ui/sharedUi.js";
import { saveUserToken, showError, removeUserToken } from "../logic/authLogic.js";

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const usernameErrField = document.getElementById("username-Error-msg");
const passwordErrField = document.getElementById("password-Error-msg");
const ErrorMsg = document.getElementById("Error-msg");
const form = document.forms[0];
const eyeIcon = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; 
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash")
    }
});

console.log(form)
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    removeUserToken()
    usernameErrField.textContent = "";
    passwordErrField.textContent = "";
    usernameInput.textContent = "";
    passwordInput.textContent = "";
    ErrorMsg.textContent = "";

    const username = usernameInput.value.trim(); // خليها username
    const password = passwordInput.value.trim();

    if (!username || !password) {
        if (!username) showError(usernameErrField, "Username requerd");
        if (!password) showError(passwordErrField, "Password requerd");
        return;
    }
    if (!password) {
        return;
    }
    try {
        toggleLoader(true)
        const data = await loginUser(username, password);

        if (data && data.accessToken && data.id) {
            saveUserToken(data.accessToken);
            window.location.replace("index.html");
        }

    } catch (err) {
        console.log(err);
        showError(ErrorMsg, "Unvalid Userneme or Password");
    } finally {
        toggleLoader(false);
    }
});

switchDarkLight();