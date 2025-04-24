"use client";

import { useRouter } from "next/navigation";
import { useTrackerStore } from "@/store/useTrackerStore";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

import Completed from "@/components/icon/completed";
import NotCompleted from "@/components/icon/not-completed";
import Cancel from "@/components/icon/cancel";
import Skip from "@/components/icon/skip";
import Edit from "@/components/icon/edit";
import Delete from "@/components/icon/delete";

import { hapticFeedback } from "@telegram-apps/sdk-react"; // импорт вибрации
import { Separator } from "@/components/ui/separator";

type ContextOrHoldTriggerProps = {
  children: React.ReactElement;
  id: string;
  currentDate: Date;
};

export const ContextOrHoldTrigger = ({ children, id, currentDate }: ContextOrHoldTriggerProps) => {
  const router = useRouter();
  const { removeTracker, undoChanges, skipDay, completedDay, markStatus } = useTrackerStore();

  const vibrate = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("medium");
    }
  };

  return (
    <ContextMenu modal onOpenChange={() => vibrate()}>
      <ContextMenuTrigger className="cursor-pointer">{children}</ContextMenuTrigger>
      <ContextMenuContent >
        <ContextMenuItem
          onClick={() => {
            vibrate();
            completedDay(id, currentDate);
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Completed className="size-7" /> <p>Completed</p>
        </ContextMenuItem>
        <Separator />
        <ContextMenuItem
          onClick={() => {
            vibrate();
            markStatus(id, currentDate, "not_done");
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <NotCompleted className="size-7" />
          <p>Not Completed</p>
        </ContextMenuItem>
        <Separator />
        <ContextMenuItem
          onClick={() => {
            vibrate();
            undoChanges(id, currentDate);
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Cancel className="size-7" />
          <p>Cancel</p>
        </ContextMenuItem>
        <Separator />
        <ContextMenuItem
          onClick={() => {
            vibrate();
            skipDay(id, currentDate);
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Skip className="size-7" />
          <p>Skip</p>
        </ContextMenuItem>
        <Separator />
        <ContextMenuItem
          onClick={() => {
            vibrate();
            router.push(`/change-tracker/${id}`);
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Edit className="size-7" />
          <p>Edit</p>
        </ContextMenuItem>
        <Separator />
        <ContextMenuItem
          onClick={() => {
            vibrate();
            removeTracker(id);
          }}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Delete className="size-7" />
          <p className="text-[#DF2C2C]">Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
