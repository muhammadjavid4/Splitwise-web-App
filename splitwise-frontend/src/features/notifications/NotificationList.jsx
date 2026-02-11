import {
  getMyNotificationsApi,
  markNotificationReadApi,
} from "./notification.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function NotificationList() {
  const queryClient = useQueryClient();
  const { data: list = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await getMyNotificationsApi();
      return res.data.notifications || [];
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => markNotificationReadApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notifications-unread-count"]);
    },
  });

  if (isLoading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (list.length === 0) {
    return <p className="text-slate-500">No notifications</p>;
  }

  return (
    <div className="space-y-3">
      {list.map((n) => (
        <div
          key={n.id}
          className={`border rounded-lg p-3 ${
            n.is_read ? "bg-slate-800" : "bg-slate-700"
          }`}
        >
          <p className="text-sm text-white">{n.message}</p>

          <div className="flex justify-between mt-1 items-center">
            <p className="text-xs text-slate-400">
              {new Date(n.created_at).toLocaleString()}
            </p>

            {!n.is_read && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => markReadMutation.mutate(n.id)}
              >
                Mark read
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
