import React from "react";
import NavigationBar from "@/components/layout/NavigationBar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import CareerPathSummary from "@/components/dashboard/CareerPathSummary";
import RoutineSummary from "@/components/dashboard/RoutineSummary";
import RecentChats from "@/components/dashboard/RecentChats";
import QuickAIAssistant from "@/components/dashboard/QuickAIAssistant";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    educationLevel: "Undergraduate Education",
    notificationCount: 3,
  };

  // Navigation handlers
  const handleEditCareer = () => {
    navigate("/career");
  };

  const handleViewFullRoutine = () => {
    navigate("/routine");
  };

  const handleEditRoutine = () => {
    navigate("/routine");
  };

  const handleViewAllChats = () => {
    navigate("/networking");
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/networking/chat/${chatId}`);
  };

  const handleSendAIMessage = (message: string) => {
    console.log("Sending message to AI:", message);
    // In a real implementation, this would send the message to an AI service
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <div className="flex-1 ml-20 flex flex-col">
        {/* Header */}
        <DashboardHeader
          userName={userData.name}
          userAvatar={userData.avatar}
          educationLevel={userData.educationLevel}
          notificationCount={userData.notificationCount}
        />

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Career Path Summary */}
              <CareerPathSummary
                userName={userData.name}
                educationLevel={userData.educationLevel}
                onEditCareer={handleEditCareer}
              />

              {/* Recent Chats */}
              <RecentChats
                onViewAllClick={handleViewAllChats}
                onChatClick={handleChatClick}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Routine Summary */}
              <RoutineSummary
                date={new Date()}
                onViewFullRoutine={handleViewFullRoutine}
                onEditRoutine={handleEditRoutine}
              />

              {/* Quick AI Assistant */}
              <QuickAIAssistant onSendMessage={handleSendAIMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
