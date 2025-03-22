import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Share2, Clock, Save, Trash2 } from "lucide-react";
import { RoutineTask } from "@/types";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Default routine template
const defaultRoutine: Record<string, RoutineTask[]> = {
  Monday: [
    { time: "08:00 AM", task: "Study Mathematics" },
    { time: "10:00 AM", task: "Break" },
    { time: "10:30 AM", task: "Study Science" },
  ],
  Tuesday: [
    { time: "09:00 AM", task: "Study Literature" },
    { time: "11:00 AM", task: "Break" },
    { time: "11:30 AM", task: "Study History" },
  ],
  Wednesday: [
    { time: "08:00 AM", task: "Study Computer Science" },
    { time: "10:00 AM", task: "Break" },
    { time: "10:30 AM", task: "Study Physics" },
  ],
  Thursday: [
    { time: "09:00 AM", task: "Study Economics" },
    { time: "11:00 AM", task: "Break" },
    { time: "11:30 AM", task: "Study Geography" },
  ],
  Friday: [
    { time: "08:00 AM", task: "Study Languages" },
    { time: "10:00 AM", task: "Break" },
    { time: "10:30 AM", task: "Study Arts" },
  ],
  Saturday: [
    { time: "10:00 AM", task: "Review Week's Material" },
    { time: "12:00 PM", task: "Break" },
    { time: "01:00 PM", task: "Practice Problems" },
  ],
  Sunday: [
    { time: "11:00 AM", task: "Plan for Next Week" },
    { time: "12:00 PM", task: "Free Time" },
  ],
};

export default function RoutineManagement() {
  const [routine, setRoutine] =
    useState<Record<string, RoutineTask[]>>(defaultRoutine);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<RoutineTask>({ time: "", task: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddTask = () => {
    if (!newTask.time || !newTask.task) return;

    if (editingIndex !== null) {
      // Edit existing task
      const updatedTasks = [...routine[selectedDay]];
      updatedTasks[editingIndex] = newTask;
      setRoutine({ ...routine, [selectedDay]: updatedTasks });
      setEditingIndex(null);
    } else {
      // Add new task
      setRoutine({
        ...routine,
        [selectedDay]: [...(routine[selectedDay] || []), newTask],
      });
    }

    setNewTask({ time: "", task: "" });
    setIsAddTaskOpen(false);
  };

  const handleEditTask = (index: number) => {
    setNewTask(routine[selectedDay][index]);
    setEditingIndex(index);
    setIsAddTaskOpen(true);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = routine[selectedDay].filter((_, i) => i !== index);
    setRoutine({ ...routine, [selectedDay]: updatedTasks });
  };

  const handleSaveRoutine = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firebase
      console.log("Saving routine:", routine);

      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving routine:", error);
      setIsSaving(false);
    }
  };

  const handleShareRoutine = () => {
    // TODO: Generate shareable link
    console.log("Sharing routine");
    setIsShareDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Routine Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleSaveRoutine} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Routine"}
          </Button>
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Routine</DialogTitle>
                <DialogDescription>
                  Generate a link to share your routine with others
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Share Options</Label>
                  <Select defaultValue="view">
                    <SelectTrigger>
                      <SelectValue placeholder="Select permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="copy">Allow Copy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleShareRoutine}>Generate Link</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Days</CardTitle>
            <CardDescription>Select a day to view or edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedDay}'s Schedule</CardTitle>
                <CardDescription>
                  Manage your tasks for {selectedDay}
                </CardDescription>
              </div>
              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingIndex !== null ? "Edit Task" : "Add New Task"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingIndex !== null
                        ? "Update the details for this task"
                        : "Add a new task to your routine"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newTask.time}
                        onChange={(e) =>
                          setNewTask({ ...newTask, time: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task">Task Description</Label>
                      <Input
                        id="task"
                        value={newTask.task}
                        onChange={(e) =>
                          setNewTask({ ...newTask, task: e.target.value })
                        }
                        placeholder="What do you need to do?"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddTask}>
                      {editingIndex !== null ? "Update Task" : "Add Task"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {routine[selectedDay]?.length > 0 ? (
              <div className="space-y-4">
                {routine[selectedDay]
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">
                            {task.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks scheduled for {selectedDay}</p>
                <p className="text-sm">
                  Click "Add Task" to create your first task
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
