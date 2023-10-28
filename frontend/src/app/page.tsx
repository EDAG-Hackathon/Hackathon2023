import Image from "next/image";
import Calendar from "./calendar";
import { CreateEditEventDialog } from "./create-edit-event-dialog";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateEditEventDialog/>
      <Calendar />
    </main>
  );
}
