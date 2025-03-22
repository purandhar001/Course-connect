import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, MessageCircle, Bot, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Career Selection",
    path: "/career",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "Routine Management",
    path: "/routine",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    name: "Networking",
    path: "/networking",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    name: "AI Assistance",
    path: "/ai-assistant",
    icon: <Bot className="h-5 w-5" />,
  },
];

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Navigation items */}
        <div
          className={cn(
            "flex flex-col md:flex-row items-center gap-2 md:gap-1 bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-lg transition-all duration-300",
            isOpen
              ? "opacity-100 visible translate-y-0 mb-16 md:mb-0"
              : "opacity-0 invisible translate-y-4 md:opacity-100 md:visible md:translate-y-0",
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
