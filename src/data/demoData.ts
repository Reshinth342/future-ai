import type { SimulationResult, UserProfile } from '../types/simulation';

export const defaultProfile: UserProfile = {
  name: 'Sample profile',
  age: 21,
  country: 'India',
  role: 'IT Student',
  education: 'College',
  socialMediaHours: 3,
  sleepHours: 7,
  learningHours: 1,
  exerciseFreq: '1-2x/week',
  monthlyIncome: '',
  focusRating: 5,
  consistencyRating: 5,
  goalStatement: 'I want to make steady progress on a goal that matters to me.',
  targetCareer: 'A role that fits my interests',
  targetIncome: '',
  targetYear: '2028',
  biggestSkill: 'A skill I would like to practice',
  biggestFear: '',
  cityOpportunity: '',
  digitalHabits: [],
  mentalPatterns: [],
  positiveHabits: [],
  customHabits: [],
  negativeSeverity: {},
  startYear: '2026',
  horizonYears: '5 Years',
  scaredScenario: 'Losing sight of a goal I care about',
  fiveYearReflection: 'I hope I keep learning, adapting, and making choices that work for me.'
};

export const defaultSimulationResult: SimulationResult = {
  id: 'sim_alex_demo_2026',
  createdAt: '2026-08-22T00:00:00.000Z',
  userProfile: defaultProfile,
  currentReality: {
    focus: 49,
    skillVelocity: 38,
    careerPositioning: 42,
    habitConsistency: 34,
    learningRate: 55,
    digitalDependency: 72,
    sleepQuality: 48,
    overallScore: 48,
    summary: 'Your current trajectory sits between slow drift and high potential. High social media dependency (5h/day) is acting as your primary energy anchor.',
    biggestDrag: 'Digital Dependency (72%) & Habit Consistency (34%)',
    biggestOpportunity: 'Redirecting 2 hours of social media daily compounds into 3,650 hours of deep engineering velocity over 5 years.'
  },
  scenarios: {
    unchanged: {
      key: 'unchanged',
      title: '💀 THE UNCHANGED TIMELINE',
      subtitle: 'What happens if current daily patterns and distractions continue without intervention.',
      badge: 'HIGH REGRET PATH',
      color: 'var(--accent-red)',
      hex: '#ef4444',
      score: 31,
      divergencePoint: 'Aug–Sep 2026 (The next 90 days are your highest leverage period)',
      years: {
        '2026': {
          year: '2026',
          career: 'Struggling with inconsistent study sessions. Resume lacks production projects.',
          skills: [
            { name: 'Python/JS Basics', level: 50, status: 'Beginner' },
            { name: 'Data Structures', level: 25, status: 'Weak' },
            { name: 'System Design', level: 10, status: 'Unstarted' }
          ],
          habits: 'Social media unchanged at 5h/day. Sleep 6h avg.',
          opportunities: 'Skipped campus placement prep due to overwhelm.',
          score: 44,
          incomeScenario: '₹0 (Unemployed student)'
        },
        '2027': {
          year: '2027',
          career: 'Graduation approaches without solid job offers. Settling for low-tier support or testing role.',
          skills: [
            { name: 'Python/JS Basics', level: 55, status: 'Basic' },
            { name: 'Data Structures', level: 30, status: 'Struggling' },
            { name: 'System Design', level: 15, status: 'Minimal' }
          ],
          habits: 'Social media 4.8h/day (1,752h wasted that year). Habit debt compounding.',
          opportunities: 'Accepted ₹3.5–4.5L entry role due to financial urgency.',
          score: 42,
          incomeScenario: '₹3.5–4.5L annually'
        },
        '2028': {
          year: '2028',
          career: 'Trapped in repetitive manual tasks. Skills gap widening compared to peers.',
          skills: [
            { name: 'Python/JS Basics', level: 58, status: 'Stagnant' },
            { name: 'Data Structures', level: 32, status: 'Forgotten' },
            { name: 'System Design', level: 20, status: 'Low' }
          ],
          habits: 'High burnout. Late night scrolling to cope with job dissatisfaction.',
          opportunities: 'Applied to 40 companies, 0 interview callbacks due to weak portfolio.',
          score: 38,
          incomeScenario: '₹4.2–5.0L annually'
        },
        '2029': {
          year: '2029',
          career: 'Career plateau. Feeling invisible in performance reviews.',
          skills: [
            { name: 'Python/JS Basics', level: 60, status: 'Outdated' },
            { name: 'Data Structures', level: 35, status: 'Basic' },
            { name: 'System Design', level: 22, status: 'Basic' }
          ],
          habits: 'Chronic sleep deficit. Low physical energy.',
          opportunities: 'Junior developers with stronger GitHub portfolios get promoted over you.',
          score: 35,
          incomeScenario: '₹5.0–6.0L annually'
        },
        '2030': {
          year: '2030',
          career: 'Resigned to average trajectory. Wondering where the last 4 years went.',
          skills: [
            { name: 'Python/JS Basics', level: 62, status: 'Stagnant' },
            { name: 'Data Structures', level: 35, status: 'Outdated' },
            { name: 'System Design', level: 25, status: 'Basic' }
          ],
          habits: 'Inconsistent routine. High digital reliance.',
          opportunities: 'Low mobility between companies.',
          score: 33,
          incomeScenario: '₹6.0–7.0L annually'
        },
        '2031': {
          year: '2031',
          career: 'Five years from now, watching others get the remote international roles you dreamed of.',
          skills: [
            { name: 'Python/JS Basics', level: 65, status: 'Legacy' },
            { name: 'Data Structures', level: 35, status: 'Outdated' },
            { name: 'System Design', level: 28, status: 'Basic' }
          ],
          habits: 'Deep habit debt. Harder to build discipline at 26.',
          opportunities: 'Highly limited leverage in job market negotiations.',
          score: 31,
          incomeScenario: '₹6.5–8.0L annually'
        }
      }
    },
    reality: {
      key: 'reality',
      title: '📍 CURRENT REALITY BASELINE',
      subtitle: 'Your exact current lifestyle extended forward. Honest baseline snapshot.',
      badge: 'BASELINE SNAPSHOT',
      color: 'var(--accent-amber)',
      hex: '#f59e0b',
      score: 48,
      years: {
        '2026': {
          year: '2026',
          career: 'Occasional bursts of intense coding followed by days of low motivation.',
          skills: [
            { name: 'Python/JS', level: 55, status: 'Intermediate' },
            { name: 'DSA', level: 40, status: 'Basic' },
            { name: 'Web Stack', level: 45, status: 'Building' }
          ],
          habits: '5h social media / 1.5h learning daily. Focus: 49/100.',
          opportunities: '1 small web app built, but inconsistent GitHub commits.',
          score: 49,
          incomeScenario: 'Student'
        },
        '2027': {
          year: '2027',
          career: 'Secured an average junior developer role after intensive last-minute prep.',
          skills: [
            { name: 'Python/JS', level: 65, status: 'Competent' },
            { name: 'DSA', level: 50, status: 'Medium' },
            { name: 'Web Stack', level: 58, status: 'Working' }
          ],
          habits: 'Social media 4h daily. Learning 1.5h daily.',
          opportunities: 'Landed entry job at local tech firm.',
          score: 52,
          incomeScenario: '₹5–7L annually'
        },
        '2028': {
          year: '2028',
          career: 'Working as Software Engineer I. Decent performance but behind ₹15L goal.',
          skills: [
            { name: 'Python/JS', level: 72, status: 'Good' },
            { name: 'DSA', level: 55, status: 'Moderate' },
            { name: 'Web Stack', level: 68, status: 'Solid' }
          ],
          habits: '3.5h social media daily. Sleep 6.5h.',
          opportunities: 'Annual hike of 10-12%. Steady progress.',
          score: 55,
          incomeScenario: '₹7.5–9L annually'
        },
        '2029': {
          year: '2029',
          career: 'Promoted to SE II after 2 years. Solid contributor.',
          skills: [
            { name: 'Python/JS', level: 78, status: 'Proficient' },
            { name: 'DSA', level: 60, status: 'Capable' },
            { name: 'Web Stack', level: 75, status: 'Proficient' }
          ],
          habits: 'Social media down to 3h. Exercise 2x/week.',
          opportunities: 'Switched companies for a 35% jump.',
          score: 59,
          incomeScenario: '₹10–12L annually'
        },
        '2030': {
          year: '2030',
          career: 'Approaching Senior Engineer position. Good work-life balance.',
          skills: [
            { name: 'Python/JS', level: 82, status: 'Strong' },
            { name: 'DSA', level: 65, status: 'Good' },
            { name: 'System Design', level: 62, status: 'Developing' }
          ],
          habits: 'Consistency rating: 6/10.',
          opportunities: 'Getting regular recruiter messages.',
          score: 63,
          incomeScenario: '₹13–15L annually'
        },
        '2031': {
          year: '2031',
          career: 'Senior Engineer at 26. Achieved goal 3 years later than planned.',
          skills: [
            { name: 'Python/JS', level: 86, status: 'Expert' },
            { name: 'DSA', level: 70, status: 'Solid' },
            { name: 'System Design', level: 70, status: 'Good' }
          ],
          habits: 'Moderate digital discipline.',
          opportunities: 'Stable career, solid team lead role.',
          score: 66,
          incomeScenario: '₹16–18L annually'
        }
      }
    },
    onePercent: {
      key: 'onePercent',
      title: '🚀 THE 1% BETTER TIMELINE',
      subtitle: 'What steady 1% weekly compound improvements look like over 5 years.',
      badge: 'RECOMMENDED COMPOUND PATH',
      color: 'var(--accent-cyan)',
      hex: '#06b6d4',
      score: 83,
      criticalMilestones: [
        'Reduce social media to 1h daily (saves 4h/day)',
        'Maintain daily 3h deep work block',
        'Ship 3 production projects on GitHub',
        'Solve 150+ Medium LeetCode problems'
      ],
      years: {
        '2026': {
          year: '2026',
          career: 'Reclaimed 3 hours daily. Built first full-stack application deployed on Vercel.',
          skills: [
            { name: 'TypeScript / Node', level: 70, status: 'Proficient' },
            { name: 'DSA', level: 55, status: 'Consistent' },
            { name: 'System Architecture', level: 35, status: 'Learning' }
          ],
          habits: 'Social media ↓ 60% (1.5h/day). Sleep: 7.5h avg. Exercise 4x/week.',
          opportunities: 'Starred GitHub repo with 40+ stars. Active tech Twitter/LinkedIn network.',
          score: 64,
          incomeScenario: 'Paid Engineering Internship (₹30,000/mo)'
        },
        '2027': {
          year: '2027',
          career: 'Completed 2 major open source contributions. Secured high-tier software internship.',
          skills: [
            { name: 'TypeScript / Node', level: 82, status: 'Advanced' },
            { name: 'DSA', level: 72, status: 'Strong' },
            { name: 'System Architecture', level: 58, status: 'Developing' }
          ],
          habits: 'Social media: 1h daily. Exercise 4x/week. Daily morning coding.',
          opportunities: 'Recruiters reaching out on LinkedIn. 2 interview offers.',
          score: 72,
          incomeScenario: 'Pre-Placement Offer (PPO) candidate'
        },
        '2028': {
          year: '2028',
          career: 'Landed Software Development Engineer role at high-growth tech startup.',
          skills: [
            { name: 'TypeScript / Go', level: 88, status: 'Expert' },
            { name: 'DSA', level: 80, status: 'Fluent' },
            { name: 'System Architecture', level: 70, status: 'Solid' }
          ],
          habits: 'Consistency score: 8.5/10. High mental clarity.',
          opportunities: 'Received ₹14L base + equity offer.',
          score: 79,
          incomeScenario: '₹14–16L annually'
        },
        '2029': {
          year: '2029',
          career: 'Promoted to Senior Backend Developer. Leading microservices migration.',
          skills: [
            { name: 'Distributed Systems', level: 85, status: 'High Competence' },
            { name: 'DSA', level: 85, status: 'Mastered' },
            { name: 'Cloud Infra (AWS/GCP)', level: 82, status: 'Certified' }
          ],
          habits: 'Structured deep work rituals. Zero morning screen addiction.',
          opportunities: 'Keynote speaker at regional tech conference.',
          score: 83,
          incomeScenario: '₹18–22L annually'
        },
        '2030': {
          year: '2030',
          career: 'Tech Lead managing a team of 4 engineers. Designing high-throughput systems.',
          skills: [
            { name: 'Distributed Systems', level: 90, status: 'Expert' },
            { name: 'System Design', level: 88, status: 'Architect' },
            { name: 'Tech Leadership', level: 80, status: 'Strong' }
          ],
          habits: 'Optimal health, focus, and energy. Balanced routine.',
          opportunities: 'Stock options vesting. High financial security.',
          score: 86,
          incomeScenario: '₹24–30L annually'
        },
        '2031': {
          year: '2031',
          career: 'Five years of compound effort. High autonomy, remote international options, respected engineer.',
          skills: [
            { name: 'Distributed Systems', level: 94, status: 'Master' },
            { name: 'System Design', level: 92, status: 'Architect' },
            { name: 'Tech Leadership', level: 88, status: 'Director track' }
          ],
          habits: 'Disciplined lifestyle. 4 hours deep focus is second nature.',
          opportunities: 'Multiple global offers ($80k–$120k USD remote scenarios).',
          score: 89,
          incomeScenario: '₹32–42L annually ($40k–$50k USD equivalent)'
        }
      }
    },
    goalAchieved: {
      key: 'goalAchieved',
      title: '🎯 GOAL ACHIEVED TIMELINE',
      subtitle: 'Laser-focused trajectory built specifically around your ₹15L engineering goal by 2028.',
      badge: 'GOAL TARGETED',
      color: 'var(--accent-gold)',
      hex: '#eab308',
      score: 89,
      criticalMilestones: [
        'Q3 2026: Eliminate 3+ hours daily social media drag',
        'Q4 2026: Complete 200+ LeetCode Medium DSA problems',
        'Q2 2027: Build 2 production full-stack SaaS apps',
        'Q4 2027: Land off-campus interview at Tier-1 product company',
        'Q1 2028: Accept ₹15L+ offer letter'
      ],
      years: {
        '2026': {
          year: '2026',
          career: 'Aggressive 90-day DSA sprint. Solved 120 problem patterns.',
          skills: [
            { name: 'DSA & Algorithms', level: 75, status: 'Interview Ready' },
            { name: 'Full-Stack (Next.js/Node)', level: 70, status: 'Building' },
            { name: 'System Design Basics', level: 45, status: 'Gaining' }
          ],
          habits: 'Strict 2h daily DSA + 2h project build time. Social media < 45m.',
          opportunities: 'Selected for top-tier open source mentorship program.',
          score: 70,
          incomeScenario: 'Internship Stipend ₹40,000/mo'
        },
        '2027': {
          year: '2027',
          career: 'Cracked technical interviews at 3 product startups. High confidence.',
          skills: [
            { name: 'DSA & Algorithms', level: 88, status: 'Expert' },
            { name: 'Full-Stack (Next.js/Node)', level: 85, status: 'Production Grade' },
            { name: 'System Design', level: 65, status: 'Intermediate' }
          ],
          habits: 'Daily morning mock interviews & peer code reviews.',
          opportunities: 'Received pre-placement job offer of ₹13.5L.',
          score: 81,
          incomeScenario: 'PPO Offer ₹13.5L'
        },
        '2028': {
          year: '2028',
          career: 'TARGET ACHIEVED! Joined Unicorn Startup as SDE-1 at ₹15.8L/year.',
          skills: [
            { name: 'DSA & Algorithms', level: 92, status: 'Mastered' },
            { name: 'Full-Stack', level: 90, status: 'High Output' },
            { name: 'System Architecture', level: 75, status: 'Solid' }
          ],
          habits: 'Maintained 8.8/10 consistency.',
          opportunities: 'Goal accomplished 6 months ahead of schedule.',
          score: 89,
          incomeScenario: '₹15.8L annually (TARGET EXCEEDED)'
        },
        '2029': {
          year: '2029',
          career: 'Fast-tracked promotion to SDE-2 due to high problem-solving throughput.',
          skills: [
            { name: 'System Design', level: 85, status: 'Strong' },
            { name: 'Cloud Native', level: 82, status: 'Proficient' }
          ],
          habits: 'Balanced growth & financial investing.',
          opportunities: 'Recruiter outreach from FAANG / Tier-1 MNCs.',
          score: 91,
          incomeScenario: '₹21L annually'
        },
        '2030': {
          year: '2030',
          career: 'Senior Software Engineer leading core backend service serving 2M users.',
          skills: [
            { name: 'Distributed Infrastructure', level: 89, status: 'Expert' }
          ],
          habits: 'Deep work master.',
          opportunities: 'High equity vesting.',
          score: 93,
          incomeScenario: '₹28L annually'
        },
        '2031': {
          year: '2031',
          career: 'Staff Engineer / Tech Lead. Recognized technical authority in your domain.',
          skills: [
            { name: 'System Architecture', level: 95, status: 'Master' }
          ],
          habits: 'Unshakable discipline.',
          opportunities: 'Global mobility & angel investment contributions.',
          score: 95,
          incomeScenario: '₹35L+ annually'
        }
      }
    },
    dream: {
      key: 'dream',
      title: '🌙 THE DREAM SCENARIO',
      subtitle: 'What becomes possible if you fully commit, take bold risks, and hit peak performance.',
      badge: 'OUTLIER SCENARIO',
      color: 'var(--accent-violet)',
      hex: '#8b5cf6',
      score: 96,
      catalystDecision: 'One bold decision in the next 30 days: Launch a viral open source tool and build in public.',
      years: {
        '2026': {
          year: '2026',
          career: 'Built an open-source AI dev tool that went viral on GitHub (1,200+ stars). Featured on Hacker News.',
          skills: [
            { name: 'AI Engineering & LLMs', level: 85, status: 'Cutting Edge' },
            { name: 'Full-Stack Systems', level: 80, status: 'Advanced' },
            { name: 'Public Building / Branding', level: 75, status: 'High Reach' }
          ],
          habits: 'Flow state coding 4h daily. Zero doom-scrolling.',
          opportunities: 'Direct Twitter DM invites from YC founders & US tech leaders.',
          score: 82,
          incomeScenario: '₹50,000/mo side sponsorship + consulting'
        },
        '2027': {
          year: '2027',
          career: 'Hired remotely by a US-funded AI startup as Founding Engineer while finishing college.',
          skills: [
            { name: 'AI Infrastructure', level: 90, status: 'Expert' },
            { name: 'Full-Stack & Rust', level: 85, status: 'High Output' }
          ],
          habits: 'Relentless execution mindset. Early morning workout + deep work.',
          opportunities: 'Earning $3,500/month remote (₹2.9L/mo). Travelled to San Francisco tech summit.',
          score: 90,
          incomeScenario: '₹35L annually ($42,000 USD)'
        },
        '2028': {
          year: '2028',
          career: 'Co-founded an AI startup backed by prominent seed investors, or Principal Remote SDE.',
          skills: [
            { name: 'AI Systems', level: 94, status: 'World Class' },
            { name: 'Product Vision', level: 90, status: 'Founder Level' }
          ],
          habits: 'Peak athletic fitness & zero cognitive fog.',
          opportunities: 'Leading international team of 6. Pitching to Tier-1 VCs.',
          score: 94,
          incomeScenario: '₹50L+ package ($60,000 USD + Equity)'
        },
        '2029': {
          year: '2029',
          career: 'Company revenue crosses $500k ARR or Senior Architect at top global AI firm.',
          skills: [
            { name: 'Enterprise Architect', level: 96, status: 'Master' }
          ],
          habits: 'High leverage time allocation.',
          opportunities: 'Speaking at international tech summits in Tokyo & SF.',
          score: 96,
          incomeScenario: '₹75L+ scenario ($90k USD)'
        },
        '2030': {
          year: '2030',
          career: 'Financial independence trajectory unlocked at age 25.',
          skills: [
            { name: 'Executive Leadership', level: 95, status: 'Top 1%' }
          ],
          habits: 'Holistic vitality & extreme focus.',
          opportunities: 'Angel investing in early-stage tech founders.',
          score: 97,
          incomeScenario: '₹1 Crore+ scenario'
        },
        '2031': {
          year: '2031',
          career: 'Five years later: Founder, Principal AI Architect, or High-Impact Investor. "The version of you most people will never become."',
          skills: [
            { name: 'Visionary Execution', level: 99, status: 'Top Tier' }
          ],
          habits: 'Mastery over environment & attention.',
          opportunities: 'Total location, financial, and creative freedom.',
          score: 98,
          incomeScenario: '₹1.5 Crore+ scenario ($150k+ USD)'
        }
      }
    }
  },
  habitImpact: {
    hoursLostPerYear: 1825,
    hoursLostFiveYears: 9125,
    redirectedHoursPerYear: 730,
    redirectedHoursFiveYears: 3650,
    skillMasteryPercentage: 36.5
  },
  divergenceWindow: {
    period: 'September – November 2026',
    leverageScore: 92,
    actions: [
      'Build 1 non-tutorial production project (e.g. Full-Stack App with Auth & Database)',
      'Cap social media usage strictly under 60 minutes daily',
      'Establish 7.5h consistent sleep schedule (in bed by 11:30 PM)',
      'Solve 5 DSA problems weekly with active recall',
      'Connect with 10 senior developers on LinkedIn with personalized notes'
    ]
  },
  futureScore: {
    overall: 78,
    focusQuality: 72,
    skillVelocity: 81,
    consistency: 64,
    goalAlignment: 84,
    habitMomentum: 69,
    biggestDrag: 'Habit Consistency (64/100). Fixing consistency jumps your overall future potential to 87+.'
  },
  roastText: `ROAST REPORT — ALEX 🔥

You spend 5 hours a day on Instagram and YouTube. That's 35 hours a week. Almost a full-time job — except it pays you zero rupees and costs you your future.

You stated your goal is a ₹15L software engineering job by 2028. This week, you spent 1.5 hours learning and 35 hours doom-scrolling tech memes and productivity videos. You watched 3 hours of videos ABOUT coding without opening your code editor once.

You're not stuck because you lack talent or intelligence. You're stuck because you've built a very comfortable digital prison of passive consumption, and you check into it every morning before you've even touched your real goals.

The good news: The gap between the 💀 Unchanged (₹4L job) and 🚀 1% Better (₹15L+ job) is measured in 4 hours per day, not genius. Stop donating your hours to algorithm CEOs who don't know your name.`,
  thirtyDayPlan: [
    { day: 1, theme: 'Elimination', mission: 'The Digital Purge: Delete Instagram or screen-time lock your biggest distraction app for 24 hours.', habit: 'Digital Control', skillTask: 'Write down 3 core software skills you will master in 90 days.', focusChallenge: '45 minutes uninterrupted deep work.', status: 'completed' },
    { day: 2, theme: 'Elimination', mission: 'No Phone First 30 Mins: Wake up without checking notifications or social feeds.', habit: 'Morning Hygiene', skillTask: 'Set up local developer workspace and push initial commit to GitHub.', focusChallenge: '60 minutes uninterrupted coding.', status: 'completed' },
    { day: 3, theme: 'Elimination', mission: 'Sleep Anchor: Be in bed by 11:30 PM with phone in another room.', habit: 'Sleep Recovery', skillTask: 'Solve 2 Array/String DSA questions.', focusChallenge: 'Two 45-minute focus blocks.', status: 'completed' },
    { day: 4, theme: 'Elimination', mission: 'Audit Screen Time: Review device usage and log exact hours spent scrolling.', habit: 'Self-Awareness', skillTask: 'Draft project architecture diagram for your portfolio app.', focusChallenge: '60 minutes deep work.', status: 'completed' },
    { day: 5, theme: 'Elimination', mission: 'Notification Silence: Turn off all non-essential app notifications.', habit: 'Attention Shield', skillTask: 'Initialize Next.js / Node project setup.', focusChallenge: '90 minutes uninterrupted building.', status: 'completed' },
    { day: 6, theme: 'Elimination', mission: 'Environment Reset: Clear workspace desk of all non-study clutter.', habit: 'Spatial Focus', skillTask: 'Learn basic Git branching and workflow.', focusChallenge: '60 minutes focus session.', status: 'completed' },
    { day: 7, theme: 'Foundation', mission: 'First Real Session: Build something. Anything. For 2 hours straight without video tutorials.', habit: 'Active Building', skillTask: 'Complete authentication module for portfolio project.', focusChallenge: '120 minutes deep building.', status: 'completed' },
    { day: 8, theme: 'Foundation', mission: 'Hydration & Movement: 20-minute morning workout or brisk walk before screen time.', habit: 'Physical Energy', skillTask: 'Solve 2 LinkedList DSA problems.', focusChallenge: '60 minutes coding.', status: 'completed' },
    { day: 9, theme: 'Foundation', mission: 'Timebox Learning: Schedule 3h building block in calendar as un-cancelable meeting.', habit: 'Calendar Discipline', skillTask: 'Deploy initial version to Vercel/Render.', focusChallenge: '90 minutes focus session.', status: 'completed' },
    { day: 10, theme: 'Foundation', mission: 'Refuse Distractions: Say NO to 1 non-essential activity that steals your evening.', habit: 'Boundary Setting', skillTask: 'Write API endpoint documentation.', focusChallenge: '60 minutes uninterrupted work.', status: 'completed' },
    { day: 11, theme: 'Foundation', mission: 'Mid-Week Habit Audit: Log how many hours reclaimed since Day 1.', habit: 'Measurement', skillTask: 'Solve 2 Hash Table DSA problems.', focusChallenge: '90 minutes deep work.', status: 'completed' },
    { day: 12, theme: 'Foundation', mission: 'LinkedIn Profile Update: Write clear bio focusing on developer journey & target role.', habit: 'Career Positioning', skillTask: 'Add GitHub link and project demo video to profile.', focusChallenge: '60 minutes focus session.', status: 'pending' },
    { day: 13, theme: 'Momentum', mission: 'Cold Reach-Out: Send polite message to 2 alumni or engineers in target role.', habit: 'Networking', skillTask: 'Implement database indexing for your project.', focusChallenge: '90 minutes focus session.', status: 'pending' },
    { day: 14, theme: 'Momentum', mission: 'Weekly Milestone Review: Celebrate 2 full weeks of disciplined execution.', habit: 'Positive Reinforcement', skillTask: 'Record 60-second video demo of your working app.', focusChallenge: '60 minutes focus block.', status: 'pending' },
    { day: 15, theme: 'Momentum', mission: 'Sprint Halfway Mark: Re-verify 5-year timeline trajectory score.', habit: 'Trajectory Alignment', skillTask: 'Solve 3 Stack/Queue DSA problems.', focusChallenge: '90 minutes coding.', status: 'pending' },
    { day: 16, theme: 'Momentum', mission: 'Deep Work Double: Execute two 90-minute deep work blocks in one day.', habit: 'Stamina Building', skillTask: 'Refactor code to clean architecture patterns.', focusChallenge: '180 minutes deep focus total.', status: 'pending' },
    { day: 17, theme: 'Momentum', mission: 'Zero Distraction Day: Zero social media consumption for 24 full hours.', habit: 'Dopamine Fast', skillTask: 'Write unit tests for critical functions.', focusChallenge: '90 minutes focus block.', status: 'pending' },
    { day: 18, theme: 'Momentum', mission: 'Public Build Update: Post progress screenshot on LinkedIn or Twitter.', habit: 'Public Accountability', skillTask: 'Solve 2 Binary Search DSA problems.', focusChallenge: '60 minutes coding.', status: 'pending' },
    { day: 19, theme: 'Momentum', mission: 'Peer Review: Share GitHub repository with a peer for honest feedback.', habit: 'Feedback Seeking', skillTask: 'Fix 3 bugs identified in peer review.', focusChallenge: '90 minutes deep building.', status: 'pending' },
    { day: 20, theme: 'Momentum', mission: 'Energy Management: 8 hours sleep target + hydration tracking.', habit: 'Vitality Anchor', skillTask: 'Study basic System Design concepts (Load Balancing, Caching).', focusChallenge: '60 minutes study session.', status: 'pending' },
    { day: 21, theme: 'Momentum', mission: 'Week 3 Completion: Audit consistency score shift.', habit: 'Review', skillTask: 'Complete MVP feature set of your project.', focusChallenge: '120 minutes focus session.', status: 'pending' },
    { day: 22, theme: 'Identity', mission: 'Identity Shift: Write "I am an engineer who ships daily" on your desk mirror.', habit: 'Identity Anchoring', skillTask: 'Solve 2 Tree Traversal DSA problems.', focusChallenge: '90 minutes focus work.', status: 'pending' },
    { day: 23, theme: 'Identity', mission: 'Resume Overhaul: Update resume with newly built production app.', habit: 'Professional Presence', skillTask: 'Tailor resume for target ₹15L job descriptions.', focusChallenge: '60 minutes resume polishing.', status: 'pending' },
    { day: 24, theme: 'Identity', mission: 'Mock Interview: Perform 45-min mock technical interview with friend/AI.', habit: 'Pressure Testing', skillTask: 'Explain time & space complexity out loud for 3 problems.', focusChallenge: '60 minutes mock practice.', status: 'pending' },
    { day: 25, theme: 'Identity', mission: 'Job Application Blitz: Submit application to 5 quality tech startups.', habit: 'Market Exposure', skillTask: 'Customize cover notes for each company.', focusChallenge: '90 minutes application focus.', status: 'pending' },
    { day: 26, theme: 'Identity', mission: 'System Design Diagramming: Draw full architectural diagram of your app.', habit: 'High-Level Thinking', skillTask: 'Explain cache invalidation and DB queries.', focusChallenge: '60 minutes system design.', status: 'pending' },
    { day: 27, theme: 'Identity', mission: 'Zero Regret Audit: Compare day 27 focus with day 1 baseline.', habit: 'Self-Reflection', skillTask: 'Solve 2 Graph/DP DSA questions.', focusChallenge: '90 minutes focus work.', status: 'pending' },
    { day: 28, theme: 'Identity', mission: 'Community Contribution: Answer 1 technical question on StackOverflow or Discord.', habit: 'Giving Back', skillTask: 'Publish README with documentation and live demo link.', focusChallenge: '60 minutes contribution session.', status: 'pending' },
    { day: 29, theme: 'Identity', mission: '30-Day Shift Reflection: Draft letter detailing how your mindset transformed.', habit: 'Integration', skillTask: 'Final code review and performance optimization.', focusChallenge: '90 minutes deep work.', status: 'pending' },
    { day: 30, theme: 'Identity', mission: 'THE TIMELINE SHIFT: Recalculate your 5-year future potential score!', habit: 'Victory & Continuation', skillTask: 'Lock in your next 90-day trajectory roadmap.', focusChallenge: '120 minutes reflection & planning.', status: 'pending' }
  ]
};

