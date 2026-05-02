import { toggleLoadingSpinner } from "../sharedLogic.js";
import { applyTheme, initTheme } from "../sharedLogic.js";
import { renderCatCards } from "./homeUi.js";
import { handleEvents } from "./homeLogic.js";
console.log("ok")

initTheme();
applyTheme();
renderCatCards();
handleEvents();
