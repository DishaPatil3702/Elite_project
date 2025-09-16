import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  // Temporary demo notifications
  const notifications = [
    { id: 1, text: "New lead assigned to you", time: "2m ago" },
    { id: 2, text: "Meeting scheduled for tomorrow", time: "1h ago" },
    { id: 3, text: "Weekly report is ready", time: "3h ago" },
  ];

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 font-semibold border-b dark:border-gray-600">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <p className="text-sm">{n.text}</p>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
