export interface UserAccount {
  id: number;
  fullName: string;
  email: string;
  passwordHash: string;
  registeredAt: string;
  enrolledCourses: string[];
}

export interface Course {
  courseId: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  createdAt: string;
}

export interface ContactMessage {
  contactId: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export interface Session {
  sessionId: string;
  userId: number;
  expiresAt: string;
}
