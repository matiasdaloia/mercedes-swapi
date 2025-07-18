import PeopleTable from "@/components/PeopleTable";
import TableLayout from "@/components/TableLayout";
import { Globe } from "lucide-react";

export default function PeoplePage() {
  return (
    <TableLayout
      title="Galactic Planets"
      icon={<Globe className="h-12 w-12 text-blue-400" />}
      subtitle="Explore the diverse worlds across the galaxy, from desert wastelands to lush forest moons"
    >
      <PeopleTable />
    </TableLayout>
  );
}
