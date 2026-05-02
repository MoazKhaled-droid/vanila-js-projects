import { switchDarkLight } from "../ui/sharedUi.js";
import { initTracking } from "../logic/trackingLogic.js";
import { initNotifications } from "../logic/notificationLogic.js";

switchDarkLight();
initNotifications();
initTracking();
