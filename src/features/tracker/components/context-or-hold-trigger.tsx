"use client";

import { cloneElement, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTrackerStore } from "@/store/useTrackerStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

import { useLongPress } from "@/hooks/useLongPress";

import Completed from "@/components/icon/completed";
import NotCompleted from "@/components/icon/not-completed";
import Cancel from "@/components/icon/cancel";
import Skip from "@/components/icon/skip";
import Edit from "@/components/icon/edit";
import Delete from "@/components/icon/delete";

type ContextOrHoldTriggerProps = {
  children: React.ReactElement;
  id: string;
  currentDate: Date;
};

export const ContextOrHoldTrigger = ({ children, id, currentDate }: ContextOrHoldTriggerProps) => {
  const lp = useLaunchParams();
  const router = useRouter();

  const { removeTracker, undoChanges, skipDay, completedDay, markStatus } = useTrackerStore();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const longPressProps = useLongPress({
    onLongPress: () => {
      try {
        alert("LONG PRESS TRIGGERED");
        setOpen(true);
      } catch (e) {
        alert(e);
        console.error("Long press error:", e);
      }
    },
    delay: 1500,
  });

  if (lp.tgWebAppPlatform === "tdesktop") {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="cursor-pointer">{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => completedDay(id, currentDate)}
            className="flex gap-4 items-center text-[1.063rem]"
          >
            <Completed className="size-7" /> <p>Completed</p>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => markStatus(id, currentDate, "not_done")}
            className="flex gap-4 items-center text-[1.063rem]"
          >
            <NotCompleted className="size-7" />
            <p>Not Completed</p>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => undoChanges(id, currentDate)}
            className="flex gap-4 items-center text-[1.063rem]"
          >
            <Cancel className="size-7" />
            <p>Cancel</p>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => skipDay(id, currentDate)} className="flex gap-4 items-center text-[1.063rem]">
            <Skip className="size-7" />
            <p>Skip</p>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => router.push(`/change-tracker/${id}`)}
            className="flex gap-4 items-center text-[1.063rem]"
          >
            <Edit className="size-7" />
            <p>Edit</p>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => removeTracker(id)} className="flex gap-4 items-center text-[1.063rem]">
            <Delete className="size-7" />
            <p className="text-[#DF2C2C]">Delete</p>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger ref={triggerRef} asChild>
        {cloneElement(children, longPressProps)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => completedDay(id, currentDate)}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Completed className="size-7" /> <p>Completed</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => markStatus(id, currentDate, "not_done")}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <NotCompleted className="size-7" />
          <p>Not Completed</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => undoChanges(id, currentDate)}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Cancel className="size-7" />
          <p>Cancel</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => skipDay(id, currentDate)} className="flex gap-4 items-center text-[1.063rem]">
          <Skip className="size-7" />
          <p>Skip</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/change-tracker/${id}`)}
          className="flex gap-4 items-center text-[1.063rem]"
        >
          <Edit className="size-7" />
          <p>Edit</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => removeTracker(id)} className="flex gap-4 items-center text-[1.063rem]">
          <Delete className="size-7" />
          <p className="text-[#DF2C2C]">Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
