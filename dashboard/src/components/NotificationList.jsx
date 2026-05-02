export default function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return <div className="empty-state">No notifications match your filters.</div>;
  }

  return (
    <div className="notification-list" id="notification-list">
      {notifications.map((n, idx) => {
        const type = n.type || n.Type || "Unknown";
        const message = n.message || n.Message || "";
        const timestamp = n.timestamp || n.Timestamp || "";
        const id = n.id || n.ID || idx;

        return (
          <div className="notification-item" key={id}>
            <span className={`type-badge ${type.toLowerCase()}`}>
              {type}
            </span>
            <div className="notification-body">
              <div className="notification-message">{message}</div>
              <div className="notification-meta">
                <span>ID: {id}</span>
                <span>{new Date(timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
