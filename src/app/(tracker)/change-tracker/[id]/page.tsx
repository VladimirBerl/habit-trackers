import { ChangeTracker } from "@/features/tracker/components/change-tracker";

export default async function ChangeTrackerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ChangeTracker id={id} />;
}
