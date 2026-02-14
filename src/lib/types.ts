export type Role = "admin" | "student";

export interface UserAccount {
  fullName: string;
  email: string;
  password: string;
  registeredAt: string;
  enrolledCourses: string[];
  role: Role;
  darkMode: boolean;
  emailNotifications: boolean;
}

export interface Course {
  title: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Session {
  token: string;
  email: string;
  createdAt: string;
}

export interface DatabaseShape {
  accounts: UserAccount[];
  courses: Course[];
  contacts: ContactMessage[];
  sessions: Session[];
}
