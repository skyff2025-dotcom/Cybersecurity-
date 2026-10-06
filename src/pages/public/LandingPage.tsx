import { Link } from 'react-router-dom';
import { Shield, BookOpen, Lock, ShieldAlert, CheckCircle2, TrendingUp, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cybersecurity</span> Awareness
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn how to recognize threats, protect your digital identity, and develop safer online habits with our premium educational platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-xl shadow-lg shadow-blue-600/20">
                  Start Learning
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-xl">
                  Explore Topics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 - TRUST / PLATFORM STATS */}
      <section className="w-full py-12 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-200">
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">10K+</div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Learners</p>
            </div>
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">50+</div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Security Topics</p>
            </div>
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">100+</div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Learning Resources</p>
            </div>
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">25+</div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Interactive Quizzes</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - WHY CYBERSECURITY AWARENESS MATTERS */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Your First Line of Defense Is Awareness</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Cyber threats evolve every day. Learn how attackers operate and build the knowledge needed to protect your accounts, devices, data, and digital identity.
              </p>
              <ul className="space-y-4">
                {[
                  'Recognize common cyber threats',
                  'Protect your digital identity',
                  'Build safer online habits'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              {/* Premium abstract visual card */}
              <div className="absolute inset-0 bg-blue-50 transform rotate-3 rounded-3xl -z-10"></div>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Security Status</h3>
                      <p className="text-sm text-slate-500">Continuous Monitoring</p>
                    </div>
                  </div>
                  <Badge variant="success" className="h-7 px-3">Protected</Badge>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-700">Your Security Awareness</span>
                      <span className="text-blue-600">Level 42</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <ShieldAlert className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 font-medium uppercase">Threats Blocked</span>
                      <span className="text-lg font-bold text-slate-900">1,204</span>
                    </div>
                    <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Lock className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 font-medium uppercase">Data Encrypted</span>
                      <span className="text-lg font-bold text-slate-900">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - LEARNING CATEGORIES */}
      <section className="w-full py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Cybersecurity Topics</h2>
            <p className="text-lg text-slate-600">Build practical knowledge across the most important areas of digital security.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, name: 'Password Security', desc: 'Master strong passwords and 2FA.', count: 5 },
              { icon: ShieldAlert, name: 'Phishing', desc: 'Identify deceptive social engineering.', count: 8 },
              { icon: Shield, name: 'Malware Protection', desc: 'Understand viruses and ransomware.', count: 6 },
              { icon: TrendingUp, name: 'Network Security', desc: 'Secure Wi-Fi and safe browsing.', count: 7 },
              { icon: BookOpen, name: 'Data Privacy', desc: 'Protect your personal information.', count: 4 },
              { icon: Search, name: 'Safe Browsing', desc: 'Navigate the web securely.', count: 5 },
              { icon: Lock, name: 'Mobile Security', desc: 'Keep smartphones protected.', count: 5 },
              { icon: CheckCircle2, name: 'Social Media', desc: 'Manage privacy and avoid scams.', count: 6 }
            ].map((cat, i) => (
              <Link key={i} to="/courses" className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{cat.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors">{cat.count} Resources</span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - FEATURED LEARNING */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Learn Something New Today</h2>
            <p className="text-lg text-slate-600">Explore curated cybersecurity resources designed for every skill level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 bg-slate-100 flex items-center justify-center border-b border-slate-100">
                <BookOpen className="w-16 h-16 text-slate-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="text-xs">Phishing</Badge>
                  <Badge variant="success" className="text-xs">Beginner</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">How to Identify a Phishing Attack</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">Learn to spot the subtle clues that give away a malicious email before you click.</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-500">6 min read</span>
                  <Link to="/articles">
                    <Button variant="outline" size="sm">Start Reading</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Video Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 bg-slate-900 relative flex items-center justify-center border-b border-slate-100 group">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&q=80&w=600&h=400')] bg-cover bg-center"></div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="text-xs">Social Engineering</Badge>
                  <Badge variant="success" className="text-xs">Beginner</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Understanding Social Engineering</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">Watch a real-world demonstration of how attackers use psychology to bypass security.</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-500">12 min video</span>
                  <Link to="/videos">
                    <Button variant="outline" size="sm">Watch Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 bg-blue-50 flex items-center justify-center border-b border-blue-100">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl rotate-12 flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-blue-500 -rotate-12" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="text-xs">Basics</Badge>
                  <Badge variant="info" className="text-xs bg-blue-100 text-blue-700">Easy</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cybersecurity Fundamentals</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">Test your baseline knowledge of core security concepts and best practices.</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-500">10 Questions</span>
                  <Link to="/quiz">
                    <Button size="sm">Start Quiz</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - LATEST THREAT CENTER PREVIEW */}
      <section className="w-full py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead of Emerging Threats</h2>
              <p className="text-lg text-slate-400">Understand the latest types of cyber threats and learn how to protect yourself.</p>
            </div>
            <Link to="/threats">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                View Threat Center →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { severity: 'CRITICAL', badge: 'bg-red-500/10 text-red-400 border-red-500/20', cat: 'Ransomware', title: 'Data Encryption Attack', desc: 'Simulated educational alert regarding malicious encryption software.', date: 'Today' },
              { severity: 'HIGH', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', cat: 'Phishing', title: 'Credential Theft Campaign', desc: 'Mock warning about widespread fake login pages targeting users.', date: 'Yesterday' },
              { severity: 'MEDIUM', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', cat: 'Browser Security', title: 'Malicious Browser Extension', desc: 'Example threat profile for data-stealing add-ons.', date: '3 days ago' },
            ].map((threat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded border ${threat.badge}`}>
                    {threat.severity}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{threat.date}</span>
                </div>
                <p className="text-sm text-blue-400 font-medium mb-1">{threat.cat}</p>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{threat.title}</h3>
                <p className="text-sm text-slate-400 mb-6 flex-1">{threat.desc}</p>
                <Link to="/threats">
                  <span className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center">
                    View Threat <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - HOW CYBERAWARE WORKS */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How CyberAware Works</h2>
            <p className="text-lg text-slate-600">A simple, effective process to build your cybersecurity knowledge.</p>
          </div>

          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                { step: '01', title: 'Learn', desc: 'Explore articles, videos and comprehensive cybersecurity topics.' },
                { step: '02', title: 'Test', desc: 'Challenge yourself with interactive quizzes and scenarios.' },
                { step: '03', title: 'Improve', desc: 'Track your progress, earn achievements and certificates.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center relative bg-white md:bg-transparent">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center text-3xl font-bold text-slate-300 mb-6 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - GAMIFICATION / ACHIEVEMENTS */}
      <section className="w-full py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Premium Dashboard Preview */}
              <div className="absolute inset-0 bg-blue-100 transform -rotate-3 rounded-3xl -z-10 blur-sm opacity-50"></div>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow flex items-center justify-center text-2xl font-bold text-blue-600 shrink-0">
                    S
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Level 7</h3>
                    <p className="text-sm font-medium text-blue-600">Cyber Guardian</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 font-medium mb-1">XP</p>
                    <p className="font-bold text-slate-900">2,450</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 font-medium mb-1">Streak</p>
                    <p className="font-bold text-slate-900">🔥 12</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 font-medium mb-1">Rank</p>
                    <p className="font-bold text-slate-900">🏆 10%</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">Learning Complete</span>
                    <span className="text-slate-900">72%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[72%] rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-3">Recent Badges</p>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100" title="Perfect Score">🎯</div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100" title="Fast Learner">⚡</div>
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100" title="Phishing Expert">🎣</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Turn Learning Into Progress</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Stay motivated with our built-in gamification system. Earn experience points for completing modules, maintain your learning streak, and unlock exclusive achievement badges as you level up your cybersecurity skills.
              </p>
              <Link to="/leaderboard">
                <Button variant="outline" size="lg" className="mt-4">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - CERTIFICATE CTA */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 text-white">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
            
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prove What You Know</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Complete learning paths, pass assessments, and earn certificates that showcase your cybersecurity knowledge.
              </p>
              <Link to="/certificates">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 font-medium">
                  Explore Certificates
                </Button>
              </Link>
            </div>
            
            <div className="relative z-10 hidden md:block shrink-0">
              <div className="w-64 aspect-[4/3] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 shadow-2xl border border-blue-400/30 flex flex-col items-center justify-center text-center transform rotate-3">
                <Shield className="w-12 h-12 text-white mb-4" />
                <h4 className="text-white font-serif italic text-lg mb-2">Certificate of Completion</h4>
                <div className="w-16 h-1 bg-white/30 rounded-full mb-3"></div>
                <p className="text-blue-100 text-[10px] uppercase tracking-widest font-semibold">CyberAware Fundamentals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 - FINAL CTA */}
      <section className="w-full py-24 text-center border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Ready to Become More Cyber Aware?</h2>
          <p className="text-xl text-slate-600 mb-10">Start learning today and take control of your digital security.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-md">
                Start Learning
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                Explore Topics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10 - FOOTER */}
      <footer className="w-full py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold text-slate-900 tracking-tight">CyberAware</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Learn. Protect. Stay Secure.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link></li>
                <li><Link to="/courses" className="hover:text-blue-600 transition-colors">Learn</Link></li>
                <li><Link to="/articles" className="hover:text-blue-600 transition-colors">Articles</Link></li>
                <li><Link to="/videos" className="hover:text-blue-600 transition-colors">Videos</Link></li>
                <li><Link to="/quiz" className="hover:text-blue-600 transition-colors">Quizzes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Security</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/threats" className="hover:text-blue-600 transition-colors">Threat Center</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Security Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Cybersecurity Basics</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Awareness Guides</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 CyberAware. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-600 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
