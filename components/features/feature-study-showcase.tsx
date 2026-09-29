import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "@/components/icons";

export function FeatureStudyShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-2 shadow-xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/hero-study-desk.png"
            alt="Student practicing mock exam with live countdown"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 hidden sm:block">
        <Badge variant="outline" className="gap-2 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-md border-neutral-200">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>Live Countdown: 59:59</span>
        </Badge>
      </div>
      <div className="absolute -top-3 -left-3 hidden sm:block">
        <Badge className="gap-1.5 bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-md">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Autosave On Every Click</span>
        </Badge>
      </div>
    </div>
  );
}
