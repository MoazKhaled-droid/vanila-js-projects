import { switchDarkLight } from "../ui/sharedUi.js";
import { isLoggedIn } from "./authLogic.js";
import { initNotifications } from "./notificationLogic.js";
import { initTracking } from "./trackingLogic.js";

export function filter(term,arr){
    let filterd = arr.filter(({name})=> name.toLowerCase().includes(term));
    return filterd
}

export const initApp = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
    switchDarkLight();

    // Initialize Global Systems
    initNotifications();
    initTracking();

    if (!isLoggedIn()) {
        window.location.replace("login.html");
        return;
    }

};
