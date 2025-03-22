import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data - would come from Firebase in production
const careerDomains = [
  {
    id: "computer_science",
    name: "Computer Science",
    children: [
      { id: "software_development", name: "Software Development" },
      { id: "data_science", name: "Data Science" },
      { id: "cybersecurity", name: "Cybersecurity" },
    ],
  },
  {
    id: "medicine",
    name: "Medicine & Healthcare",
    children: [
      { id: "doctor", name: "Doctor" },
      { id: "nursing", name: "Nursing" },
      { id: "pharmacy", name: "Pharmacy" },
    ],
  },
  {
    id: "business",
    name: "Business & Management",
    children: [
      { id: "finance", name: "Finance" },
      { id: "marketing", name: "Marketing" },
      { id: "entrepreneurship", name: "Entrepreneurship" },
    ],
  },
];

export default function CareerQuestionnaire() {
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId],
    );
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) return;

    setIsLoading(true);
    try {
      // TODO: Save to Firebase
      console.log("Selected career options:", selectedOptions);

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving career options:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Career Interest Questionnaire</CardTitle>
        <CardDescription>
          Select the domains and specific areas you're interested in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {careerDomains.map((domain) => (
          <div key={domain.id} className="space-y-2">
            <div
              className="flex items-center justify-between p-3 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
              onClick={() => toggleDomain(domain.id)}
            >
              <Label className="text-base font-medium cursor-pointer">
                {domain.name}
              </Label>
              <Button variant="ghost" size="sm">
                {expandedDomains.includes(domain.id) ? "−" : "+"}
              </Button>
            </div>

            {expandedDomains.includes(domain.id) && (
              <div className="ml-6 space-y-2">
                {domain.children.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50"
                  >
                    <Checkbox
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={() => toggleOption(option.id)}
                    />
                    <Label
                      htmlFor={option.id}
                      className="cursor-pointer"
                      onClick={() => toggleOption(option.id)}
                    >
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={selectedOptions.length === 0 || isLoading}
        >
          {isLoading ? "Saving..." : "Complete Setup"}
        </Button>
      </CardFooter>
    </Card>
  );
}
