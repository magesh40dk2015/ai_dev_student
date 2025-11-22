
import { LessonLevel, Subject, User, UserRole, StudentProgress, Badge } from "./types";

export const MOCK_STUDENT: User = {
  id: 's1',
  name: 'Arjun',
  role: UserRole.STUDENT,
  grade: 'Class 3',
  xp: 1250,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
};

export const MOCK_TEACHER: User = {
  id: 't1',
  name: 'Mrs. Lakshmi',
  role: UserRole.TEACHER,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
  email: 'teacher@school.edu'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Principal Rao',
  role: UserRole.ADMIN,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rao',
  email: 'admin@school.edu'
};

export const BADGES: Badge[] = [
  { id: 'b1', name: 'Math Whiz', icon: '🧮', description: 'Complete 5 Math lessons', unlocked: true },
  { id: 'b2', name: 'Bookworm', icon: '📚', description: 'Complete 3 English stories', unlocked: true },
  { id: 'b3', name: 'Super Star', icon: '⭐', description: 'Get 3 stars in a quiz', unlocked: false },
  { id: 'b4', name: 'Early Bird', icon: '🌅', description: 'Login before 8 AM', unlocked: false },
];

export const LESSON_PATH: LessonLevel[] = [
  // --- UKG ---
  {
    id: 'ukg-m1',
    title: 'Counting 1-20',
    subject: Subject.MATH,
    grade: 'UKG',
    description: 'Let\'s count objects!',
    isLocked: false,
    isCompleted: true,
    stars: 3,
    topics: ['Number Recognition', 'Counting']
  },
  {
    id: 'ukg-e1',
    title: 'Alphabet Fun',
    subject: Subject.ENGLISH,
    grade: 'UKG',
    description: 'A for Apple, B for Ball',
    isLocked: false,
    isCompleted: true,
    stars: 2,
    topics: ['Alphabet', 'Phonics']
  },
  {
    id: 'ukg-m2',
    title: 'Shapes & Sizes',
    subject: Subject.MATH,
    grade: 'UKG',
    description: 'Circle, Square, Big vs Small',
    isLocked: false,
    isCompleted: false,
    stars: 0,
    topics: ['Geometry', 'Comparison']
  },

  // --- Class 1 ---
  {
    id: 'c1-m1',
    title: 'Numbers 1-100',
    subject: Subject.MATH,
    grade: 'Class 1',
    description: 'Counting forward and backward',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Numbers', 'Counting']
  },
  {
    id: 'c1-m2',
    title: 'Simple Addition',
    subject: Subject.MATH,
    grade: 'Class 1',
    description: 'Adding single digit numbers',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Addition']
  },
  {
    id: 'c1-e1',
    title: 'Short Sentences',
    subject: Subject.ENGLISH,
    grade: 'Class 1',
    description: 'Reading "The cat sat on the mat"',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Reading', 'Grammar']
  },

  // --- Class 2 ---
  {
    id: 'c2-m1',
    title: 'Place Value',
    subject: Subject.MATH,
    grade: 'Class 2',
    description: 'Ones, Tens and Hundreds',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Place Value']
  },
  {
    id: 'c2-m2',
    title: 'Subtraction w/ Borrow',
    subject: Subject.MATH,
    grade: 'Class 2',
    description: '2-digit subtraction tricky ones!',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Subtraction']
  },

  // --- Class 3 ---
  {
    id: 'c3-m1',
    title: 'Multiplication Tables',
    subject: Subject.MATH,
    grade: 'Class 3',
    description: 'Tables 1 to 10',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Multiplication']
  },
  {
    id: 'c3-m2',
    title: 'Measurement',
    subject: Subject.MATH,
    grade: 'Class 3',
    description: 'Length, Weight and Capacity',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Measurement']
  },
  {
    id: 'c3-e1',
    title: 'Parts of Speech',
    subject: Subject.ENGLISH,
    grade: 'Class 3',
    description: 'Nouns, Verbs and Adjectives',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Grammar']
  },

  // --- Class 4 ---
  {
    id: 'c4-m1',
    title: 'Fractions',
    subject: Subject.MATH,
    grade: 'Class 4',
    description: 'Understanding 1/2, 1/4 and more',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Fractions']
  },
  {
    id: 'c4-e1',
    title: 'Tenses',
    subject: Subject.ENGLISH,
    grade: 'Class 4',
    description: 'Past, Present and Future',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Grammar']
  },

  // --- Class 5 ---
  {
    id: 'c5-m1',
    title: 'Large Numbers',
    subject: Subject.MATH,
    grade: 'Class 5',
    description: 'Lakhs and Crores',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Numbers']
  },
  {
    id: 'c5-m2',
    title: 'Decimals',
    subject: Subject.MATH,
    grade: 'Class 5',
    description: 'Operations with decimal points',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Decimals']
  },
  {
    id: 'c5-e1',
    title: 'Essay Writing',
    subject: Subject.ENGLISH,
    grade: 'Class 5',
    description: 'Writing 100-150 words',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Writing']
  },
  
  // --- Tamil ---
  {
    id: 't-1',
    title: 'Uyir Ezhuthukal',
    subject: Subject.TAMIL,
    grade: 'Class 1',
    description: 'Tamil Vowels',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Alphabet']
  },
  {
    id: 't-2',
    title: 'Simple Words',
    subject: Subject.TAMIL,
    grade: 'Class 2',
    description: 'Reading basic words',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Reading']
  },

  // --- Hindi ---
  {
    id: 'h-1',
    title: 'Swar (Vowels)',
    subject: Subject.HINDI,
    grade: 'Class 1',
    description: 'Hindi Vowels (A, Aa, I, Ee)',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Alphabet']
  },
  {
    id: 'h-2',
    title: 'Vyanjan',
    subject: Subject.HINDI,
    grade: 'Class 2',
    description: 'Hindi Consonants',
    isLocked: true,
    isCompleted: false,
    stars: 0,
    topics: ['Alphabet']
  }
];

