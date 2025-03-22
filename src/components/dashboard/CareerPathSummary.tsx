import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Domain, EducationLevel } from "@/types";

interface CareerPathSummaryProps {
  userName?: string;
  educationLevel?: EducationLevel;
  selectedDomain?: Domain;
  subDomains?: Domain[];
  nextSteps?: string[];
  onEditCareer?: () => void;
}

const CareerPathSummary = ({
  userName = "Alex",
  educationLevel = "Undergraduate Education",
  selectedDomain = {
    domainId: "computer_science",
    name: "Computer Science",
    parentId: null,
    childDomains: ["software_development", "data_science", "cybersecurity"],
  },
  subDomains = [
    {
      domainId: "software_development",
      name: "Software Development",
      parentId: "computer_science",
      childDomains: [],
    },
    {
      domainId: "data_science",
      name: "Data Science",
      parentId: "computer_science",
      childDomains: [],
    },
  ],
  nextSteps = [
    "Complete the Introduction to Algorithms course",
    "Build a portfolio project using React",
    "Join the campus coding club",
    "Apply for summer internships in tech companies",
  ],
  onEditCareer = () => console.log("Edit career clicked"),
}: CareerPathSummaryProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Career Path</CardTitle>
          <Badge
            variant="outline"
            className="bg-white/20 text-white border-white/30"
          >
            <GraduationCap className="h-3.5 w-3.5 mr-1" />
            {educationLevel}
          </Badge>
        </div>
        <CardDescription className="text-blue-100">
          Your selected career journey based on interests
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium flex items-center text-gray-800">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              Primary Domain
            </h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {selectedDomain.name}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center text-gray-800">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              Focus Areas
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {subDomains.map((domain) => (
                <Badge
                  key={domain.domainId}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {domain.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center text-gray-800">
              <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
              Recommended Next Steps
            </h3>
            <ul className="mt-2 space-y-2">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button
          onClick={onEditCareer}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Edit Career Selections
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareerPathSummary;
