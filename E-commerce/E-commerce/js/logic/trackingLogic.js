import { addNotification } from "./notificationLogic.js";

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered'];
const STATUS_DURATION_MS = 15000; // 15 seconds per status for demonstration

export function getOrders() {
    try {
        return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
        return [];
    }
}

export function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrder(cartItems, total) {
    const orders = getOrders();
    const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 1000000),
        items: cartItems,
        total: total,
        statusIndex: 0,
        createdAt: Date.now(),
        lastUpdatedAt: Date.now()
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    addNotification(`Order ${newOrder.id} placed successfully. Status: ${STATUSES[0]}`);
}

export function updateOrderStatuses() {
    let orders = getOrders();
    let updated = false;
    const now = Date.now();
    
    orders = orders.map(order => {
        if (order.statusIndex < STATUSES.length - 1) {
            const timePassed = now - order.lastUpdatedAt;
            const statusJumps = Math.floor(timePassed / STATUS_DURATION_MS);
            
            if (statusJumps > 0) {
                let newIndex = Math.min(order.statusIndex + statusJumps, STATUSES.length - 1);
                
                if (newIndex !== order.statusIndex) {
                    order.statusIndex = newIndex;
                    order.lastUpdatedAt = now;
                    updated = true;
                    addNotification(`Order ${order.id} status updated to: ${STATUSES[newIndex]}`);
                }
            }
        }
        return order;
    });

    if (updated) {
        saveOrders(orders);
    }
}

export function initTracking() {
    // Initial check
    updateOrderStatuses();
    
    // Check periodically
    setInterval(updateOrderStatuses, 5000);
}