export const CLASS_ANALYTICS: StudentProgress[] = [
  { studentId: 's1', studentName: 'Arjun', mathScore: 85, englishScore: 72, tamilScore: 90, hindiScore: 75, attendance: 95, weakTopics: ['Grammar'], recentActivity: [70, 75, 80, 85, 82, 88, 90] },
  { studentId: 's2', studentName: 'Priya', mathScore: 65, englishScore: 88, tamilScore: 92, hindiScore: 85, attendance: 98, weakTopics: ['Subtraction'], recentActivity: [60, 62, 65, 68, 70, 72, 65] },
  { studentId: 's3', studentName: 'Rahul', mathScore: 45, englishScore: 60, tamilScore: 70, hindiScore: 50, attendance: 85, weakTopics: ['Multiplication', 'Spelling'], recentActivity: [40, 42, 45, 40, 48, 50, 45] },
  { studentId: 's4', studentName: 'Sneha', mathScore: 95, englishScore: 94, tamilScore: 98, hindiScore: 90, attendance: 100, weakTopics: [], recentActivity: [90, 92, 95, 94, 96, 98, 95] },
  { studentId: 's5', studentName: 'Vikram', mathScore: 55, englishScore: 50, tamilScore: 65, hindiScore: 60, attendance: 80, weakTopics: ['Reading', 'Addition'], recentActivity: [50, 55, 52, 58, 55, 60, 55] },
  { studentId: 's6', studentName: 'Ananya', mathScore: 78, englishScore: 82, tamilScore: 85, hindiScore: 80, attendance: 92, weakTopics: [], recentActivity: [75, 78, 80, 82, 85, 84, 78] },
  { studentId: 's7', studentName: 'Karthik', mathScore: 30, englishScore: 40, tamilScore: 60, hindiScore: 35, attendance: 70, weakTopics: ['Everything'], recentActivity: [30, 32, 35, 30, 28, 30, 30] },
  { studentId: 's8', studentName: 'Meera', mathScore: 88, englishScore: 90, tamilScore: 85, hindiScore: 82, attendance: 96, weakTopics: [], recentActivity: [85, 88, 90, 88, 92, 90, 88] },
];
