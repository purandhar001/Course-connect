import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EducationLevel } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const educationLevels: { value: EducationLevel; label: string }[] = [
  {
    value: "Secondary Education",
    label: "Secondary Education (10th grade)",
  },
  {
    value: "Senior Secondary Education",
    label: "Senior Secondary Education (12th grade)",
  },
  {
    value: "Undergraduate Education",
    label: "Undergraduate Education",
  },
  {
    value: "Postgraduate Education",
    label: "Postgraduate Education",
  },
];

export default function EducationLevelSelector() {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedLevel) return;

    setIsLoading(true);
    try {
      // TODO: Save to Firebase
      console.log("Selected education level:", selectedLevel);

      // Navigate to career interest questionnaire
      setTimeout(() => {
        navigate("/career-questionnaire");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving education level:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Select Your Education Level</CardTitle>
        <CardDescription>
          This helps us personalize your career path recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedLevel || ""}
          onValueChange={(value) => setSelectedLevel(value as EducationLevel)}
          className="space-y-3"
        >
          {educationLevels.map((level) => (
            <div
              key={level.value}
              className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer"
              onClick={() => setSelectedLevel(level.value)}
            >
              <RadioGroupItem value={level.value} id={level.value} />
              <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                {level.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!selectedLevel || isLoading}
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
}
