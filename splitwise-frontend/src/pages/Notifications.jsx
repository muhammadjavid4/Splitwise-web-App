import NotificationList from "../features/notifications/NotificationList";

export default function Notifications() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        Notifications
      </h2>
      <NotificationList />
    </div>
  );
}
