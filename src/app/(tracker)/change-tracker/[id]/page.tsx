import { ChangeTracker } from "@/features/tracker/components/change-tracker";

export default function ChangeTrackerPage({ params }: { params: { id: string } }) {
  return <ChangeTracker id={params.id} />;
}