export const defaultFutureSelfChats = [
  {
    id: 'msg_1',
    scenario: 'onePercent' as const,
    year: '2031' as const,
    sender: 'future_self' as const,
    text: `You made it to 2031.

I know you have questions. So did I, sitting where you are in 2026.

Ask me anything. But I should warn you — I'm going to be honest in ways the 21-year-old you might not want to hear.`,
    timestamp: '2026-08-22T03:00:00.000Z'
  },
  {
    id: 'msg_2',
    scenario: 'onePercent' as const,
    year: '2031' as const,
    sender: 'user' as const,
    text: 'What changed everything?',
    timestamp: '2026-08-22T03:01:00.000Z'
  },
  {
    id: 'msg_3',
    scenario: 'onePercent' as const,
    year: '2031' as const,
    sender: 'future_self' as const,
    text: `The biggest change wasn't willpower. It wasn't some magic productivity system you read about online.

It was the day you did the math.

You were spending 5 hours a day on social media. That's 1,825 hours a year. 9,125 hours over five years. You could become world-class at almost anything in that time.

The moment you actually felt that — not just read it, but felt the weight of it — everything shifted. You didn't quit social media forever. You just stopped letting it be your default state. And the 4 hours a day you reclaimed changed our entire life.`,
    timestamp: '2026-08-22T03:01:15.000Z'
  }
];

