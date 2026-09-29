import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-100">
      <Link
        href="/exams"
        aria-label="Explore and start mock exam preparation"
        className="relative block w-full aspect-[16/9] select-none"
      >
        <Image
          src="/images/hero-banner.jpg"
          alt="Practice Smarter, Score Higher - ExamPrep Mock Exam Platform"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Link>
    </section>
  );
}
