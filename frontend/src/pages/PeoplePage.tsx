import PeopleTable from "@/components/PeopleTable";
import TableLayout from "@/components/TableLayout";
import { PersonStanding } from "lucide-react";

export default function PeoplePage() {
  return (
    <TableLayout
      title="Notable Beings"
      icon={<PersonStanding className="h-12 w-12 text-blue-400" />}
      subtitle="Meet the heroes, villains, and everyone in between from across the Star Wars universe"
    >
      <PeopleTable />
    </TableLayout>
  );
}
