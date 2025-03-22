export interface User {
  userId: string;
  name: string;
  email: string;
  educationLevel: EducationLevel;
  selectedDomains: string[];
  routineId?: string;
  createdAt: string;
}

export type EducationLevel =
  | "Secondary Education"
  | "Senior Secondary Education"
  | "Undergraduate Education"
  | "Postgraduate Education";

export interface Domain {
  domainId: string;
  name: string;
  parentId: string | null;
  childDomains?: string[];
}

export interface RoutineTask {
  time: string;
  task: string;
}

export interface Routine {
  routineId: string;
  userId: string;
  schedule: {
    [day: string]: RoutineTask[];
  };
  shared: boolean;
}

export interface Chat {
  chatId: string;
  name: string;
  type: "official" | "local";
  members: string[];
  createdAt: string;
}

export interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

export interface Course {
  courseId: string;
  name: string;
  category: string;
  studentsEnrolled: string[];
  createdAt: string;
}

export interface AIAssistance {
  sessionId: string;
  userId: string;
  query: string;
  response: string;
  timestamp: string;
}
