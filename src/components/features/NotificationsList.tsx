"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/banking";

interface NotificationsListProps {
  notifications: Notification[];
  onDelete?: (notificationId: string) => void;
  onMarkAsRead?: (notificationId: string) => void;
}

export function NotificationsList({
  notifications,
  onDelete,
  onMarkAsRead
}: NotificationsListProps) {
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "transaction":
        return "border-l-blue-500 bg-blue-500/10";
      case "alert":
        return "border-l-red-500 bg-red-500/10";
      case "reminder":
        return "border-l-yellow-500 bg-yellow-500/10";
      default:
        return "border-l-slate-500 bg-slate-500/10";
    }
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "transaction":
        return <Bell className={`${iconClass} text-blue-400`} />;
      case "alert":
        return <Bell className={`${iconClass} text-red-400`} />;
      case "reminder":
        return <Bell className={`${iconClass} text-yellow-400`} />;
      default:
        return <Bell className={`${iconClass} text-slate-400`} />;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </CardTitle>
        <CardDescription>Stay updated with your account activity</CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No notifications</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 p-4 rounded ${getNotificationColor(notification.type)} ${
                  !notification.read ? "opacity-100" : "opacity-75"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm text-slate-400">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onDelete?.(notification.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
