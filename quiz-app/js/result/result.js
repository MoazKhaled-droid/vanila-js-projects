import { toggleLoadingSpinner } from "../sharedLogic.js";
import { applyTheme, initTheme} from "../sharedLogic.js";
import { renderResult } from "./resultUi.js";

function initResault(){
    const params = new URLSearchParams(window.location.search);
    const total = params.get("total");
    const result = params.get("result");
    const id = params.get("category");
    const difficulty = params.get("difficulty");
    const amount = params.get("amount");
    const cat = params.get("cat");
    const time = params.get("time");
    const name = localStorage.getItem("userName") || "Pro";
    const message = `You have completed the ${cat} quiz, ${name}`;
    const percentage = `${(result / total)*100}%`;
    const corect = result;
    const wrong = total - result;
    renderResult(message,percentage,corect,wrong,total,time);
}

initTheme();
applyTheme();
initResault();