import { useState } from "react";
import EducationLevelSelector from "@/components/auth/EducationLevelSelector";
import CareerQuestionnaire from "@/components/career/CareerQuestionnaire";

type OnboardingStep = "education" | "career";

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("education");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      {step === "education" ? (
        <div className="w-full max-w-md">
          <EducationLevelSelector />
          {/* This would normally be handled by the component's navigation */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep("career")}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Demo: Next Step
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <CareerQuestionnaire />
        </div>
      )}
    </div>
  );
}
