import Notification from "@/app/components/Notification/Notification";
import { useCallback, useState } from "react";
import "../../src/app/components/Notification/Notification.css";

const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState([]);

  const triggerNotification = useCallback((notificationProps) => {
    // Add the new notification to the state
    setNotification((prev) => [...prev, notificationProps]);

    // Set a timeout for each notification to be removed individually
    setTimeout(() => {
      setNotification((prev) => prev.slice(1)); // Remove the first notification after 3 seconds
    }, 3000);
  }, []);

  const removeNotification = (indexToRemove) => {
    setNotification((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Generate the NotificationComponent
  const NotificationComponent =
    notification.length > 0 ? (
      <div className={`${position} notification-stack`}>
        {notification.map((notify, index) => (
          <div key={index} className="notification-item">
            <Notification
              {...notify}
              onClose={() => removeNotification(index)}
            />
          </div>
        ))}
      </div>
    ) : null;

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
