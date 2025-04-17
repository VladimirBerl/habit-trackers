import { TrackersCalendar } from "@/features/tracker/components/trackers-calendar";
import * as TelegramSDK from '@telegram-apps/sdk-react';

export default function TrackersCalendarPage() {
    console.log(TelegramSDK.miniApp.isDark());
  
  return <TrackersCalendar />;
}
