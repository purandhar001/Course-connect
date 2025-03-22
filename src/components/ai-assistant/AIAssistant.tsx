import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Sample responses for the AI assistant
const sampleResponses: Record<string, string> = {
  career:
    "Based on your interest in Computer Science, I recommend exploring software development, data science, or cybersecurity. Each path requires different skills but all have strong job prospects.",
  courses:
    "For software development, I recommend courses in programming fundamentals, data structures, algorithms, and web development. Consider platforms like Coursera, edX, or specialized bootcamps.",
  skills:
    "Important skills to develop include programming languages (Python, JavaScript), problem-solving, teamwork, and continuous learning. Technical skills should be complemented with soft skills like communication.",
  routine:
    "An effective study routine includes dedicated time blocks, regular breaks, and varied learning activities. Try the Pomodoro technique with 25-minute focused sessions followed by 5-minute breaks.",
  default:
    "I'm your AI career assistant. I can help with career guidance, course recommendations, skill development advice, and productivity tips. What would you like to know about?",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI career assistant. How can I help you today? You can ask me about career paths, course recommendations, skill development, or study routines.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseContent = getAIResponse(input.toLowerCase());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    if (
      query.includes("career") ||
      query.includes("job") ||
      query.includes("profession")
    ) {
      return sampleResponses.career;
    } else if (
      query.includes("course") ||
      query.includes("class") ||
      query.includes("learn")
    ) {
      return sampleResponses.courses;
    } else if (
      query.includes("skill") ||
      query.includes("ability") ||
      query.includes("knowledge")
    ) {
      return sampleResponses.skills;
    } else if (
      query.includes("routine") ||
      query.includes("schedule") ||
      query.includes("productivity")
    ) {
      return sampleResponses.routine;
    } else {
      return sampleResponses.default;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Career Assistant</h1>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Career Guidance Assistant</CardTitle>
          <CardDescription>
            Ask questions about career paths, courses, skills, or study routines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar>
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=assistant" />
                          <AvatarFallback>
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=assistant" />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <p>Typing...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <Input
              placeholder="Ask a question about your career path..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
