import Link from "next/link";
import { ArrowRight, Trophy } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-neutral-200 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl">
          <CardContent className="flex flex-col items-center p-8 text-center sm:p-12 space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/30 border border-blue-400/40 text-blue-300">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-extrabold sm:text-4xl">
                Ready to Test Your Knowledge?
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base">
                Jump into real UGC NET mock papers with exact exam conditions, server countdown, and instant scorecard analysis.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/exams">
                <Button size="lg" className="gap-2 bg-blue-600 text-white hover:bg-blue-500 shadow-lg">
                  <span>Start Free Mock Test</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
