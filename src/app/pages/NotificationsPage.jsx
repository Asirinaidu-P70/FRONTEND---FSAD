import { useState } from "react";
import PageIntro from "../components/PageIntro";
import Tabs from "../components/Tabs";
import { announcements, notifications } from "../data/notifications";

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [readNotifications, setReadNotifications] = useState(
    notifications.map((item) => item.read)
  );

  const currentList =
    activeTab === "announcements"
      ? announcements
      : notifications.map((item, index) => ({
          ...item,
          read: readNotifications[index],
        }));

  return (
    <div className="container">
      <PageIntro
        eyebrow="Notifications"
        title="Stay informed with reminders, certificates, and announcement drops."
        description="The notification center gives learners and teams a polished inbox-style experience without needing backend messaging."
      />

      <Tabs
        activeTab={activeTab}
        items={[
          { label: "Notifications", value: "notifications" },
          { label: "Announcements", value: "announcements" },
        ]}
        onChange={setActiveTab}
      />

      <div className="notification-list" style={{ marginTop: "1rem" }}>
        {currentList.map((item, index) => (
          <div key={item.id} className="notification-card">
            <div className="notification-header" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <strong>{item.title}</strong>
                <p className="muted" style={{ margin: "0.35rem 0 0", lineHeight: 1.7 }}>
                  {"message" in item ? item.message : item.body}
                </p>
              </div>
              {"time" in item ? <span className="pill">{item.time}</span> : <span className="pill">{item.publishedAt}</span>}
            </div>
            {activeTab === "notifications" ? (
              <button
                type="button"
                className="button button-secondary"
                style={{ marginTop: "1rem" }}
                onClick={() =>
                  setReadNotifications((current) =>
                    current.map((value, currentIndex) =>
                      currentIndex === index ? true : value
                    )
                  )
                }
              >
                {item.read ? "Read" : "Mark as read"}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
