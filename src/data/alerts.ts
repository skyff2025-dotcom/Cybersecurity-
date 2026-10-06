export interface SecurityAlert {
  id: string;
  title: string;
  summary: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  publishedDate: string;
  readTime: number; // in minutes
  sourceType: string;
  content: string;
  warningSigns: string[];
  protectionSteps: string[];
  responseSteps: string[];
  keyTakeaways: string[];
  relatedThreatId?: string;
  relatedCourseId?: string;
  relatedQuizCategory?: string;
  status: 'Draft' | 'Published' | 'Archived';
}

export const INITIAL_ALERTS: SecurityAlert[] = [
  {
    id: 'alert-1',
    title: 'How Phishing Emails Trick Users',
    summary: 'A breakdown of modern phishing tactics and how they create a false sense of urgency.',
    category: 'Phishing',
    severity: 'High',
    publishedDate: new Date().toISOString(),
    readTime: 4,
    sourceType: 'CyberAware Awareness Update',
    content: 'Phishing remains one of the most effective ways for attackers to compromise credentials. Modern phishing emails are highly sophisticated, often bypassing spam filters and perfectly mimicking legitimate brands. Attackers rely on psychological manipulation, primarily urgency and fear, to force users into making quick, irrational decisions.',
    warningSigns: ['Unexpected account suspension notices', 'Generic greetings (e.g., "Dear Customer")', 'Mismatched sender email domains', 'Urgent requests for sensitive information'],
    protectionSteps: ['Verify the sender address carefully', 'Do not click links; navigate to the website manually', 'Enable Multi-Factor Authentication (MFA)'],
    responseSteps: ['Report the email to your IT department', 'Do not reply or click any links', 'If clicked, immediately change your password'],
    keyTakeaways: ['Phishing exploits human emotions, not just technical flaws.', 'Always pause and verify before taking action on unexpected emails.'],
    relatedThreatId: 'credential-phishing',
    relatedCourseId: 'course-1',
    relatedQuizCategory: 'phishing',
    status: 'Published'
  },
  {
    id: 'alert-2',
    title: 'Why Reusing Passwords Is Dangerous',
    summary: 'Understanding the ripple effect of credential stuffing attacks.',
    category: 'Password Security',
    severity: 'Critical',
    publishedDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    readTime: 3,
    sourceType: 'Educational Advisory',
    content: 'When a data breach occurs at one service, attackers harvest the exposed usernames and passwords. They then use automated tools to try these combinations across hundreds of other popular websites—a technique known as credential stuffing. If you reuse passwords, one breach can compromise your entire digital life.',
    warningSigns: ['Unrecognized login alerts from various services', 'Accounts locked due to too many failed login attempts'],
    protectionSteps: ['Use a unique password for every account', 'Utilize a reputable password manager', 'Enable 2FA/MFA universally'],
    responseSteps: ['Immediately change the reused password across all accounts', 'Check HaveIBeenPwned for exposure', 'Enable 2FA where possible'],
    keyTakeaways: ['Password reuse turns a single breach into a multi-account compromise.', 'Password managers are essential for modern security.'],
    relatedThreatId: 'password-reuse',
    relatedCourseId: 'course-2',
    relatedQuizCategory: 'passwords',
    status: 'Published'
  },
  {
    id: 'alert-3',
    title: 'Fake Login Pages and Credential Theft',
    summary: 'How to spot deceptive websites designed to steal your credentials.',
    category: 'Web Security',
    severity: 'High',
    publishedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    readTime: 5,
    sourceType: 'CyberAware Awareness Update',
    content: 'Attackers create pixel-perfect copies of popular login pages (like Microsoft 365, Google, or banking portals). These fake pages are hosted on deceptive domains and are usually distributed via phishing links. Once you enter your credentials, they are sent directly to the attacker.',
    warningSigns: ['URLs that are slightly misspelled (e.g., g00gle.com instead of google.com)', 'Pages lacking SSL certificates (no padlock icon)', 'Unusual login prompts on unexpected pages'],
    protectionSteps: ['Check the URL bar carefully before entering credentials', 'Use browser bookmarks for important sites', 'Rely on password managers (they will not autofill on fake domains)'],
    responseSteps: ['If credentials were submitted, change the password immediately', 'Contact the impersonated organization if appropriate', 'Monitor your account for unauthorized access'],
    keyTakeaways: ['Visual appearance is easily faked; the URL is the true indicator of legitimacy.', 'Password managers provide a strong defense against fake login pages.'],
    relatedThreatId: 'credential-phishing',
    relatedCourseId: 'course-4', // Safe Browsing
    status: 'Published'
  },
  {
    id: 'alert-4',
    title: 'Ransomware Protection Basics',
    summary: 'Essential strategies to prevent and recover from ransomware attacks.',
    category: 'Ransomware',
    severity: 'Critical',
    publishedDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    readTime: 6,
    sourceType: 'Demo Security Alert',
    content: 'Ransomware is malicious software that encrypts your files, rendering them inaccessible until a ransom is paid. Infection usually occurs through phishing attachments, malicious downloads, or unpatched software vulnerabilities. Prevention and reliable backups are the only true defenses.',
    warningSigns: ['Files suddenly becoming inaccessible or changing extensions', 'A prominent "ransom note" appearing on the screen', 'System performance degrading significantly'],
    protectionSteps: ['Maintain regular, offline backups (the 3-2-1 rule)', 'Keep OS and software fully updated', 'Never open unexpected email attachments'],
    responseSteps: ['Disconnect the infected device from the network immediately', 'Do not pay the ransom (it does not guarantee recovery)', 'Restore files from a known good backup'],
    keyTakeaways: ['Backups are your last and best line of defense against ransomware.', 'Prevention requires a combination of patching and user vigilance.'],
    relatedCourseId: 'course-4', // Safe browsing/malware
    status: 'Published'
  },
  {
    id: 'alert-5',
    title: 'Malicious Mobile Applications',
    summary: 'The risks of downloading apps outside of official stores.',
    category: 'Mobile Security',
    severity: 'Medium',
    publishedDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    readTime: 4,
    sourceType: 'Educational Advisory',
    content: 'Malicious apps can steal personal data, track your location, or incur premium SMS charges. While official stores (Google Play, App Store) have security checks, malicious apps sometimes slip through. Sideloading apps from unofficial sources significantly increases this risk.',
    warningSigns: ['Apps requesting permissions unrelated to their function (e.g., a flashlight app asking for contacts)', 'Rapid battery drain', 'Unexpected pop-up ads outside of the app'],
    protectionSteps: ['Only install apps from official stores', 'Review app permissions before installation', 'Keep mobile operating systems updated'],
    responseSteps: ['Uninstall suspicious apps immediately', 'Revoke unnecessary permissions from existing apps', 'Run a mobile antivirus scan if available'],
    keyTakeaways: ['Convenience should not override security when installing apps.', 'Permissions are the gatekeepers to your personal data.'],
    status: 'Published'
  },
  {
    id: 'alert-6',
    title: 'Public Wi-Fi Security Risks',
    summary: 'Why open networks are dangerous and how to use them safely.',
    category: 'Privacy',
    severity: 'High',
    publishedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    readTime: 3,
    sourceType: 'CyberAware Awareness Update',
    content: 'Public Wi-Fi networks in cafes, airports, and hotels are often unencrypted. This allows attackers on the same network to intercept your internet traffic (Man-in-the-Middle attacks), potentially capturing passwords, session cookies, and sensitive data.',
    warningSigns: ['Networks with no password requirement', 'Warnings about invalid security certificates when browsing', 'Unusually slow connections'],
    protectionSteps: ['Use a Virtual Private Network (VPN) on public Wi-Fi', 'Avoid accessing financial or sensitive accounts', 'Ensure websites use HTTPS (look for the padlock)'],
    responseSteps: ['Disconnect if you suspect interception', 'Forget the network so your device doesn\'t auto-connect later'],
    keyTakeaways: ['Assume all unencrypted networks are hostile environments.', 'A VPN is the most effective tool for safe public Wi-Fi usage.'],
    relatedCourseId: 'course-5', // Privacy
    status: 'Published'
  },
  {
    id: 'alert-7',
    title: 'Social Engineering and Urgency Scams',
    summary: 'Recognizing manipulation tactics used by cybercriminals.',
    category: 'Social Engineering',
    severity: 'High',
    publishedDate: new Date(Date.now() - 6 * 86400000).toISOString(),
    readTime: 5,
    sourceType: 'Demo Security Alert',
    content: 'Social engineering relies on human psychology rather than technical exploits. Attackers impersonate authority figures (CEO, IT support, IRS) or create artificial crises to pressure victims into transferring money or revealing sensitive information before they have time to think critically.',
    warningSigns: ['Requests demanding immediate action or secrecy', 'Unusual payment methods requested (gift cards, wire transfers)', 'Slightly altered email addresses from known contacts'],
    protectionSteps: ['Always verify unusual requests via a secondary communication channel (e.g., call the person)', 'Establish clear procedures for financial transfers', 'Adopt a "trust but verify" mindset'],
    responseSteps: ['Cease communication with the suspected scammer', 'Report the incident to security or management', 'If money was transferred, contact your bank immediately'],
    keyTakeaways: ['Urgency is the enemy of security.', 'Verification out-of-band is the best defense against impersonation.'],
    relatedCourseId: 'course-1',
    status: 'Published'
  },
  {
    id: 'alert-8',
    title: 'Protecting Personal Data Online',
    summary: 'Best practices for minimizing your digital footprint.',
    category: 'Privacy',
    severity: 'Medium',
    publishedDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    readTime: 4,
    sourceType: 'Educational Advisory',
    content: 'Every online interaction leaves a digital footprint. Oversharing on social media or using services that aggressively harvest data can lead to identity theft or targeted phishing attacks. Minimizing your footprint reduces your attack surface.',
    warningSigns: ['Receiving highly targeted phishing emails based on recent activities', 'Finding unexpected personal information in public search results'],
    protectionSteps: ['Review and restrict social media privacy settings', 'Limit the amount of personal information shared online', 'Use privacy-focused browsers and search engines'],
    responseSteps: ['Opt-out of data broker sites', 'Regularly audit what information is public about you', 'Delete unused accounts'],
    keyTakeaways: ['Your personal data has value; protect it accordingly.', 'Once data is public, it is nearly impossible to retract.'],
    relatedCourseId: 'course-5',
    status: 'Published'
  },
  {
    id: 'alert-9',
    title: 'Browser Security and Malicious Websites',
    summary: 'How your browser can protect you, and how it can be compromised.',
    category: 'Web Security',
    severity: 'High',
    publishedDate: new Date(Date.now() - 8 * 86400000).toISOString(),
    readTime: 5,
    sourceType: 'CyberAware Awareness Update',
    content: 'Modern browsers have built-in protections, but they can be bypassed through malicious extensions or drive-by downloads. Visiting compromised websites or installing unverified extensions can give attackers access to your browsing history, keystrokes, and session cookies.',
    warningSigns: ['Unexpected toolbars or search engines appearing', 'Browser running significantly slower than usual', 'Frequent redirects to unwanted websites'],
    protectionSteps: ['Keep your browser updated to the latest version', 'Install extensions only from trusted developers', 'Use ad-blockers to prevent malvertising'],
    responseSteps: ['Disable or remove unrecognized extensions', 'Clear browser cache and cookies', 'Reset browser to default settings if persistent issues occur'],
    keyTakeaways: ['Extensions have deep access to your data; choose them wisely.', 'Updates are critical for browser security.'],
    relatedCourseId: 'course-4',
    status: 'Published'
  },
  {
    id: 'alert-10',
    title: 'AI-Powered Scams and Deepfake Awareness',
    summary: 'How artificial intelligence is accelerating cyber threats.',
    category: 'AI Security',
    severity: 'Critical',
    publishedDate: new Date(Date.now() - 9 * 86400000).toISOString(),
    readTime: 6,
    sourceType: 'Educational Advisory',
    content: 'Generative AI is being used by attackers to craft flawless phishing emails, generate malicious code, and create highly convincing voice and video deepfakes (e.g., impersonating a CEO on a phone call). This makes traditional red flags like poor grammar less reliable.',
    warningSigns: ['Perfectly crafted but unexpected urgent requests', 'Voice or video calls where the person sounds slightly robotic or out of sync', 'Requests for money or data from a known contact acting out of character'],
    protectionSteps: ['Establish safe words or verification protocols for sensitive requests', 'Rely on contextual clues rather than just grammar or tone', 'Stay informed about the capabilities of modern AI tools'],
    responseSteps: ['Hang up and call the person back on a known, trusted number', 'Report sophisticated deepfake attempts to authorities'],
    keyTakeaways: ['Seeing or hearing is no longer a guarantee of authenticity.', 'Verification is more critical than ever in the AI era.'],
    relatedCourseId: 'course-6',
    status: 'Published'
  }
];
