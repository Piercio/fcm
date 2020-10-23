const MAX_SIZE = 10;

export const storeNotification = notification => {
    let notifications = getNotifications()
    
    notification.timestamp = Date.now();
    notifications.unshift(notification);
    if (notifications.length > MAX_SIZE) {
        notifications = notifications.slice(0, MAX_SIZE);
    }
    
    window.localStorage.setItem('notifications', JSON.stringify(notifications))
};

export const getNotifications = () => {
    let notifications = JSON.parse(window.localStorage.getItem('notifications'));
    if (notifications === null) {
        notifications = []
    }

    return notifications; 
}