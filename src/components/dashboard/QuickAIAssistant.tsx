import React, { useState } from "react";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuickAIAssistantProps {
  title?: string;
  description?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const QuickAIAssistant = ({
  title = "AI Career Assistant",
  description = "Ask me anything about your career path or education options.",
  messages = [
    {
      id: "1",
      content:
        "Hello! I can help you with career guidance. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  onSendMessage = () => {},
}: QuickAIAssistantProps) => {
  const [inputValue, setInputValue] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message to local state
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setLocalMessages([...localMessages, userMessage]);
    onSendMessage(inputValue);
    setInputValue("");

    // Simulate AI response (in a real app, this would come from the backend)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing your question about career paths. In a real implementation, this would be connected to an AI service that provides personalized guidance.",
        sender: "ai",
        timestamp: new Date(),
      };
      setLocalMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage src="" />
            <AvatarFallback>
              <Bot size={16} className="text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-3 space-y-3 max-h-[150px]">
        {localMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
      </CardContent>

      <CardFooter className="pt-2 border-t">
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Ask about career paths..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </CardFooter>
    </Card>
  );
};

export default QuickAIAssistant;
