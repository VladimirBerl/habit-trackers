import { Page } from "@/components/page";
import { NewTracker } from "@/features/tracker/components/new-tracker";

export default function NewTrackerPage() {
  return (
    <Page back className="h-full">
      <NewTracker />
    </Page>
  );
}
