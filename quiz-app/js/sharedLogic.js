// loder logic
export function toggleLoadingSpinner(isLoading) {
    let loader = document.querySelector(".loading-overlay");

    if (isLoading) {
        if (!loader) {
            loader = document.createElement("div");
            loader.className = "loading-overlay active"; // ضفنا الكلاسين مرة واحدة

            const spinner = document.createElement("span");
            spinner.className = "spinner";

            loader.appendChild(spinner);
            document.body.appendChild(loader);
        }
    } else {
        if (loader) {
            loader.remove();
        }
    }
}

// theme logic
export function initTheme() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    const iconDiv = document.getElementById("themeIcon");
    const body = document.body;

    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme") || "dark";

        const newTheme = currentTheme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        if(newTheme === "dark"){
            iconDiv.classList.replace("fa-sun","fa-moon");
        }else{
            iconDiv.classList.replace("fa-moon","fa-sun");

        }

    });
}

export function applyTheme() {
    const selectedTheme = localStorage.getItem("theme");
    const body = document.querySelector("body");
    if (!selectedTheme) return;
    body.setAttribute("data-theme", selectedTheme);
}