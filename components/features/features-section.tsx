import { FeaturesHeader } from "./features-header";
import { FeatureStudyShowcase } from "./feature-study-showcase";
import { platformFeaturesList } from "./features-data";
import { FeatureItem } from "./feature-item";

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 border-t border-neutral-200/80 bg-neutral-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <FeaturesHeader />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FeatureStudyShowcase />
          <div className="flex flex-col gap-4">
            {platformFeaturesList.map((individualFeature) => (
              <FeatureItem
                key={individualFeature.featureIdentifier}
                featureData={individualFeature}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
