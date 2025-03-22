import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Bot,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import FloatingNavbar from "./layout/FloatingNavbar";

const featuredModules = [
  {
    title: "Career Selection",
    description: "Explore and update your career path options",
    icon: <BookOpen className="h-6 w-6" />,
    path: "/career",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "Routine Management",
    description: "Manage your weekly study schedule",
    icon: <Calendar className="h-6 w-6" />,
    path: "/routine",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Networking",
    description: "Connect with peers in your field",
    icon: <MessageCircle className="h-6 w-6" />,
    path: "/networking",
    color: "bg-purple-100 dark:bg-purple-900",
  },
  {
    title: "AI Assistant",
    description: "Get personalized career guidance",
    icon: <Bot className="h-6 w-6" />,
    path: "/ai-assistant",
    color: "bg-amber-100 dark:bg-amber-900",
  },
];

function Home() {
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{greeting}, Student</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to CourseConnect. Let's continue your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredModules.map((module) => (
            <Card key={module.path} className="overflow-hidden">
              <div className={`p-3 ${module.color}`}>{module.icon}</div>
              <CardHeader className="pb-2">
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={module.path}>
                  <Button variant="outline" className="w-full">
                    Open
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your educational journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Profile Completion
                    </span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Career Path Exploration
                    </span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Routine Adherence
                    </span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>From your routine schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Study Mathematics</p>
                    <p className="text-sm text-muted-foreground">
                      Today, 2:00 PM
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Computer Science Project</p>
                    <p className="text-sm text-muted-foreground">
                      Tomorrow, 10:00 AM
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Group Discussion</p>
                    <p className="text-sm text-muted-foreground">
                      Wednesday, 4:00 PM
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingNavbar />
    </div>
  );
}

export default Home;
