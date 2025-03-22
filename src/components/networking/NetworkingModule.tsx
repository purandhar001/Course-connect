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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Users, Send, Plus, Search } from "lucide-react";

// Mock data - would come from Firebase in production
const officialGroups = [
  {
    id: "cs_global",
    name: "Computer Science Global",
    description: "Global discussion for Computer Science students",
    members: 1243,
    lastActive: "2 min ago",
  },
  {
    id: "data_science",
    name: "Data Science",
    description: "Discussions about Data Science, ML, and AI",
    members: 856,
    lastActive: "5 min ago",
  },
  {
    id: "web_dev",
    name: "Web Development",
    description: "For all web developers and enthusiasts",
    members: 1102,
    lastActive: "Just now",
  },
];

const localGroups = [
  {
    id: "project_x",
    name: "Project X Collaboration",
    description: "Working on the semester project",
    members: 5,
    lastActive: "1 hour ago",
    creator: "Alex Johnson",
  },
  {
    id: "study_group",
    name: "Final Exam Study Group",
    description: "Preparing for the upcoming exams",
    members: 8,
    lastActive: "30 min ago",
    creator: "Sam Wilson",
  },
];

const mockMessages = [
  {
    id: "1",
    userId: "user1",
    userName: "Alex Johnson",
    message: "Has anyone started working on the assignment yet?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Taylor Smith",
    message:
      "Yes, I've completed the first two questions. The third one is tricky though.",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Jordan Lee",
    message: "I'm stuck on question 3 as well. Maybe we can discuss it here?",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    userId: "user1",
    userName: "Alex Johnson",
    message:
      "Sure, let's break it down. The problem is asking us to optimize the algorithm for better time complexity.",
    timestamp: "10:38 AM",
  },
  {
    id: "5",
    userId: "user4",
    userName: "Casey Brown",
    message:
      "I think we can use dynamic programming for this. Let me share my approach...",
    timestamp: "10:40 AM",
  },
];

export default function NetworkingModule() {
  const [activeTab, setActiveTab] = useState("official");
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [message, setMessage] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectGroup = (group: any) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // TODO: Send message to Firebase
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description) return;

    // TODO: Create group in Firebase
    console.log("Creating group:", newGroup);
    setNewGroup({ name: "", description: "" });
    setIsCreateGroupOpen(false);
  };

  const filteredOfficialGroups = officialGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredLocalGroups = localGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Networking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Chat Groups</CardTitle>
                {activeTab === "local" && (
                  <Dialog
                    open={isCreateGroupOpen}
                    onOpenChange={setIsCreateGroupOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Group
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Group</DialogTitle>
                        <DialogDescription>
                          Start a new collaboration group for your project
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input
                            id="group-name"
                            value={newGroup.name}
                            onChange={(e) =>
                              setNewGroup({ ...newGroup, name: e.target.value })
                            }
                            placeholder="e.g., Project Collaboration"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-description">Description</Label>
                          <Textarea
                            id="group-description"
                            value={newGroup.description}
                            onChange={(e) =>
                              setNewGroup({
                                ...newGroup,
                                description: e.target.value,
                              })
                            }
                            placeholder="What is this group about?"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleCreateGroup}>
                          Create Group
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <CardDescription>
                Connect with peers and collaborate on projects
              </CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                defaultValue="official"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="official">
                    <Globe className="h-4 w-4 mr-2" />
                    Official
                  </TabsTrigger>
                  <TabsTrigger value="local">
                    <Users className="h-4 w-4 mr-2" />
                    Local
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="official" className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-1 p-2">
                      {filteredOfficialGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedGroup?.id === group.id ? "bg-muted" : "hover:bg-muted/50"}`}
                          onClick={() => handleSelectGroup(group)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{group.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {group.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{group.members} members</span>
                            <span>Active: {group.lastActive}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="local" className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-1 p-2">
                      {filteredLocalGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedGroup?.id === group.id ? "bg-muted" : "hover:bg-muted/50"}`}
                          onClick={() => handleSelectGroup(group)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{group.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {group.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Created by: {group.creator}</span>
                            <span>{group.members} members</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedGroup ? (
              <>
                <CardHeader className="pb-3">
                  <CardTitle>{selectedGroup.name}</CardTitle>
                  <CardDescription>{selectedGroup.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden flex flex-col">
                  <ScrollArea className="flex-grow mb-4">
                    <div className="space-y-4">
                      {mockMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.userId}`}
                            />
                            <AvatarFallback>
                              {msg.userName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {msg.userName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="mt-1">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Select a group to start chatting
                  </h3>
                  <p>
                    Choose from official domain groups or local collaboration
                    spaces
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
