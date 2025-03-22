import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const AuthPage = lazy(() => import("./pages/AuthPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const CareerPathsModule = lazy(
  () => import("./components/career/CareerPathsModule"),
);
const RoutineManagement = lazy(
  () => import("./components/routine/RoutineManagement"),
);
const NetworkingModule = lazy(
  () => import("./components/networking/NetworkingModule"),
);
const AIAssistant = lazy(() => import("./components/ai-assistant/AIAssistant"));

function App() {
  // In a real app, this would be determined by checking authentication state
  const isAuthenticated = true;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          {/* Auth routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/career"
            element={
              isAuthenticated ? <CareerPathsModule /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/routine"
            element={
              isAuthenticated ? <RoutineManagement /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/networking"
            element={
              isAuthenticated ? <NetworkingModule /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/ai-assistant"
            element={
              isAuthenticated ? <AIAssistant /> : <Navigate to="/login" />
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Allow Tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
