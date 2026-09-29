import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AdminSetsTableRow } from "./admin-sets-table-row";
import type { ExamSetRow } from "./admin-types";

interface AdminSetsTableProps {
  setsList: ExamSetRow[];
}

export function AdminSetsTable({ setsList }: AdminSetsTableProps) {
  return (
    <Card className="border-neutral-200 bg-white">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-sm font-bold text-neutral-900">
          Exam Papers & Question Sets
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 border-y border-neutral-200">
              <tr>
                <th className="p-3.5 pl-5 font-semibold">Set Name</th>
                <th className="p-3.5 font-semibold">Exam</th>
                <th className="p-3.5 font-semibold">Year / Session</th>
                <th className="p-3.5 font-semibold">Question PDF</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {setsList.map((examSet) => (
                <AdminSetsTableRow key={examSet.id} examSet={examSet} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