export const defaultDailyLogs = [
  {
    id: 'log_1',
    date: '2026-08-20',
    dayNumber: 10,
    goalProgress: 'Built API endpoints for authentication & solved 2 LeetCode questions.',
    wastedTime: '45 mins scrolling Reels before sleeping.',
    energy: 8,
    shiftAction: 'Put phone outside bedroom at 11 PM.',
    guardianInsight: 'Higher energy logged on days you code in the morning.'
  },
  {
    id: 'log_2',
    date: '2026-08-21',
    dayNumber: 11,
    goalProgress: 'Deployed full-stack app to Vercel and configured custom domain.',
    wastedTime: '30 mins watching YouTube shorts.',
    energy: 9,
    shiftAction: 'Installed browser extension to block YouTube recommendations.',
    guardianInsight: 'Your wasted time entry reduced by 50% compared to week 1!'
  }
];

export const defaultLetter: import('../types/simulation').LetterToSelf = {
  id: 'letter_alex_1',
  content: `Dear 2027 me,

Right now I'm 21 years old, sitting in my room, looking at the divergence between the 💀 Unchanged path and the 🚀 1% Better timeline.

I promise you that I won't let us drift into that 💀 Unchanged outcome. I am giving up 4 hours of mindless daily scrolling to build real projects, master DSA, and land our ₹15L engineering role.

When you open this letter in 1 year, I hope you are standing in a different trajectory, proud of the choices I made today.

Stay disciplined,
Alex (2026)`,
  writtenDate: '2026-08-22',
  deliveryDate: '2027-08-22',
  deliverOption: '1_year',
  isOpened: false
};

export const defaultWeeklyCheckins: import('../types/simulation').WeeklyCheckin[] = [
  { id: 'checkin_1', date: '2026-08-08', weekNumber: 1, socialMediaHours: 5.0, deepWorkHours: 1.5, wins: 'Started 30-day shift', setbacks: 'Over-scrolled on weekend', energy: 6, calculatedScore: 48 },
  { id: 'checkin_2', date: '2026-08-15', weekNumber: 2, socialMediaHours: 3.5, deepWorkHours: 2.5, wins: 'Built auth module & 5 DSA problems', setbacks: 'Late sleep twice', energy: 7, calculatedScore: 54 },
  { id: 'checkin_3', date: '2026-08-22', weekNumber: 3, socialMediaHours: 2.0, deepWorkHours: 3.5, wins: 'Deployed app to production!', setbacks: 'Minor procrastination', energy: 9, calculatedScore: 61 }
];
