export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type AppRoute =
  | 'login'
  | 'landing'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'prephub'
  | 'mypath'
  | 'community'
  | 'courses'
  | 'assignments'
  | 'certificates'
  | 'progress'
  | 'hackathons'
  | 'internships'
  | 'jobs'
  | 'topic-viewer';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: ProficiencyLevel;
  targetRole: string;
  targetCompanyTier: 'FAANG/Tier-1' | 'High-Growth Unicorn' | 'Mid-size Tech' | 'Open Source';
  weeklyHoursGoal: number;
  streakDays: number;
  xp: number;
  improvementRate: number; // percentage e.g. 24
  lessonsCompleted: number;
  coursesInProgress: number;
  preferredFormat: ContentFormat;
  isOnboarded: boolean;
  theme: 'light' | 'dark';
}

export type ContentFormat = 'text' | 'video' | 'audio' | 'diagram' | 'comic' | 'interactive';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  tip?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicContent {
  id: string;
  title: string;
  subject: string;
  sheetName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  tags: string[];
  // Level-adapted framing
  levelFraming: {
    Beginner: {
      summary: string;
      focusTip: string;
    };
    Intermediate: {
      summary: string;
      focusTip: string;
    };
    Advanced: {
      summary: string;
      focusTip: string;
    };
  };
  // Multi-format representations
  textNotes: {
    introduction: string;
    keyConcepts: { title: string; description: string }[];
    codeSnippet: {
      language: string;
      code: string;
      complexity: { time: string; space: string };
    };
    edgeCases: string[];
  };
  videoData: {
    title: string;
    duration: string;
    instructor: string;
    timestamps: { time: string; label: string }[];
    summary: string;
  };
  audioData: {
    title: string;
    duration: string;
    audioByteName: string;
    transcriptSummary: string[];
  };
  diagramData: {
    type: 'flow' | 'architecture' | 'array-pointers';
    steps: { stepNumber: number; title: string; description: string; activeNodeId: string }[];
    nodes: { id: string; label: string; subtext?: string; status: 'active' | 'passive' | 'highlight' }[];
  };
  comicData: {
    title: string;
    themeStory: string;
    panels: {
      panelNumber: number;
      character: string;
      dialogue: string;
      narrative: string;
    }[];
  };
  interactiveData: {
    title: string;
    description: string;
    initialArray: number[];
    targetValue?: number;
  };
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface PrephubSheet {
  id: string;
  title: string;
  subjectCategory: 'DSA' | 'System Design' | 'Core Subjects' | 'Data Engineering';
  sheetCountLabel: string;
  description: string;
  totalTopics: number;
  completedTopics: number;
  topics: TopicContent[];
}

export interface OpportunityItem {
  id: string;
  type: 'hackathon' | 'internship' | 'job';
  title: string;
  organization: string;
  logo: string;
  location: string;
  eligibility: string;
  stipendOrSalary: string;
  deadline: string;
  daysLeft: number;
  appliedCount: number;
  tags: string[];
  mode: 'Remote' | 'On-site' | 'Hybrid';
  isApplied?: boolean;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    companyOrCollege: string;
  };
  title: string;
  content: string;
  category: 'Interview Experience' | 'Success Stories' | 'Prep Doubts' | 'My Drops';
  tags: string[];
  postedAt: string;
  upvotes: number;
  views: number;
  commentsCount: number;
  isUpvoted?: boolean;
  comments: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'Development' | 'Design' | 'Data Science';
  subCategory: string;
  instructor: string;
  level: ProficiencyLevel;
  progressPercentage: number;
  totalModules: number;
  completedModules: number;
  rating: number;
  image: string;
  nextTopicId?: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  courseTitle: string;
  deadline: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  score?: string;
  maxScore: number;
  instructions: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  credentialId: string;
  issueDate: string;
  issuer: string;
  skills: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'opportunity' | 'study' | 'achievement';
  unread: boolean;
  targetRoute?: AppRoute;
}
