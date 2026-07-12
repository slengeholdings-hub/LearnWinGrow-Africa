export type AppView = 'landing' | 'dashboard' | 'assessment' | 'brands' | 'admin' | 'blog' | 'splash' | 'register' | 'lwg-corporate';

export interface Question {
  id: number;
  questionText: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
}

export interface Company {
  id: string;
  name: string;
  description: string;
  matchRate: number;
  sector: 'Fintech' | 'Agriculture' | 'Tech' | 'Renewable Energy' | 'Creative Economy';
  location: string;
  logo: string;
  bannerImage: string;
  hiringStatus: 'Actively Hiring' | 'Hiring Soon' | 'Closed';
  isFeatured?: boolean;
}

export interface Survey {
  id: string;
  title: string;
  status: 'Active' | 'Scheduled' | 'Completed';
  responses: number;
  completionRate: number;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  snippet: string;
}
