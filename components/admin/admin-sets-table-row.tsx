import Link from "next/link";
import { SetStatusBadge, PaperUploadBadge } from "./admin-sets-table-badges";
import { SetActionsCell } from "./admin-sets-table-actions";
import type { ExamSetRow } from "./admin-types";

export function AdminSetsTableRow({ examSet }: { examSet: ExamSetRow }) {
  const examName = Array.isArray(examSet.exams)
    ? examSet.exams[0]?.name
    : examSet.exams?.name;

  return (
    <tr className="hover:bg-neutral-50/70">
      <td className="p-3.5 pl-5 font-semibold text-neutral-900">
        <Link href={`/admin/sets/${examSet.id}`} className="hover:text-blue-600 hover:underline">
          {examSet.name}
        </Link>
      </td>
      <td className="p-3.5 text-neutral-600">{examName ?? "General"}</td>
      <td className="p-3.5 text-neutral-600">{examSet.year} — {examSet.session}</td>
      <td className="p-3.5">
        <PaperUploadBadge hasFile={Boolean(examSet.question_paper_path)} />
      </td>
      <td className="p-3.5">
        <SetStatusBadge isActive={examSet.is_active} />
      </td>
      <td className="p-3.5">
        <SetActionsCell set={examSet} />
      </td>
    </tr>
  );
}
