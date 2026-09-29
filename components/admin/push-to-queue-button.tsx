"use client";

import { trpc } from "@/src/trpc/client";
import { useRouter } from "next/navigation";

interface PushToQueueButtonProps {
  setId: string;
  setName: string;
}

export function PushToQueueButton({ setId, setName }: PushToQueueButtonProps) {
  const router = useRouter();
  const pushToQueueMutation = trpc.admin.pushToQueue.useMutation({
    onSuccess: () => router.refresh(),
  });

  const handlePushToQueue = () => {
    if (!confirm(`Start extraction for "${setName}"?`)) return;
    pushToQueueMutation.mutate({ setId });
  };

  const isLoading = pushToQueueMutation.isPending;
  const hasError = pushToQueueMutation.isError;

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handlePushToQueue}
        disabled={isLoading}
        className="rounded-md bg-violet-600 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
      >
        {isLoading ? "Queuing…" : "Push to Queue"}
      </button>
      {hasError && (
        <span className="text-[10px] text-red-500">
          {pushToQueueMutation.error?.message}
        </span>
      )}
    </div>
  );
}
