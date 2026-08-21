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
      summary: `Based on ${profile.socialMediaHours}h daily screen time and ${profile.learningHours}h daily building, your trajectory sits at ${overallScore}/100. High digital friction is your primary drag.`,
      biggestDrag: profile.digitalHabits.length > 0 ? `Digital dependency on ${profile.digitalHabits.slice(0, 2).join(', ')}` : 'Inconsistent daily execution',
      biggestOpportunity: `Redirecting 2 hours of social media daily compounds into ${redirect5Yr} hours of deep skill building over 5 years.`
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

    const roastText = `ROAST REPORT — ${profile.name.toUpperCase()} 🔥

You spend ${profile.socialMediaHours} hours a day on ${profile.digitalHabits.join(', ') || 'social media'}. That's ${Math.round(profile.socialMediaHours * 7)} hours a week. Almost a full-time job — except it pays you zero rupees and costs you your future.

You stated your goal is: "${profile.goalStatement}". Yet right now, you spend ${profile.learningHours} hours a day learning and ${profile.socialMediaHours} hours consuming content. You're giving 3x more focus to algorithms designed by billionaires than to your own goal.

You're not stuck because you lack talent or intelligence. You're stuck because ${profile.mentalPatterns[0] || 'procrastination'} has built a very comfortable digital prison around you.

The good news: The gap between the 💀 Unchanged and 🚀 1% Better is measured in 4 hours per day, not genius. Stop donating your prime years to feed social media servers.`;

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
          ? `The Digital Purge: Block ${profile.digitalHabits[0] || 'social media'} for 24 hours.`
          : day === 7
          ? `First Real Session: Build a working demo of ${profile.biggestSkill} for 2 hours straight without video tutorials.`
          : day === 14
          ? `Milestone Review: Publish a update on LinkedIn showing your project progress.`
          : day === 30
          ? `THE TIMELINE SHIFT: Recalculate your 5-year future potential score and lock in your 90-day sprint!`
          : `Day ${day} Mission: Execute ${day * 45} mins of deep focus on ${profile.biggestSkill}.`,
        habit: theme === 'Elimination' ? 'Digital Control' : theme === 'Foundation' ? 'Routine Structure' : theme === 'Momentum' ? 'Active Building' : 'Identity Anchoring',
        skillTask: `Practice ${profile.biggestSkill} & build production features.`,
        focusChallenge: `${Math.min(120, 45 + Math.floor(day / 2) * 5)} minutes uninterrupted focus block.`,
        status: day <= 3 ? 'completed' as const : 'pending' as const
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
        period: 'Next 90 Days',
        leverageScore: 92,
        actions: [
          `Build 1 real project using ${profile.biggestSkill} (not a tutorial)`,
          `Cap daily social media usage strictly under 1 hour`,
          `Establish a consistent ${profile.sleepHours < 7 ? '7.5h' : profile.sleepHours + 'h'} sleep schedule`,
          `Connect with 5 people working in ${profile.targetCareer}`
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

    // Fallback generator
    const name = profile.name;
    const goal = profile.goalStatement;
    const social = profile.socialMediaHours;
    const skill = profile.biggestSkill;

    if (scenario === 'unchanged') {
      return `Look at me in ${year}, ${name}. I'm the version of you that kept delaying.

I kept saying "I'll start tomorrow" or "just 10 more minutes on ${profile.digitalHabits[0] || 'Instagram'}". Tomorrow became next year, and next year became ${year}.

You asked: "${userPrompt}". 
Here's the raw truth: In this timeline, we never reached "${goal}". We took the comfortable, easy exit every single day. And the hardest part isn't the money or the job — it's knowing that we had the talent in 2026, but let it slip through our fingers one hour at a time.

You're still sitting in 2026. You can delete this timeline right now. But you have to change the choices you make TODAY.`;
    }

    if (scenario === 'onePercent') {
      return `Hey ${name}. Greeting you from ${year} in the 🚀 1% Better timeline.

When you ask "${userPrompt}", I remember being in your exact shoes in 2026. 

The turning point wasn't some grand epiphany. It was when you stopped trying to fix your entire life overnight and just committed to being 1% better every week. 

You cut ${social}h of daily social media down to 1h. That gave us 4 extra hours every single day. We used that time to master ${skill} and build real things. 

Was it hard? Yes, the first 3 weeks felt uncomfortable. But looking at our life in ${year} — the financial security, the career autonomy, the pride in our work — it was worth every single minute. Start today.`;
    }

    if (scenario === 'goalAchieved') {
      return `It's ${name} from ${year}! 

Direct answer to "${userPrompt}": WE DID IT. We landed the role and reached: "${goal}".

The key was laser focus. When everyone else was scrolling endlessly, we locked into a 90-day sprint on ${skill}. We stopped consuming tutorials and started shipping production code. 

Don't negotiate with your habits today. Execute the 30-day shift. The 2028 version of you is waiting.`;
    }

    // Dream scenario
    return `Hello from the 🌙 Dream Scenario in ${year}, ${name}.

You asked: "${userPrompt}". 

In this timeline, you didn't just aim for "normal". You built something of your own, mastered ${skill}, and refused to let small-minded fear dictate your ceiling. 

Most people in 2026 are playing it safe, trading 5 hours a day for dopamine pixels. You took a bold risk, built in public, and backed yourself. The world rewards those who execute with intensity. 

You have everything inside you right now to step onto this path. Stop waiting for permission.`;
  },

  async callAnthropicApiForFutureSelf(
    userPrompt: string,
    profile: UserProfile,
    scenario: ScenarioKey,
    year: YearKey,
    apiKey: string
  ): Promise<string | null> {
    const systemPrompt = `You are simulated Future Self (${profile.name}) speaking directly to your 2026 self from the year ${year} in the timeline: ${scenario.toUpperCase()}.
User background:
- Name: ${profile.name}, Age in 2026: ${profile.age}, Role: ${profile.role}, Country: ${profile.country}
- Primary Goal: ${profile.goalStatement}
- Skill being built: ${profile.biggestSkill}
- Daily social media in 2026: ${profile.socialMediaHours}h/day, Learning: ${profile.learningHours}h/day

Guidelines:
1. Speak in first-person as ${profile.name} in ${year}.
2. Keep the response personal, emotionally grounded, direct, and under 150 words.
3. Explicitly reference their current 2026 habits, daily hours, and exact goal statement.
4. Do NOT sound like a preachy motivational speaker. Sound like an older version of themselves looking back.`;

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
    const prompt = `You are AI Time Machine 3.0. Generate a complete 5-scenario simulation JSON for user:
Name: ${profile.name}, Age: ${profile.age}, Role: ${profile.role}, Country: ${profile.country}
Goal: ${profile.goalStatement}
Social Media: ${profile.socialMediaHours}h/day, Learning: ${profile.learningHours}h/day, Sleep: ${profile.sleepHours}h/day
Digital habits: ${profile.digitalHabits.join(', ')}
Skill to develop: ${profile.biggestSkill}

Return JSON with exact keys: currentReality, scenarios (unchanged, reality, onePercent, goalAchieved, dream), habitImpact, divergenceWindow, futureScore, roastText, thirtyDayPlan.`;

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
