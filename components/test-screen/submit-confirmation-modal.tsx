interface SubmitModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  markedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmitConfirmationModal(props: SubmitModalProps) {
  if (!props.isOpen) return null;
  const unansweredCount = props.totalQuestions - props.answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#121620] border border-neutral-800 p-6 shadow-2xl space-y-5">
        <div>
          <h3 className="text-base font-bold text-white">Confirm Final Submission</h3>
          <p className="text-xs text-neutral-400">Your test will be evaluated once submitted.</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 rounded-xl bg-[#161B26] p-3 text-center text-xs">
          <div className="rounded-lg bg-emerald-950/60 p-2 text-emerald-300 border border-emerald-700/50">
            <span className="text-base font-bold block">{props.answeredCount}</span>
            <span className="text-[10px]">Answered</span>
          </div>
          <div className="rounded-lg bg-neutral-800/60 p-2 text-neutral-300 border border-neutral-700">
            <span className="text-base font-bold block">{unansweredCount}</span>
            <span className="text-[10px]">Unanswered</span>
          </div>
          <div className="rounded-lg bg-blue-950/60 p-2 text-blue-300 border border-blue-700/50">
            <span className="text-base font-bold block">{props.markedCount}</span>
            <span className="text-[10px]">Review</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button type="button" onClick={props.onCancel} className="px-4 py-2 text-xs rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer">
            Back to Test
          </button>
          <button type="button" onClick={props.onConfirm} className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer">
            Yes, Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}
