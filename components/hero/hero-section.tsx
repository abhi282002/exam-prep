import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-100">
      <Link
        href="/exams"
        aria-label="Explore and start mock exam preparation"
        className="relative block w-full aspect-[16/9] select-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}
      >
        <Image
          src="/images/hero-exam-journey.png"
          alt="Turn Practice into Progress - ExamPrep Platform"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Link>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-neutral-100 via-neutral-100/50 to-transparent" />
    </section>
  );
}
