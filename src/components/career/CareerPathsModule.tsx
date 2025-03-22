import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

// Mock data - would come from Firebase in production
const userSelectedDomains = ["software_development", "data_science"];

const careerPaths = [
  {
    id: "software_development",
    name: "Software Development",
    description: "Design, develop, and maintain software applications",
    educationPaths: [
      "Bachelor's in Computer Science",
      "Full-Stack Development Bootcamp",
      "Software Engineering Degree",
    ],
    skills: [
      "JavaScript",
      "Python",
      "Problem Solving",
      "Git",
      "Agile Methodology",
    ],
    jobRoles: [
      "Frontend Developer",
      "Backend Engineer",
      "Full-Stack Developer",
      "Mobile App Developer",
    ],
  },
  {
    id: "data_science",
    name: "Data Science",
    description:
      "Extract insights and knowledge from structured and unstructured data",
    educationPaths: [
      "Bachelor's in Statistics or Computer Science",
      "Master's in Data Science",
      "Data Analysis Certification",
    ],
    skills: [
      "Python",
      "R",
      "SQL",
      "Machine Learning",
      "Data Visualization",
      "Statistics",
    ],
    jobRoles: [
      "Data Scientist",
      "Data Analyst",
      "Machine Learning Engineer",
      "Business Intelligence Analyst",
    ],
  },
];

export default function CareerPathsModule() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Career Paths</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Selected Domains</CardTitle>
              <CardDescription>Your career interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {careerPaths
                .filter((path) => userSelectedDomains.includes(path.id))
                .map((path) => (
                  <Button
                    key={path.id}
                    variant={
                      selectedPath.id === path.id ? "default" : "outline"
                    }
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedPath(path)}
                  >
                    {path.name}
                  </Button>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{selectedPath.name}</CardTitle>
              <CardDescription>{selectedPath.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="education">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="education">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Job Roles
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="education" className="space-y-4 mt-4">
                  <h3 className="font-medium">Recommended Education Paths:</h3>
                  <ul className="space-y-2 ml-5 list-disc">
                    {selectedPath.educationPaths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="skills" className="mt-4">
                  <h3 className="font-medium mb-4">Key Skills to Develop:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="jobs" className="space-y-4 mt-4">
                  <h3 className="font-medium">Potential Job Roles:</h3>
                  <ul className="space-y-2 ml-5 list-disc">
                    {selectedPath.jobRoles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
