export type ScenarioKey = 'unchanged' | 'reality' | 'onePercent' | 'goalAchieved' | 'dream';

export type YearKey = '2026' | '2027' | '2028' | '2029' | '2030' | '2031';

export interface UserProfile {
  name: string;
  age: number;
  country: string;
  role: string;
  education: string;
  // Step 2 Sliders
  socialMediaHours: number;
  sleepHours: number;
  learningHours: number;
  exerciseFreq: 'Never' | '1-2x/week' | '3-4x/week' | '5+/week';
  monthlyIncome?: string;
  focusRating: number; // 1-10
  consistencyRating: number; // 1-10
  // Step 3 Goal
  goalStatement: string;
  targetCareer: string;
  targetIncome?: string;
  targetYear: string;
  biggestSkill: string;
  biggestFear?: string;
  cityOpportunity?: string;
  // Step 4 Habits
  digitalHabits: string[];
  mentalPatterns: string[];
  positiveHabits: string[];
  customHabits: string[];
  negativeSeverity: Record<string, number>;
  // Step 5 & 6
  startYear: string;
  horizonYears: '3 Years' | '5 Years' | '10 Years';
  scaredScenario: string;
  fiveYearReflection: string;
}

export interface YearSnapshot {
  year: YearKey;
  career: string;
  skills: { name: string; level: number; status: string }[];
  habits: string;
  opportunities: string;
  score: number;
  incomeScenario?: string;
}

export interface ScenarioPath {
  key: ScenarioKey;
  title: string;
  subtitle: string;
  badge: string;
  color: string; // CSS color string or var name
  hex: string;
  score: number;
  years: Record<YearKey, YearSnapshot>;
  divergencePoint?: string;
  criticalMilestones?: string[];
  catalystDecision?: string;
}

export interface CurrentRealityMetrics {
  focus: number;
  skillVelocity: number;
  careerPositioning: number;
  habitConsistency: number;
  learningRate: number;
  digitalDependency: number;
  sleepQuality: number;
  overallScore: number;
  summary: string;
  biggestDrag: string;
  biggestOpportunity: string;
}

export interface HabitImpactData {
  hoursLostPerYear: number;
  hoursLostFiveYears: number;
  redirectedHoursPerYear: number;
  redirectedHoursFiveYears: number;
  skillMasteryPercentage: number;
}

export interface DivergenceWindowData {
  period: string;
  leverageScore: number;
  actions: string[];
}

export interface FutureScoreData {
  overall: number;
  focusQuality: number;
  skillVelocity: number;
  consistency: number;
  goalAlignment: number;
  habitMomentum: number;
  biggestDrag: string;
}

export interface ThirtyDayMission {
  day: number;
  theme: 'Elimination' | 'Foundation' | 'Momentum' | 'Identity';
  mission: string;
  habit: string;
  skillTask: string;
  focusChallenge: string;
  status: 'pending' | 'completed' | 'skipped';
  modifiedMission?: string;
}

export interface FutureSelfMessage {
  id: string;
  scenario: ScenarioKey;
  year: YearKey;
  sender: 'user' | 'future_self';
  text: string;
  timestamp: string;
}

export interface DailyJournalEntry {
  id: string;
  date: string;
  dayNumber: number;
  goalProgress: string;
  wastedTime: string;
  energy: number; // 1-10
  shiftAction: string;
  guardianInsight?: string;
}

export interface LetterToSelf {
  id: string;
  content: string;
  writtenDate: string;
  deliveryDate: string;
  deliverOption: '6_months' | '1_year' | '5_years';
  isOpened: boolean;
}

export interface WeeklyCheckin {
  id: string;
  date: string;
  weekNumber: number;
  socialMediaHours: number;
  deepWorkHours: number;
  wins: string;
  setbacks: string;
  energy: number;
  calculatedScore: number;
}

export interface AccountabilityPartner {
  name: string;
  email: string;
  commitment: string;
  checkInDate: string;
  sentDate?: string;
}

export interface SimulationResult {
  id: string;
  userProfile: UserProfile;
  currentReality: CurrentRealityMetrics;
  scenarios: Record<ScenarioKey, ScenarioPath>;
  habitImpact: HabitImpactData;
  divergenceWindow: DivergenceWindowData;
  futureScore: FutureScoreData;
  roastText: string;
  thirtyDayPlan: ThirtyDayMission[];
  createdAt: string;
  dailyLogs?: DailyJournalEntry[];
  letterToSelf?: LetterToSelf;
  weeklyCheckins?: WeeklyCheckin[];
  accountabilityPartner?: AccountabilityPartner | null;
}
