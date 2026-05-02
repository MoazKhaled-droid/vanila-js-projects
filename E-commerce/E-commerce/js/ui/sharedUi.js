export function toggleLoader(show) {
    let overlay = document.querySelector('.loader-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loader-overlay';
        overlay.innerHTML = '<span class="loader"></span>';
        document.body.appendChild(overlay);
    }

    overlay.style.display = show ? 'flex' : 'none';
}

export function switchDarkLight() {
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
}