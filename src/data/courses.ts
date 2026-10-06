import { Shield, Lock, AlertTriangle, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content: {
    intro: string;
    objectives: string[];
    main: string;
    important: string;
    example: string;
    tip: string;
    takeaways: string[];
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: any;
  xp: number;
  lessons: Lesson[];
}

export const INITIAL_COURSES: Course[] = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the foundations of cybersecurity and understand how common digital threats affect individuals and organizations.',
    difficulty: 'Beginner',
    icon: Shield,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Cybersecurity',
        content: {
          intro: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.',
          objectives: ['Define cybersecurity', 'Understand the importance of digital protection', 'Identify what needs protecting'],
          main: 'In our increasingly digital world, cybersecurity is not just for IT professionals—it is a critical life skill. Cyberattacks usually aim to access, change, or destroy sensitive information; extort money from users; or interrupt normal business processes. Effective cybersecurity reduces the risk of cyberattacks and protects against the unauthorized exploitation of systems, networks, and technologies.',
          important: 'The weakest link in any security system is often human error. Developing a security-first mindset is your best defense.',
          example: 'Think of cybersecurity like locking the doors and windows of your house. Just as you wouldn\'t leave your front door wide open when you leave for work, you shouldn\'t leave your digital accounts unsecured.',
          tip: 'Always lock your devices when stepping away, even for a minute.',
          takeaways: ['Cybersecurity protects digital assets', 'Everyone is a target', 'Human awareness is the first line of defense']
        }
      },
      {
        id: 'lesson-2',
        title: 'CIA Triad',
        content: {
          intro: 'The CIA triad is a well-known model for security policy development, used to identify problem areas and necessary solutions for information security.',
          objectives: ['Define Confidentiality', 'Define Integrity', 'Define Availability'],
          main: 'The CIA triad stands for Confidentiality, Integrity, and Availability. \n\nConfidentiality ensures that data is accessed only by authorized individuals. \n\nIntegrity ensures that data is authentic and has not been maliciously or accidentally altered. \n\nAvailability ensures that data and systems are accessible by authorized users whenever they need them.',
          important: 'A successful cyberattack compromises one or more elements of the CIA triad.',
          example: 'If a hacker steals your credit card information, they violated Confidentiality. If they change your bank balance, they violated Integrity. If they crash the bank\'s website so you cannot log in, they violated Availability.',
          tip: 'When designing or evaluating a system, always ask: Does this protect the CIA of the data?',
          takeaways: ['Confidentiality keeps data private', 'Integrity keeps data accurate', 'Availability keeps data accessible']
        }
      },
      {
        id: 'lesson-3',
        title: 'Common Cyber Threats',
        content: {
          intro: 'Understanding the types of threats that exist is the first step in defending against them.',
          objectives: ['Identify common cyber threats', 'Understand malware and phishing', 'Recognize insider threats'],
          main: 'Cyber threats come in many forms. Malware (malicious software) includes viruses, worms, and spyware designed to cause damage. Phishing involves tricking individuals into revealing sensitive information. Ransomware encrypts your data and demands payment for the key. Insider threats come from individuals within an organization who misuse their access.',
          important: 'Threats are constantly evolving, requiring continuous learning and adaptation.',
          example: 'You receive an email claiming your account will be suspended unless you click a link and log in immediately. This is a classic phishing threat attempting to steal your credentials.',
          tip: 'When in doubt about a message or link, verify it through an independent channel (like calling the company directly).',
          takeaways: ['Malware damages systems', 'Phishing manipulates people', 'Threats constantly evolve']
        }
      },
      {
        id: 'lesson-4',
        title: 'Attackers and Attack Methods',
        content: {
          intro: 'Who is behind cyberattacks, and how do they carry them out?',
          objectives: ['Identify types of attackers', 'Understand common attack vectors', 'Learn about brute force and social engineering'],
          main: 'Attackers range from script kiddies (unskilled individuals using pre-made tools) to organized cybercriminal groups and state-sponsored hackers. They use various methods, including brute-force attacks (guessing passwords), exploiting software vulnerabilities (zero-days), and social engineering (manipulating human psychology).',
          important: 'Most attackers prefer the path of least resistance. Making yourself a difficult target deters many attacks.',
          example: 'An attacker might try to log into an account by trying thousands of common passwords (brute force), or they might simply call an employee pretending to be IT support and ask for their password (social engineering).',
          tip: 'Using long, unique passwords defeats brute-force attacks, while awareness defeats social engineering.',
          takeaways: ['Attackers have varying skill levels', 'Social engineering targets humans', 'Vulnerabilities target software']
        }
      },
      {
        id: 'lesson-5',
        title: 'Building a Security Mindset',
        content: {
          intro: 'Security is not a product you buy, but a process and a mindset you adopt.',
          objectives: ['Adopt a zero-trust approach', 'Understand the principle of least privilege', 'Develop habits for continuous security'],
          main: 'A security mindset involves healthy skepticism and proactive defense. The "Zero Trust" model assumes no user or device is trusted by default, even if they are already inside the network. The Principle of Least Privilege dictates that users should only have the minimum level of access necessary to perform their jobs. Building this mindset means consistently applying these concepts to your daily digital life.',
          important: 'Security is a continuous journey, not a destination. It requires ongoing vigilance.',
          example: 'Instead of clicking a link in an email to check your bank balance, you manually open your browser, type in the bank\'s URL, and log in securely. This demonstrates a proactive security mindset.',
          tip: 'Always pause and think before you click, download, or share.',
          takeaways: ['Assume nothing is safe by default', 'Limit access to what is strictly necessary', 'Stay vigilant and continuously learn']
        }
      }
    ]
  },
  {
    id: 'passwords',
    title: 'Password & Account Security',
    description: 'Learn how to protect online accounts using strong passwords, password managers and multi-factor authentication.',
    difficulty: 'Beginner',
    icon: Lock,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Strong Passwords',
        content: {
          intro: 'Your password is the front door to your digital life. Make sure it has a strong lock.',
          objectives: ['Understand what makes a password strong', 'Learn how to create passphrases', 'Avoid common password mistakes'],
          main: 'A strong password is long, complex, and unique. Length is the most critical factor; a 16-character password is exponentially harder to crack than an 8-character one. Using a "passphrase"—a sequence of random words (e.g., "CorrectHorseBatteryStaple")—is an excellent way to create a long, memorable, and strong password. Avoid using personal information like birthdays, pet names, or easily guessable patterns.',
          important: 'Never reuse passwords across different accounts. If one site is breached, all your other accounts are at risk.',
          example: '"P@ssw0rd1" might meet complexity requirements, but it is easily guessed. "PurpleElephantDancingQuickly" is much longer and significantly stronger.',
          tip: 'Aim for at least 12-16 characters for your passwords or use passphrases.',
          takeaways: ['Length beats complexity', 'Passphrases are memorable and strong', 'Never reuse passwords']
        }
      },
      {
        id: 'lesson-2',
        title: 'Password Managers',
        content: {
          intro: 'How can you remember dozens of unique, strong passwords? You don\'t have to.',
          objectives: ['Understand how password managers work', 'Learn the benefits of using a password manager', 'Choose a master password'],
          main: 'A password manager is an encrypted digital vault that stores your login information. You only need to remember one strong "Master Password" to unlock the vault. The manager can generate strong, random passwords for new accounts and autofill them when you log in. This eliminates the need to remember or reuse passwords.',
          important: 'Your Master Password is the key to your vault. It must be extremely strong and memorable, and you must never lose it.',
          example: 'Instead of trying to remember "xY7#kL9@pQ2", your password manager fills it in automatically when you visit your banking site.',
          tip: 'Use a long, unique passphrase as your Master Password.',
          takeaways: ['Password managers generate and store passwords securely', 'You only need to remember one Master Password', 'They prevent password reuse']
        }
      },
      {
        id: 'lesson-3',
        title: 'Multi-Factor Authentication',
        content: {
          intro: 'Even the strongest password can be stolen. MFA provides an essential backup layer of security.',
          objectives: ['Understand the concept of MFA/2FA', 'Identify the three main authentication factors', 'Enable MFA on important accounts'],
          main: 'Multi-Factor Authentication (MFA) requires two or more pieces of evidence to verify your identity. These factors fall into three categories: \n1. Something you know (a password or PIN) \n2. Something you have (a smartphone app, SMS code, or hardware token) \n3. Something you are (a fingerprint or facial recognition). \nBy combining these, even if an attacker steals your password, they cannot access your account without the second factor.',
          important: 'Authenticator apps (like Google Authenticator) are generally more secure than receiving codes via SMS text message.',
          example: 'When logging into your email, you enter your password (something you know), and then the site prompts you to enter a 6-digit code from an app on your phone (something you have).',
          tip: 'Enable MFA on your email, banking, and primary social media accounts immediately.',
          takeaways: ['MFA adds a critical layer of defense', 'It requires multiple types of evidence', 'App-based MFA is safer than SMS']
        }
      },
      {
        id: 'lesson-4',
        title: 'Account Takeover',
        content: {
          intro: 'What happens when an attacker gains access to your account?',
          objectives: ['Recognize the signs of an account takeover', 'Understand the impact of a compromised account', 'Learn immediate response steps'],
          main: 'An account takeover (ATO) occurs when an unauthorized person gains access to your account. Signs include unexpected password reset emails, login notifications from unfamiliar locations, or changes to your account settings. Attackers often use compromised accounts to launch further attacks, such as sending phishing emails to your contacts or accessing linked financial accounts.',
          important: 'Your primary email account is the most critical to protect, as it can be used to reset passwords for almost all your other accounts.',
          example: 'You receive an email from Netflix saying your email address has been updated, but you didn\'t make any changes. This is a strong indicator of an account takeover.',
          tip: 'If you suspect an account takeover, immediately try to log in and change the password, and enable MFA if you haven\'t already.',
          takeaways: ['Watch for unusual account activity', 'Protect your primary email account above all', 'Act quickly if you suspect a breach']
        }
      },
      {
        id: 'lesson-5',
        title: 'Securing Your Online Accounts',
        content: {
          intro: 'Putting it all together to create a robust defense for your digital identity.',
          objectives: ['Perform a personal security audit', 'Identify inactive accounts', 'Implement a comprehensive account security strategy'],
          main: 'Securing your online presence is an ongoing process. Start by auditing your accounts: prioritize high-value targets like email, banking, and main social media. Ensure these have unique, strong passwords (stored in a manager) and MFA enabled. Delete old, unused accounts, as they represent unnecessary risk if breached. Regularly check sites like HaveIBeenPwned to see if your information has appeared in a known data breach.',
          important: 'Security is about reducing risk. You cannot be 100% secure, but you can make yourself a very difficult target.',
          example: 'You close an old shopping account you haven\'t used in five years. A year later, that site is hacked. Because you deleted your account, your data is safe.',
          tip: 'Do a quick account security review once a year—update your password manager and check MFA settings.',
          takeaways: ['Audit your high-value accounts', 'Delete unused accounts to reduce your attack surface', 'Monitor for breaches']
        }
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Phishing & Social Engineering',
    description: 'Learn how attackers manipulate people and how to identify phishing emails, messages, calls and scams.',
    difficulty: 'Beginner',
    icon: AlertTriangle,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'What is Phishing?',
        content: {
          intro: 'Phishing is one of the oldest and most effective forms of cyberattack.',
          objectives: ['Define phishing', 'Understand the attacker\'s goal', 'Recognize the psychological triggers used'],
          main: 'Phishing is a type of social engineering attack where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information or deploying malicious software. Attackers manipulate human emotions—creating a sense of urgency, fear, curiosity, or greed—to prompt quick, unthinking action. They often impersonate trusted entities like banks, delivery services, or even your boss.',
          important: 'Phishing relies on human error, not technical flaws. Your skepticism is your best defense.',
          example: 'An email claiming to be from the IRS demanding immediate payment to avoid arrest is a classic fear-based phishing tactic.',
          tip: 'If a message invokes a strong emotional reaction and demands immediate action, pause. It\'s likely a scam.',
          takeaways: ['Phishing manipulates emotions', 'It targets humans, not systems', 'Urgency is a key indicator']
        }
      },
      {
        id: 'lesson-2',
        title: 'Email Phishing',
        content: {
          intro: 'The most common vector for phishing is the inbox. Learn how to spot the bait.',
          objectives: ['Identify common indicators of a phishing email', 'Learn how to inspect sender addresses', 'Understand the danger of malicious links and attachments'],
          main: 'Spotting a phishing email requires careful inspection. Look for: \n1. Mismatched Sender Addresses (e.g., "support@paypal.com" actually coming from "xyz123@free-email.ru"). \n2. Generic Greetings ("Dear Customer" instead of your name). \n3. Poor Spelling and Grammar. \n4. Suspicious Links (hover over a link without clicking to see the actual destination URL). \n5. Unexpected Attachments, especially ZIP files or office documents.',
          important: 'Attackers can easily spoof (fake) the "From" name in an email. Always check the actual email address behind the name.',
          example: 'An email looks like it\'s from Netflix, but when you hover over the "Update Payment" button, the URL preview shows "http://netflix-update-account.some-random-site.com".',
          tip: 'Never click links or open attachments in unexpected emails. Go directly to the website instead.',
          takeaways: ['Inspect sender addresses carefully', 'Hover over links before clicking', 'Be wary of unexpected attachments']
        }
      },
      {
        id: 'lesson-3',
        title: 'Smishing & Vishing',
        content: {
          intro: 'Phishing doesn\'t just happen via email. Attackers use text messages and phone calls, too.',
          objectives: ['Define Smishing (SMS phishing)', 'Define Vishing (Voice phishing)', 'Learn how to respond to suspicious texts and calls'],
          main: 'Smishing involves sending fraudulent text messages, often containing a malicious link or a phone number to call. Common lures include fake package delivery notices or bank alerts. Vishing involves fraudulent phone calls, where the attacker uses social engineering tactics directly over the phone, sometimes using spoofed caller ID to appear legitimate (e.g., pretending to be tech support or law enforcement).',
          important: 'Caller ID can be easily faked. Just because your phone says the call is from your bank doesn\'t mean it is.',
          example: 'You receive a text saying, "FedEx: Your package delivery failed. Click here to reschedule: [malicious link]." This is a smishing attack.',
          tip: 'If you receive a suspicious call from an institution, hang up and call them back using a verified phone number from their official website or the back of your card.',
          takeaways: ['Phishing happens via SMS (Smishing) and Voice (Vishing)', 'Caller ID can be spoofed', 'Verify by initiating the contact yourself']
        }
      },
      {
        id: 'lesson-4',
        title: 'Social Engineering',
        content: {
          intro: 'The broader art of human manipulation that makes phishing possible.',
          objectives: ['Understand the principles of social engineering', 'Recognize common social engineering tactics', 'Learn how to protect yourself in physical and digital spaces'],
          main: 'Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. It exploits our natural tendencies to be helpful, polite, or to respect authority. Tactics include pretexting (creating a fabricated scenario), baiting (leaving a malware-infected USB drive to be found), and tailgating (following an authorized person into a secure building).',
          important: 'Social engineers often gather information about you from social media to make their attacks more convincing (Spear Phishing).',
          example: 'An attacker calls the IT helpdesk, pretends to be a new executive who forgot their password, and acts angry and impatient. The IT worker, wanting to be helpful and avoid conflict, resets the password.',
          tip: 'Be cautious about the amount of personal information you share publicly on social media.',
          takeaways: ['Exploits human psychology, not technology', 'Relies on trust, helpfulness, or fear', 'Can happen in person or online']
        }
      },
      {
        id: 'lesson-5',
        title: 'Detecting Scams',
        content: {
          intro: 'How to spot the red flags in everyday digital interactions.',
          objectives: ['Recognize common online scams', 'Understand the "too good to be true" principle', 'Learn how to verify suspicious claims'],
          main: 'Scams take many forms: fake tech support pop-ups claiming your computer is infected, romance scams on dating apps, investment fraud involving cryptocurrency, or fake charities after a disaster. A universal rule of thumb is: if an offer seems too good to be true, it almost certainly is. Legitimate organizations will not pressure you for immediate payment via gift cards or cryptocurrency.',
          important: 'Scammers frequently request payment in untraceable forms, such as gift cards or wire transfers.',
          example: 'A pop-up appears on your screen with a loud alarm, claiming your computer has a virus and providing a phone number to call for "Microsoft Support." This is a tech support scam.',
          tip: 'Legitimate companies will never ask you to pay for services using gift cards.',
          takeaways: ['If it seems too good to be true, it probably is', 'Beware of requests for untraceable payments', 'Verify claims independently']
        }
      }
    ]
  },
  {
    id: 'browsing',
    title: 'Safe Browsing & Malware',
    description: 'Understand malicious websites, downloads, malware and ransomware and learn safe browsing habits.',
    difficulty: 'Intermediate',
    icon: BookOpen,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Safe Web Browsing',
        content: {
          intro: 'Navigating the web safely requires awareness of the hazards.',
          objectives: ['Understand HTTPS and browser security indicators', 'Recognize malicious websites', 'Learn safe browsing practices'],
          main: 'When browsing, always look for HTTPS in the URL (often indicated by a padlock icon). HTTPS encrypts the connection between your browser and the website, protecting data in transit. However, HTTPS does not mean the site itself is safe or legitimate—phishing sites often use HTTPS. Be cautious of pop-ups, misleading download buttons, and sites with excessive advertisements. Keep your browser and its plugins updated.',
          important: 'A padlock icon only means your connection is encrypted; it does not guarantee the website is trustworthy.',
          example: 'You search for a popular software program, but the top result is a sponsored link to a site that looks slightly off and has a slightly misspelled URL. This is likely a malicious site hosting malware.',
          tip: 'Use an ad-blocker or privacy extension to reduce the risk of malvertising (malicious advertisements).',
          takeaways: ['Look for HTTPS for encryption', 'A padlock does not equal safety', 'Beware of misleading links and ads']
        }
      },
      {
        id: 'lesson-2',
        title: 'Malware',
        content: {
          intro: 'Malicious software is designed to infiltrate or damage a computer system.',
          objectives: ['Define malware', 'Identify different types of malware', 'Understand how malware infects systems'],
          main: 'Malware is a broad term encompassing viruses, worms, Trojans, spyware, and adware. Viruses attach to clean files and spread; worms replicate themselves across networks; Trojans disguise themselves as legitimate software; spyware secretly monitors user activity. Malware often infects systems through malicious email attachments, compromised websites (drive-by downloads), or downloading infected software from untrustworthy sources.',
          important: 'A device can be infected with malware without showing obvious signs like slowing down or crashing.',
          example: 'You download a "free" version of a paid game from a file-sharing site. It installs the game, but it also installs a Trojan that steals your saved passwords.',
          tip: 'Only download software from official sources and app stores.',
          takeaways: ['Malware comes in many forms', 'It often disguises itself as legitimate software', 'Infections can be silent']
        }
      },
      {
        id: 'lesson-3',
        title: 'Viruses & Trojans',
        content: {
          intro: 'Diving deeper into two of the most common types of malware.',
          objectives: ['Distinguish between viruses and Trojans', 'Understand their mechanisms of action', 'Learn how to avoid them'],
          main: 'A computer virus requires a host program to run and spread, much like a biological virus. It modifies other computer programs and inserts its own code. A Trojan horse, on the other hand, relies on deception. It presents itself as a useful or interesting program to trick the user into installing it. Once inside, Trojans can create a "backdoor" allowing attackers remote access to the system.',
          important: 'Unlike viruses, Trojans do not self-replicate. They require the user to actively download and execute them.',
          example: 'An email attachment labeled "Invoice.pdf.exe" is a classic Trojan disguise. The ".exe" extension means it is an executable program, not a PDF document.',
          tip: 'Configure your operating system to show file extensions, so you aren\'t tricked by disguised files.',
          takeaways: ['Viruses infect other files', 'Trojans trick users into installing them', 'Pay attention to file extensions']
        }
      },
      {
        id: 'lesson-4',
        title: 'Ransomware',
        content: {
          intro: 'A digital hostage situation.',
          objectives: ['Define ransomware', 'Understand the impact of a ransomware attack', 'Learn how to mitigate ransomware risks'],
          main: 'Ransomware is a type of malware that encrypts the victim\'s files or locks them out of their system, demanding a ransom payment (usually in cryptocurrency) in exchange for the decryption key. It is highly disruptive and can devastate individuals and businesses. The most effective defense against ransomware is maintaining regular, secure, offline backups of all important data.',
          important: 'Paying the ransom does not guarantee you will get your data back, and it encourages further attacks.',
          example: 'You turn on your computer and see a red screen demanding $500 in Bitcoin to unlock your encrypted personal photos and documents.',
          tip: 'Regularly back up your important files to an external hard drive disconnected from your computer, or a secure cloud service.',
          takeaways: ['Ransomware encrypts data and demands payment', 'Backups are the primary defense', 'Paying the ransom is risky and discouraged']
        }
      },
      {
        id: 'lesson-5',
        title: 'Safe Downloads',
        content: {
          intro: 'Protecting your system when acquiring new software or files.',
          objectives: ['Identify safe sources for downloads', 'Recognize risky file types', 'Use antivirus software effectively'],
          main: 'To download safely: \n1. Use official sources (the software developer\'s official website, Apple App Store, Google Play Store). \n2. Avoid pirated software and keygens, which are frequently bundled with malware. \n3. Be cautious of free software sites that bundle "optional" adware during installation. \n4. Maintain reputable, updated antivirus/anti-malware software to scan downloads before opening them.',
          important: 'During installation of any software, always choose the "Custom" or "Advanced" installation option to uncheck any bundled, unwanted programs.',
          example: 'You need a PDF reader. Instead of searching Google and clicking the first link, you go directly to Adobe.com or use your operating system\'s built-in app store.',
          tip: 'If your browser or antivirus warns you that a download is dangerous, trust the warning and cancel the download.',
          takeaways: ['Download only from trusted sources', 'Avoid pirated software', 'Use and update antivirus software']
        }
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    description: 'Learn how personal information is collected, exposed and protected online.',
    difficulty: 'Intermediate',
    icon: CheckCircle2,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Personal Data',
        content: {
          intro: 'Your personal data is valuable currency in the digital economy.',
          objectives: ['Define Personally Identifiable Information (PII)', 'Understand how data is collected', 'Recognize the value of your data'],
          main: 'Personally Identifiable Information (PII) is any data that can identify you, such as your name, address, Social Security number, email, or phone number. Companies collect this data actively (when you fill out a form) and passively (by tracking your browsing habits, location, and device information). This data is often used for targeted advertising, but can be misused if it falls into the wrong hands.',
          important: 'Even seemingly harmless data points can be combined to create a detailed profile of your identity and habits.',
          example: 'A free flashlight app requests access to your location and contacts. It collects this data and sells it to marketing firms, even though it has nothing to do with the app\'s function.',
          tip: 'Before providing personal information, ask yourself: Does this service actually need this data to function?',
          takeaways: ['PII identifies you', 'Data is collected actively and passively', 'Your data has significant value']
        }
      },
      {
        id: 'lesson-2',
        title: 'Privacy Online',
        content: {
          intro: 'Taking control of your digital footprint.',
          objectives: ['Understand tracking technologies', 'Learn how to limit tracking', 'Use privacy-focused tools'],
          main: 'Websites use cookies and tracking pixels to monitor your activity across the web. To enhance your privacy, regularly clear your browser cookies, use browser features like "Do Not Track" (though compliance varies), or use privacy-focused browsers or extensions that block trackers. A Virtual Private Network (VPN) can hide your IP address and encrypt your internet traffic, providing additional privacy, especially on public networks.',
          important: 'Incognito or Private Browsing mode does not make you anonymous; it simply prevents your browser from saving your local history and cookies.',
          example: 'You look at a pair of shoes on an online store, and suddenly you see ads for those same shoes on every other website you visit. This is the result of tracking cookies.',
          tip: 'Review the privacy settings in your web browser and disable third-party cookies.',
          takeaways: ['Trackers monitor your web activity', 'Use tools to block tracking', 'Incognito mode is not complete anonymity']
        }
      },
      {
        id: 'lesson-3',
        title: 'Data Breaches',
        content: {
          intro: 'When companies fail to protect your data.',
          objectives: ['Define a data breach', 'Understand the consequences for individuals', 'Learn how to respond to a breach'],
          main: 'A data breach occurs when unauthorized individuals gain access to confidential data. This often happens when hackers compromise a company\'s database. If your data is involved in a breach, it may be sold on the dark web and used for identity theft or targeted phishing attacks. If you are notified of a breach, immediately change your password for that service and any other service where you reused that password.',
          important: 'You cannot control if a company is breached, but you can control the impact by using unique passwords for every account.',
          example: 'A major hotel chain is hacked, and the names, addresses, and passport numbers of millions of guests are stolen and posted online.',
          tip: 'Use a service like "Have I Been Pwned" to check if your email address has been compromised in known data breaches.',
          takeaways: ['Breaches expose personal data', 'They often lead to identity theft', 'Respond by changing passwords immediately']
        }
      },
      {
        id: 'lesson-4',
        title: 'Social Media Privacy',
        content: {
          intro: 'Oversharing can have real-world security consequences.',
          objectives: ['Understand the risks of oversharing', 'Configure privacy settings on social platforms', 'Manage your digital reputation'],
          main: 'Social media platforms are designed to encourage sharing, but oversharing provides attackers with valuable information for social engineering or identity theft. Information like your pet\'s name, your hometown, or your birthday are often used as security questions for password recovery. Review the privacy settings on all your social media accounts and restrict access to your posts and profile information to trusted friends only.',
          important: 'Once information is posted online, it is nearly impossible to permanently remove it.',
          example: 'You post a picture of your new driver\'s license to celebrate passing your test. Identity thieves can use the information visible on the license.',
          tip: 'Set your social media profiles to "Private" and be highly selective about accepting friend requests.',
          takeaways: ['Oversharing provides ammunition for attackers', 'Lock down privacy settings', 'Think before you post']
        }
      },
      {
        id: 'lesson-5',
        title: 'Protecting Sensitive Information',
        content: {
          intro: 'Safeguarding the data that matters most.',
          objectives: ['Identify sensitive documents and data', 'Learn safe storage and disposal methods', 'Understand encryption basics'],
          main: 'Protecting sensitive information (tax returns, medical records, financial statements) requires both digital and physical security. Store digital sensitive documents in encrypted folders or secure cloud storage. When disposing of physical documents containing PII, always use a cross-cut shredder. When disposing of old computers or phones, securely wipe or physically destroy the hard drive.',
          important: 'Deleting a file on your computer does not immediately remove the data; it just removes the reference to it. The data can often be recovered until it is overwritten.',
          example: 'Throwing a pre-approved credit card offer in the recycling bin intact allows "dumpster divers" to potentially open an account in your name.',
          tip: 'Enable full-disk encryption on your laptop (like BitLocker for Windows or FileVault for Mac).',
          takeaways: ['Secure sensitive data digitally and physically', 'Shred physical documents', 'Securely wipe old devices']
        }
      }
    ]
  },
  {
    id: 'dailylife',
    title: 'Cybersecurity in Daily Life',
    description: 'Apply cybersecurity best practices to smartphones, Wi-Fi, social media, payments and everyday digital activities.',
    difficulty: 'Beginner',
    icon: Shield,
    xp: 100,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Smartphone Security',
        content: {
          intro: 'Your smartphone is a powerful computer holding your most personal data.',
          objectives: ['Secure your device physically and digitally', 'Manage app permissions', 'Keep the OS and apps updated'],
          main: 'Smartphones are prime targets for attackers. Secure your device with a strong passcode or biometric authentication (fingerprint/face ID). Keep the operating system and all apps updated to patch vulnerabilities. Be mindful of app permissions; a calculator app does not need access to your contacts or location. Avoid "jailbreaking" or "rooting" your phone, as this bypasses built-in security protections.',
          important: 'Enable "Find My Device" features so you can locate, lock, or remotely wipe your phone if it is lost or stolen.',
          example: 'You download a free game, and it requests permission to access your microphone and camera. Denying these unnecessary permissions protects your privacy.',
          tip: 'Set your screen to lock automatically after a short period of inactivity (e.g., 30 seconds).',
          takeaways: ['Use strong screen locks', 'Review and restrict app permissions', 'Keep software updated']
        }
      },
      {
        id: 'lesson-2',
        title: 'Public Wi-Fi',
        content: {
          intro: 'Convenient, but inherently insecure.',
          objectives: ['Understand the risks of public Wi-Fi', 'Learn how attackers intercept data', 'Use VPNs for protection'],
          main: 'Public Wi-Fi networks (in cafes, airports, hotels) are often unsecured, meaning data transmitted over them can be intercepted by anyone else on the network (a "Man-in-the-Middle" attack). Attackers can also set up rogue hotspots with legitimate-sounding names (e.g., "Free Airport Wi-Fi") to capture your data. Avoid accessing sensitive accounts (banking, email) on public Wi-Fi unless you use a Virtual Private Network (VPN).',
          important: 'A VPN creates a secure, encrypted tunnel between your device and the internet, protecting your data even on an unsecured network.',
          example: 'You sit in a coffee shop and connect to "CoffeeShop_Guest". An attacker sitting nearby is running software that captures all the unencrypted web traffic on that network.',
          tip: 'If you don\'t have a VPN, use your smartphone\'s cellular data connection (hotspot) instead of public Wi-Fi when dealing with sensitive information.',
          takeaways: ['Public Wi-Fi is easily intercepted', 'Avoid sensitive transactions on public networks', 'Use a VPN for security']
        }
      },
      {
        id: 'lesson-3',
        title: 'Social Media Safety',
        content: {
          intro: 'Navigating the social landscape securely.',
          objectives: ['Recognize social media scams', 'Manage privacy settings', 'Avoid oversharing'],
          main: 'Social media is rife with scams, including fake giveaways, malicious links disguised as shocking news, and account cloning (where scammers create a fake profile using your photo to trick your friends). Be cautious of quizzes that ask personal questions (which often map to password security questions). Regularly review your privacy settings to control who can see your posts and personal information.',
          important: 'Just because a link is posted by a friend doesn\'t mean it\'s safe; their account may have been compromised.',
          example: 'A friend sends you a message with a link saying "Is this a video of you?!". Clicking the link takes you to a fake login page designed to steal your credentials.',
          tip: 'Verify suspicious messages with your friends through a different communication channel (like a text or phone call).',
          takeaways: ['Be skeptical of links and quizzes', 'Lock down privacy settings', 'Watch out for cloned accounts']
        }
      },
      {
        id: 'lesson-4',
        title: 'Online Payments',
        content: {
          intro: 'Protecting your money in the digital world.',
          objectives: ['Use secure payment methods', 'Recognize secure checkout processes', 'Monitor financial statements'],
          main: 'When shopping online, use credit cards instead of debit cards, as credit cards generally offer better fraud protection and limit your liability. Consider using third-party payment services (like PayPal or Apple Pay) or virtual credit card numbers, which shield your actual card details from the merchant. Always ensure the checkout page uses HTTPS. Regularly review your bank and credit card statements for unauthorized charges.',
          important: 'Never send payment information via email or text message, as these channels are typically unencrypted.',
          example: 'You use a virtual credit card number to buy an item from a new, unfamiliar website. If the site is breached, the attacker only gets the virtual number, which you can easily cancel.',
          tip: 'Set up alerts on your credit cards to notify you of any transaction over a certain amount or any international purchases.',
          takeaways: ['Credit cards offer better protection than debit cards', 'Use virtual numbers or secure payment services', 'Monitor statements regularly']
        }
      },
      {
        id: 'lesson-5',
        title: 'Everyday Cyber Hygiene',
        content: {
          intro: 'Creating a routine for digital health.',
          objectives: ['Develop a daily security routine', 'Understand the importance of backups', 'Maintain awareness'],
          main: 'Cyber hygiene is the set of practices and steps that users take to maintain system health and improve online security. This includes regularly updating software, maintaining reliable backups (using the 3-2-1 rule: 3 copies of data, on 2 different media, with 1 copy offsite/cloud), using strong passwords, and staying informed about current threats. Good cyber hygiene reduces the risk of operational interruptions, data compromise, and data loss.',
          important: 'Security is not a one-time setup; it requires consistent, ongoing effort.',
          example: 'You set your computer and smartphone to update automatically overnight, ensuring you always have the latest security patches without having to remember to install them manually.',
          tip: 'Schedule a monthly "cyber health check" to review backups, update passwords, and check for software updates.',
          takeaways: ['Automate updates and backups', 'Follow the 3-2-1 backup rule', 'Make security a habit']
        }
      }
    ]
  }
];
