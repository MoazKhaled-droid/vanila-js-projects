export function getNotifications() {
    try {
        return JSON.parse(localStorage.getItem("notifications")) || [];
    } catch {
        return [];
    }
}

export function saveNotifications(notifications) {
    localStorage.setItem("notifications", JSON.stringify(notifications));
}

export function addNotification(message) {
    const notifications = getNotifications();
    notifications.unshift({
        id: Date.now(),
        message: message,
        read: false,
        time: new Date().getTime()
    });
    saveNotifications(notifications);
    updateNotificationsUI();
}

export function markAllAsRead() {
    const notifications = getNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
    updateNotificationsUI();
}

export function updateNotificationsUI() {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const badge = document.getElementById("notificationBadge");
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = "flex";
        } else {
            badge.style.display = "none";
        }
    }

    const content = document.getElementById("notificationContent");
    if (content) {
        if (notifications.length === 0) {
            content.innerHTML = "<div style='padding: 10px; text-align: center;'>No new notifications.</div>";
        } else {
            content.innerHTML = notifications.map(n => `
                <div class="notification-item ${n.read ? '' : 'unread'}" style="padding: 10px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: background-color 0.3s; background-color: ${n.read ? 'transparent' : 'var(--bg-secondary)'};">
                    <p style="margin: 0; font-size: 0.9rem; color: var(--text-primary);">${n.message}</p>
                    <small style="color: var(--text-secondary); font-size: 0.75rem;">${new Date(n.time).toLocaleString()}</small>
                </div>
            `).join("");
        }
    }
}

export function initNotifications() {
    updateNotificationsUI();
    
    const notificationBtn = document.getElementById("notificationBtn");
    const notificationDropdown = document.getElementById("notificationDropdown");
    
    if (notificationBtn && notificationDropdown) {
        const btn = notificationBtn.querySelector("button");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle("active");
            if (notificationDropdown.classList.contains("active")) {
                markAllAsRead();
            }
        });

        document.addEventListener("click", (e) => {
            if (!notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove("active");
            }
        });
    }
}
