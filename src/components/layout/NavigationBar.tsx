import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  Calendar,
  MessageSquare,
  HelpCircle,
  Home,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavigationItem = ({
  icon,
  label,
  to,
  isActive = false,
}: NavigationItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to} className="block">
            <div
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-xl mx-auto mb-4 transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {icon}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const NavigationBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-background border-r border-border py-6 flex flex-col items-center">
      <div className="mb-10">
        <Link to="/dashboard">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            CC
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center flex-1">
        <NavigationItem
          icon={<Home size={24} />}
          label="Dashboard"
          to="/dashboard"
          isActive={pathname === "/dashboard"}
        />
        <NavigationItem
          icon={<BookOpen size={24} />}
          label="Career Selection"
          to="/career"
          isActive={pathname.startsWith("/career")}
        />
        <NavigationItem
          icon={<Calendar size={24} />}
          label="Routine Management"
          to="/routine"
          isActive={pathname.startsWith("/routine")}
        />
        <NavigationItem
          icon={<MessageSquare size={24} />}
          label="Networking"
          to="/networking"
          isActive={pathname.startsWith("/networking")}
        />
        <NavigationItem
          icon={<HelpCircle size={24} />}
          label="AI Assistance"
          to="/ai-assistant"
          isActive={pathname.startsWith("/ai-assistant")}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
