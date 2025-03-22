import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Edit, ExternalLink } from "lucide-react";
import { Separator } from "../ui/separator";

interface Task {
  time: string;
  task: string;
  completed?: boolean;
}

interface RoutineSummaryProps {
  tasks?: Task[];
  date?: Date;
  onViewFullRoutine?: () => void;
  onEditRoutine?: () => void;
}

const RoutineSummary = ({
  tasks = [
    { time: "08:00 AM", task: "Morning Study Session", completed: true },
    { time: "10:30 AM", task: "Computer Science Lecture", completed: false },
    { time: "01:00 PM", task: "Lunch Break", completed: false },
    { time: "02:30 PM", task: "Project Work", completed: false },
    { time: "05:00 PM", task: "Exercise", completed: false },
    { time: "07:00 PM", task: "Dinner", completed: false },
    { time: "08:00 PM", task: "Evening Study Session", completed: false },
  ],
  date = new Date(),
  onViewFullRoutine = () => {},
  onEditRoutine = () => {},
}: RoutineSummaryProps) => {
  // Format the current date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <Card className="w-full h-full bg-white shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Today's Routine</CardTitle>
            <CardDescription className="text-gray-500">
              {formattedDate}
            </CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={onEditRoutine}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="relative">
                  <div
                    className={`h-4 w-4 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                  {index < tasks.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-0.5 h-14 -translate-x-1/2 bg-gray-200"></div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    {task.time}
                  </span>
                </div>
                <div
                  className={`mt-1 font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                >
                  {task.task}
                </div>
                {index < tasks.length - 1 && <div className="h-6"></div>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={onViewFullRoutine}
        >
          <span>View Full Weekly Routine</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoutineSummary;
