import type { UserProfile, SimulationResult, ScenarioPath, YearKey, ScenarioKey } from '../types/simulation';

export const aiEngine = {
  async generateSimulation(profile: UserProfile, apiKey?: string): Promise<SimulationResult> {
    if (apiKey) {
      try {
        const liveSim = await this.callAnthropicApiForSimulation(profile, apiKey);
        if (liveSim) return liveSim;
      } catch (err) {
        console.warn('Live API call failed, falling back to local simulation generator:', err);
      }
    }

    // Local dynamic AI simulation generator
    return this.generateLocalSimulation(profile);
  },

  generateLocalSimulation(profile: UserProfile): SimulationResult {
    const socialLostYr = Math.round(profile.socialMediaHours * 365);
    const socialLost5Yr = socialLostYr * 5;
    const redirectYr = Math.round((Math.max(0, profile.socialMediaHours - 1.5)) * 365);
    const redirect5Yr = redirectYr * 5;

    // Calculate baseline score
    const focusPenalty = (10 - profile.focusRating) * 4;
    const consistencyPenalty = (10 - profile.consistencyRating) * 5;
    const socialPenalty = Math.min(30, profile.socialMediaHours * 4);
    const sleepBonus = profile.sleepHours >= 7 && profile.sleepHours <= 8.5 ? 10 : 0;
    const learnBonus = Math.min(25, profile.learningHours * 8);

    const overallScore = Math.max(20, Math.min(95, Math.round(50 - focusPenalty - consistencyPenalty - socialPenalty + sleepBonus + learnBonus)));

    const currentReality = {
      focus: Math.round(profile.focusRating * 10),
      skillVelocity: Math.round(profile.learningHours * 15 + profile.consistencyRating * 5),
      careerPositioning: Math.max(30, Math.min(90, Math.round(overallScore * 0.95))),
      habitConsistency: Math.round(profile.consistencyRating * 10),
      learningRate: Math.round(profile.learningHours * 18),
      digitalDependency: Math.min(95, Math.round(profile.socialMediaHours * 12 + 10)),
      sleepQuality: Math.round((profile.sleepHours / 8) * 75),
      overallScore,
      summary: `A rough baseline from your self-reported ${profile.socialMediaHours}h of daily screen time and ${profile.learningHours}h of daily learning. Use it to start a conversation with yourself, not as an assessment.`,
      biggestDrag: profile.digitalHabits.length > 0 ? `You listed ${profile.digitalHabits.slice(0, 2).join(' and ')} as habits you may want to review.` : 'You have not identified a habit to change yet.',
      biggestOpportunity: `If you chose to redirect 2 hours a day, that would add up to about ${redirect5Yr.toLocaleString()} hours over five years. This is arithmetic, not a claim about what you would achieve.`
    };

    // Scenarios generator
    const scenarios: Record<ScenarioKey, ScenarioPath> = {
      unchanged: {
        key: 'unchanged',
        title: '💀 THE UNCHANGED TIMELINE',
        subtitle: 'What happens if your current habits and distractions continue without intervention.',
        badge: 'HIGH REGRET PATH',
        color: 'var(--accent-red)',
        hex: '#ef4444',
        score: Math.max(20, overallScore - 17),
        divergencePoint: 'Next 90 days (highest leverage window)',
        years: {
          '2026': {
            year: '2026',
            career: `Struggling with focus. ${profile.socialMediaHours}h/day on ${profile.digitalHabits[0] || 'distractions'} holds back progress on ${profile.biggestSkill}.`,
            skills: [
              { name: profile.biggestSkill, level: 35, status: 'Inconsistent' },
              { name: 'Core Fundamentals', level: 45, status: 'Basic' }
            ],
            habits: `${profile.socialMediaHours}h social media daily. ${profile.mentalPatterns[0] || 'Procrastination'} pattern active.`,
            opportunities: 'Skipped key application deadlines due to lack of production-ready portfolio.',
            score: overallScore,
            incomeScenario: profile.monthlyIncome || 'Current level'
          },
          '2027': {
            year: '2027',
            career: `Settling for lower-tier entry opportunities due to skill gap vs market demand.`,
            skills: [
              { name: profile.biggestSkill, level: 40, status: 'Stagnant' },
              { name: 'Core Fundamentals', level: 50, status: 'Moderate' }
            ],
            habits: `Social media unchanged (${socialLostYr} hours wasted this year).`,
            opportunities: 'Accepted entry-level fallback role out of urgency.',
            score: Math.max(25, overallScore - 6),
            incomeScenario: 'Below target scenario'
          },
          '2028': {
            year: '2028',
            career: `Working in non-core support role. Far below stated goal of ${profile.targetCareer}.`,
            skills: [
              { name: profile.biggestSkill, level: 42, status: 'Outdated' },
              { name: 'Core Fundamentals', level: 52, status: 'Basic' }
            ],
            habits: 'High fatigue from lack of clear routine and sleep deficit.',
            opportunities: 'Passed over for internal promotions.',
            score: Math.max(22, overallScore - 10),
            incomeScenario: 'Sub-optimal tier'
          },
          '2029': {
            year: '2029',
            career: 'Career plateau. Feeling trapped while watching disciplined peers land top offers.',
            skills: [
              { name: profile.biggestSkill, level: 45, status: 'Legacy' }
            ],
            habits: 'Habit debt compounding. Harder to break long-standing patterns.',
            opportunities: 'Narrowing job market options.',
            score: Math.max(20, overallScore - 14),
            incomeScenario: 'Stagnant'
          },
          '2030': {
            year: '2030',
            career: 'Resigned to average routine. High inner regret regarding wasted potential.',
            skills: [{ name: profile.biggestSkill, level: 45, status: 'Outdated' }],
            habits: 'Digital dependency remains primary default.',
            opportunities: 'Low negotiating power.',
            score: Math.max(18, overallScore - 16),
            incomeScenario: 'Stagnant'
          },
          '2031': {
            year: '2031',
            career: `Five years later: Finding yourself looking back, wishing you had shifted in 2026.`,
            skills: [{ name: profile.biggestSkill, level: 48, status: 'Outdated' }],
            habits: 'Deeply ingrained distraction habits.',
            opportunities: 'Highly limited career flexibility.',
            score: Math.max(15, overallScore - 17),
            incomeScenario: 'Low ceiling'
          }
        }
      },
      reality: {
        key: 'reality',
        title: '📍 CURRENT REALITY BASELINE',
        subtitle: 'Honest snapshot of your current lifestyle projected into the future.',
        badge: 'BASELINE SNAPSHOT',
        color: 'var(--accent-amber)',
        hex: '#f59e0b',
        score: overallScore,
        years: {
          '2026': { year: '2026', career: `Moderate progress on ${profile.goalStatement}`, skills: [{ name: profile.biggestSkill, level: 50, status: 'Developing' }], habits: `${profile.socialMediaHours}h social media / ${profile.learningHours}h learning`, opportunities: '1 portfolio project built', score: overallScore, incomeScenario: profile.monthlyIncome },
          '2027': { year: '2027', career: `Junior position secured after last-minute push.`, skills: [{ name: profile.biggestSkill, level: 62, status: 'Competent' }], habits: 'Gradual reduction in screen time', opportunities: 'Standard entry-level role', score: overallScore + 3, incomeScenario: 'Entry tier' },
          '2028': { year: '2028', career: `Mid-level entry role. Working toward target career: ${profile.targetCareer}.`, skills: [{ name: profile.biggestSkill, level: 70, status: 'Good' }], habits: 'Moderate consistency', opportunities: '10-15% annual salary hikes', score: overallScore + 7, incomeScenario: 'Mid tier' },
          '2029': { year: '2029', career: 'Steady developer role. Solid team member.', skills: [{ name: profile.biggestSkill, level: 75, status: 'Proficient' }], habits: 'Standard work-life balance', opportunities: 'Occasional headhunter outreach', score: overallScore + 10, incomeScenario: 'Upper mid tier' },
          '2030': { year: '2030', career: 'Approaching Senior level.', skills: [{ name: profile.biggestSkill, level: 80, status: 'Strong' }], habits: 'Moderate focus', opportunities: 'Steady trajectory', score: overallScore + 13, incomeScenario: 'Senior tier' },
          '2031': { year: '2031', career: `Senior role achieved — goal reached ~3 years after target year ${profile.targetYear}.`, skills: [{ name: profile.biggestSkill, level: 84, status: 'Solid' }], habits: 'Established career routine', opportunities: 'Good stability', score: overallScore + 15, incomeScenario: profile.targetIncome || '₹15L+ scenario' }
        }
      },
      onePercent: {
        key: 'onePercent',
        title: '🚀 THE 1% BETTER TIMELINE',
        subtitle: 'What steady 1% weekly compound improvements look like over 5 years.',
        badge: 'RECOMMENDED COMPOUND PATH',
        color: 'var(--accent-cyan)',
        hex: '#06b6d4',
        score: Math.min(95, overallScore + 35),
        criticalMilestones: [
          `Cap social media usage under 1h daily (reclaims ${redirectYr}h/year)`,
          `Commit to 3h daily deep work block on ${profile.biggestSkill}`,
          'Build and ship 3 production projects',
          'Establish consistent 7.5h sleep cycle'
        ],
        years: {
          '2026': { year: '2026', career: `Reclaimed 3h daily. Breakthrough progress mastering ${profile.biggestSkill}.`, skills: [{ name: profile.biggestSkill, level: 72, status: 'Proficient' }, { name: 'Production Architecture', level: 55, status: 'Building' }], habits: 'Social media ↓ 65%. Daily morning coding ritual.', opportunities: 'Featured GitHub repository. Direct developer connections.', score: Math.min(85, overallScore + 16), incomeScenario: 'Paid High-Tier Internship' },
          '2027': { year: '2027', career: `Completed 2 major applications. High demand in candidate market.`, skills: [{ name: profile.biggestSkill, level: 84, status: 'Advanced' }], habits: '1h daily social media limit strictly enforced.', opportunities: 'Multiple interview callbacks from top product teams.', score: Math.min(90, overallScore + 24), incomeScenario: 'Top Internship / Pre-Placement Offer' },
          '2028': { year: '2028', career: `Landed target role: ${profile.targetCareer}!`, skills: [{ name: profile.biggestSkill, level: 90, status: 'Expert' }], habits: 'Consistency score: 8.8/10. Zero cognitive brain fog.', opportunities: `Offer received matching target income: ${profile.targetIncome || '₹15L scenario'}.`, score: Math.min(93, overallScore + 30), incomeScenario: profile.targetIncome || '₹15L+ annually' },
          '2029': { year: '2029', career: 'Promoted to Senior engineer ahead of peers.', skills: [{ name: profile.biggestSkill, level: 93, status: 'Mastered' }], habits: 'High-leverage focus habits.', opportunities: 'Conference speaker & technical mentor.', score: Math.min(95, overallScore + 33), incomeScenario: '₹20L+ scenario' },
          '2030': { year: '2030', career: 'Tech Lead managing high-impact technical systems.', skills: [{ name: profile.biggestSkill, level: 95, status: 'Master' }], habits: 'Unshakable mental clarity.', opportunities: 'Equity vesting & remote global options.', score: Math.min(97, overallScore + 35), incomeScenario: '₹28L+ scenario' },
          '2031': { year: '2031', career: `Five years of compound growth. Respected technical authority, high income, full autonomy.`, skills: [{ name: profile.biggestSkill, level: 97, status: 'Master' }], habits: 'Mastery over environment & attention.', opportunities: 'International remote opportunities ($80k+ USD equivalent).', score: 92, incomeScenario: '₹35L+ / $50k+ USD' }
        }
      },
      goalAchieved: {
        key: 'goalAchieved',
        title: '🎯 GOAL ACHIEVED TIMELINE',
        subtitle: `Precision trajectory built specifically around achieving: "${profile.goalStatement}"`,
        badge: 'GOAL TARGETED',
        color: 'var(--accent-gold)',
        hex: '#eab308',
        score: 89,
        criticalMilestones: [
          `Master ${profile.biggestSkill} within 90 days`,
          `Eliminate ${profile.digitalHabits[0] || 'distraction'} drag`,
          `Build 2 production applications targeting ${profile.cityOpportunity || 'target market'}`,
          `Land ${profile.targetCareer} role by ${profile.targetYear}`
        ],
        years: {
          '2026': { year: '2026', career: `Aggressive skill sprint on ${profile.biggestSkill}.`, skills: [{ name: profile.biggestSkill, level: 75, status: 'Interview Ready' }], habits: '2h daily skill building + 2h building projects.', opportunities: 'Selected for top technical mentorship program.', score: 72, incomeScenario: 'Mentorship / Stipend' },
          '2027': { year: '2027', career: 'Cracked technical interviews at 3 target product startups.', skills: [{ name: profile.biggestSkill, level: 88, status: 'Production Grade' }], habits: 'Daily mock interviews and active recall coding.', opportunities: 'Early job offer letter received.', score: 83, incomeScenario: 'Pre-placement Offer' },
          '2028': { year: '2028', career: `GOAL ACHIEVED! Landed ${profile.targetCareer} at ${profile.targetIncome || '₹15L'} by ${profile.targetYear}!`, skills: [{ name: profile.biggestSkill, level: 93, status: 'Mastered' }], habits: 'Consistency score: 9/10.', opportunities: 'Goal accomplished right on target timeline.', score: 89, incomeScenario: profile.targetIncome || '₹15L annually (TARGET MET)' },
          '2029': { year: '2029', career: 'Promoted to SE-II.', skills: [{ name: profile.biggestSkill, level: 94, status: 'Strong' }], habits: 'Balanced high output.', opportunities: 'FAANG / Tier-1 recruiter interest.', score: 91, incomeScenario: '₹20L+ scenario' },
          '2030': { year: '2030', career: 'Senior Engineer leading core backend modules.', skills: [{ name: profile.biggestSkill, level: 96, status: 'Expert' }], habits: 'Deep work mastery.', opportunities: 'High equity vesting.', score: 93, incomeScenario: '₹28L+ scenario' },
          '2031': { year: '2031', career: 'Tech Lead / Staff Engineer.', skills: [{ name: profile.biggestSkill, level: 98, status: 'Master' }], habits: 'Total discipline.', opportunities: 'Global mobility & financial freedom.', score: 95, incomeScenario: '₹35L+ scenario' }
        }
      },
      dream: {
        key: 'dream',
        title: '🌙 THE DREAM SCENARIO',
        subtitle: 'What becomes possible if you fully commit, take bold risks, and unlock peak performance.',
        badge: 'OUTLIER SCENARIO',
        color: 'var(--accent-violet)',
        hex: '#8b5cf6',
        score: 96,
        catalystDecision: 'One bold decision in the next 30 days: Build in public and launch a viral open source tool.',
        years: {
          '2026': { year: '2026', career: `Built a viral project using ${profile.biggestSkill}. Featured on tech news & GitHub trending.`, skills: [{ name: profile.biggestSkill, level: 85, status: 'Cutting Edge' }], habits: 'Flow state coding 4h daily. Zero doom-scrolling.', opportunities: 'Direct Twitter DM invites from YC founders & international CEOs.', score: 84, incomeScenario: 'Sponsorships / Freelance ₹50k/mo' },
          '2027': { year: '2027', career: 'Hired remotely by US-funded AI startup as Founding Engineer.', skills: [{ name: profile.biggestSkill, level: 92, status: 'World Class' }], habits: 'Relentless execution mindset. Early morning workout.', opportunities: 'Earning $3,000–$4,000/month remote while finishing college.', score: 91, incomeScenario: '₹35L annually ($42,000 USD)' },
          '2028': { year: '2028', career: 'Co-founded a tech venture or Principal Remote SDE.', skills: [{ name: profile.biggestSkill, level: 96, status: 'Master' }], habits: 'Peak athletic fitness & cognitive clarity.', opportunities: 'Pitching to top venture capital funds.', score: 95, incomeScenario: '₹50L+ package ($60,000 USD + Equity)' },
          '2029': { year: '2029', career: 'Company scaling rapidly or Senior Remote Architect.', skills: [{ name: profile.biggestSkill, level: 98, status: 'Visionary' }], habits: 'High-leverage leadership.', opportunities: 'Keynote speaker at global conferences in Tokyo & SF.', score: 97, incomeScenario: '₹75L+ scenario' },
          '2030': { year: '2030', career: 'Financial independence unlocked at age 25.', skills: [{ name: profile.biggestSkill, level: 99, status: 'Top 1%' }], habits: 'Holistic vitality & extreme focus.', opportunities: 'Angel investing in early-stage tech founders.', score: 98, incomeScenario: '₹1 Crore+ scenario' },
          '2031': { year: '2031', career: `Five years later: Founder, Principal Architect, or Investor. "The version of you most people will never become."`, skills: [{ name: profile.biggestSkill, level: 99, status: 'Top Tier' }], habits: 'Total mastery over environment & attention.', opportunities: 'Complete financial, geographical, and creative freedom.', score: 98, incomeScenario: '₹1.5 Crore+ scenario ($150k+ USD)' }
        }
      }
    };

    const roastText = `A CHECK-IN FOR ${profile.name.toUpperCase()}

You estimated about ${profile.socialMediaHours} hours a day on ${profile.digitalHabits.join(', ') || 'social and entertainment apps'} and ${profile.learningHours} hours learning or building. Those numbers are a snapshot, not a grade.

Your goal right now is: "${profile.goalStatement}".

One question to sit with: what is a small, realistic amount of time you would like to make for that goal this week? You do not need to overhaul your routine. Try one change, notice how it feels, and adjust it to fit your life.`;

    const scenarioCopy: Record<ScenarioKey, { title: string; subtitle: string; prompt: string; color: string; hex: string }> = {
      unchanged: { title: 'IF THE ROUTINE STAYS SIMILAR', subtitle: 'A prompt for noticing what you would keep, and what you might want to revisit.', prompt: 'What would you want to review if this routine still felt the same?', color: 'var(--accent-red)', hex: '#b8424c' },
      reality: { title: 'YOUR CURRENT STARTING POINT', subtitle: 'A neutral reference based on the estimates you entered today.', prompt: 'Which part of your current routine is working well enough to keep?', color: 'var(--accent-amber)', hex: '#a65f16' },
      onePercent: { title: 'A SMALL, STEADY CHANGE', subtitle: 'Explore what could change if you made a manageable adjustment and kept reviewing it.', prompt: 'What is one change small enough to try this week?', color: 'var(--accent-cyan)', hex: '#147e78' },
      goalAchieved: { title: 'A GOAL-FOCUSED ROUTE', subtitle: 'Break your stated goal into steps you can check, revise, and own.', prompt: 'What would be a useful first milestone toward this goal?', color: 'var(--accent-gold)', hex: '#99700e' },
      dream: { title: 'A MORE AMBITIOUS OPTION', subtitle: 'A space to think bigger while staying open about effort, timing, and uncertainty.', prompt: 'What would you explore if you had room to experiment?', color: 'var(--accent-violet)', hex: '#7654a6' }
    };

    Object.values(scenarios).forEach(path => {
      const copy = scenarioCopy[path.key];
      path.title = copy.title;
      path.subtitle = copy.subtitle;
      path.badge = 'WHAT-IF EXERCISE';
      path.color = copy.color;
      path.hex = copy.hex;
      path.score = overallScore;
      path.divergencePoint = 'Review this idea during your next check-in.';
      path.criticalMilestones = [copy.prompt, `Name one action related to ${profile.biggestSkill || 'a skill you want to build'}.`, 'Revisit the plan when your circumstances change.'];
      path.catalystDecision = copy.prompt;

      Object.values(path.years).forEach(snapshot => {
        snapshot.career = `${copy.prompt} Use ${snapshot.year} as a check-in date, not an expected outcome.`;
        snapshot.skills = [{ name: profile.biggestSkill || 'A skill you choose', level: Math.min(100, Math.max(0, Math.round(profile.learningHours * 10))), status: 'Starting estimate' }];
        snapshot.habits = `Your current estimate: ${profile.socialMediaHours}h of screen time and ${profile.learningHours}h of learning or building per day.`;
        snapshot.opportunities = `Write down one opportunity you could look for in ${snapshot.year}, then update this note as you learn more.`;
        snapshot.score = overallScore;
        snapshot.incomeScenario = undefined;
      });
    });

    // 30 day plan dynamic generation
    const thirtyDayPlan = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      let theme: 'Elimination' | 'Foundation' | 'Momentum' | 'Identity' = 'Elimination';
      if (day > 7) theme = 'Foundation';
      if (day > 14) theme = 'Momentum';
      if (day > 21) theme = 'Identity';

      return {
        day,
        theme,
        mission: day === 1 
          ? `Choose one small change related to ${profile.digitalHabits[0] || 'a routine you want to adjust'}. Keep it optional and manageable.`
          : day === 7
          ? `Spend a short session with ${profile.biggestSkill || 'a skill or interest'}, then note what you would change next time.`
          : day === 14
          ? 'Check in with yourself: what has felt useful, and what has not fit your week?'
          : day === 30
          ? 'Review the month and decide whether you want to continue, change direction, or stop.'
          : `If it fits today, spend a little time on ${profile.biggestSkill || 'something you care about'}.`,
        habit: theme === 'Elimination' ? 'Notice a pattern' : theme === 'Foundation' ? 'Try a small routine' : theme === 'Momentum' ? 'Practice what matters' : 'Review and adjust',
        skillTask: `Optional practice: ${profile.biggestSkill || 'something you want to learn'}.`,
        focusChallenge: `${Math.min(45, 10 + Math.floor(day / 3) * 5)} minutes, if useful today.`,
        status: 'pending' as const
      };
    });

    return {
      id: `sim_${Date.now()}`,
      createdAt: new Date().toISOString(),
      userProfile: profile,
      currentReality,
      scenarios,
      habitImpact: {
        hoursLostPerYear: socialLostYr,
        hoursLostFiveYears: socialLost5Yr,
        redirectedHoursPerYear: redirectYr,
        redirectedHoursFiveYears: redirect5Yr,
        skillMasteryPercentage: Math.min(100, Math.round((redirect5Yr / 10000) * 100))
      },
      divergenceWindow: {
        period: 'When it suits you',
        leverageScore: 0,
        actions: [
          `Choose one small step related to ${profile.biggestSkill || 'a goal you care about'}.`,
          'Decide when you might try it, based on the time and energy you have.',
          'At your next check-in, keep it, change it, or let it go.'
        ]
      },
      futureScore: {
        overall: Math.min(92, overallScore + 28),
        focusQuality: Math.round(profile.focusRating * 8 + 15),
        skillVelocity: Math.round(profile.learningHours * 12 + 40),
        consistency: Math.round(profile.consistencyRating * 8 + 20),
        goalAlignment: 84,
        habitMomentum: 69,
        biggestDrag: `Consistency (${profile.consistencyRating * 10}/100). Fixing consistency jumps your future score to 88+.`
      },
      roastText,
      thirtyDayPlan,
    };
  },

  async generateFutureSelfResponse(
    userPrompt: string,
    profile: UserProfile,
    scenario: ScenarioKey,
    year: YearKey,
    apiKey?: string
  ): Promise<string> {
    if (apiKey) {
      try {
        const liveResponse = await this.callAnthropicApiForFutureSelf(userPrompt, profile, scenario, year, apiKey);
        if (liveResponse) return liveResponse;
      } catch (err) {
        console.warn('Live Future Self API call failed, using fallback generator:', err);
      }
    }

    const prompts: Record<ScenarioKey, string> = {
      unchanged: 'If your routine stayed similar for a while, what would you want to keep, and what might you revisit?',
      reality: 'Which part of your current routine is already working for you?',
      onePercent: 'What is one small adjustment you could try this week without overloading yourself?',
      goalAchieved: `What is a practical first milestone for this goal: "${profile.goalStatement}"?`,
      dream: 'What possibility would you like to explore, while staying open about what you do not know yet?'
    };

    return `This is an imagined ${year} perspective for reflection, not a message from your actual future.

You asked: "${userPrompt}"

One way to think about it: ${prompts[scenario]}

You estimated ${profile.learningHours} hours a day for learning or building and named ${profile.biggestSkill} as a skill of interest. Treat those as starting notes, not a score. What small next step feels realistic for you?`;
  },

  async callAnthropicApiForFutureSelf(
    userPrompt: string,
    profile: UserProfile,
    scenario: ScenarioKey,
    year: YearKey,
    apiKey: string
  ): Promise<string | null> {
    const systemPrompt = `Write a reflective exercise in an imagined future-self voice for ${profile.name}, set in ${year}, using the scenario: ${scenario.toUpperCase()}.
User background:
- Name: ${profile.name}, Age in 2026: ${profile.age}, Role: ${profile.role}, Country: ${profile.country}
- Primary Goal: ${profile.goalStatement}
- Skill being built: ${profile.biggestSkill}
- Daily social media in 2026: ${profile.socialMediaHours}h/day, Learning: ${profile.learningHours}h/day

Guidelines:
1. Clearly say this is an imagined reflection, not knowledge of the user's actual future.
2. Keep the response personal, grounded, direct, and under 150 words.
3. Ask a useful question or suggest one small experiment based on their stated interests.
4. Do not claim they will get a particular job, salary, relationship, health outcome, or emotional state. Do not invent probabilities or shame them.
5. Avoid preachy motivation. Respect uncertainty and their circumstances.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerously-allow-browser': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text || null;
  },

  async callAnthropicApiForSimulation(profile: UserProfile, apiKey: string): Promise<SimulationResult | null> {
    const prompt = `Create a personal planning exercise as JSON for this user. This is not a forecasting model:
Name: ${profile.name}, Age: ${profile.age}, Role: ${profile.role}, Country: ${profile.country}
Goal: ${profile.goalStatement}
Social Media: ${profile.socialMediaHours}h/day, Learning: ${profile.learningHours}h/day, Sleep: ${profile.sleepHours}h/day
Digital habits: ${profile.digitalHabits.join(', ')}
Skill to develop: ${profile.biggestSkill}

Return JSON with exact keys: currentReality, scenarios (unchanged, reality, onePercent, goalAchieved, dream), habitImpact, divergenceWindow, futureScore, roastText, thirtyDayPlan. Use the fields for neutral reflection prompts and actions only. Do not invent future jobs, salaries, achievements, personal outcomes, or regret probabilities. Any numeric index must be explicitly described as a simple heuristic, not a validated assessment. Do not include income estimates.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerously-allow-browser': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    const textContent = data.content?.[0]?.text;
    if (!textContent) return null;

    try {
      const jsonStart = textContent.indexOf('{');
      const jsonEnd = textContent.lastIndexOf('}');
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const parsed = JSON.parse(textContent.substring(jsonStart, jsonEnd + 1));
        return {
          id: `sim_anthropic_${Date.now()}`,
          createdAt: new Date().toISOString(),
          userProfile: profile,
          ...parsed
        };
      }
    } catch {
      return null;
    }
    return null;
  }
};
