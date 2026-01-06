import ActorPicker from "./ActorPicker";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: 16 }}>
      <ActorPicker />
      {children}
    </div>
  );
}
