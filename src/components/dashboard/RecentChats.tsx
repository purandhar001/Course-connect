import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  groupId: string;
  groupName: string;
  groupType: "official" | "project";
  message: string;
  sender: string;
  senderAvatar?: string;
  timestamp: string;
  unread: boolean;
}

interface RecentChatsProps {
  chats?: ChatMessage[];
  onViewAllClick?: () => void;
  onChatClick?: (chatId: string) => void;
}

const RecentChats = ({
  chats = [
    {
      id: "1",
      groupId: "cs-global",
      groupName: "Computer Science",
      groupType: "official",
      message: "Has anyone used the new React 18 features yet?",
      sender: "Alex Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      timestamp: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      groupId: "project-web-app",
      groupName: "Web App Project",
      groupType: "project",
      message: "I just pushed the latest changes to the repo",
      sender: "Maria Garcia",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      timestamp: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      groupId: "data-science",
      groupName: "Data Science",
      groupType: "official",
      message: "Check out this new dataset I found for our project",
      sender: "James Wilson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      timestamp: "Yesterday",
      unread: true,
    },
  ],
  onViewAllClick = () => {},
  onChatClick = () => {},
}: RecentChatsProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Recent Chats</CardTitle>
          <CardDescription>Stay connected with your groups</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-primary"
          onClick={onViewAllClick}
        >
          View All <ArrowRight size={16} />
        </Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => onChatClick(chat.groupId)}
            >
              <Avatar className="h-10 w-10">
                {chat.senderAvatar ? (
                  <AvatarImage src={chat.senderAvatar} alt={chat.sender} />
                ) : (
                  <AvatarFallback>{chat.sender.substring(0, 2)}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm truncate">
                      {chat.groupName}
                    </h4>
                    <Badge
                      variant={
                        chat.groupType === "official" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {chat.groupType === "official" ? "Official" : "Project"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground truncate">
                    <span className="font-medium text-foreground">
                      {chat.sender}:{" "}
                    </span>
                    {chat.message}
                  </p>
                  {chat.unread && (
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={onViewAllClick}
        >
          <MessageCircle size={18} />
          Open Networking Module
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentChats;
