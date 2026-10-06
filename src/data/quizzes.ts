import { Shield, Lock, AlertTriangle, BookOpen, CheckCircle2 } from 'lucide-react';

export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
}

export const INITIAL_QUIZZES: QuizCategory[] = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Test your basic knowledge of the cybersecurity landscape and CIA triad.',
    icon: Shield,
    difficulty: 'Beginner',
    questions: [
      {
        id: 'fund-1', category: 'fundamentals',
        question: 'Which of the following best describes the "CIA Triad" in cybersecurity?',
        options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer, Internet, Antivirus', 'Cyber, Intelligence, Analytics'],
        correctAnswer: 1, explanation: 'The CIA triad stands for Confidentiality, Integrity, and Availability, the three core principles of information security.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-2', category: 'fundamentals',
        question: 'What does "Confidentiality" mean in the context of information security?',
        options: ['Data is accurate and unchanged', 'Data is accessible when needed', 'Data is only accessible by authorized individuals', 'Data is backed up regularly'],
        correctAnswer: 2, explanation: 'Confidentiality ensures that sensitive information is not disclosed to unauthorized people.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-3', category: 'fundamentals',
        question: 'If a hacker modifies your bank account balance, which part of the CIA triad has been compromised?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'None of the above'],
        correctAnswer: 1, explanation: 'Integrity ensures that data is accurate and has not been maliciously or accidentally altered.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-4', category: 'fundamentals',
        question: 'What is a "Zero Trust" security model?',
        options: ['Trusting no software, only hardware', 'Assuming no user or device is trusted by default, even inside the network', 'Having zero security measures', 'Trusting only administrators'],
        correctAnswer: 1, explanation: 'Zero Trust assumes that threats exist both inside and outside the network, requiring constant verification.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'fund-5', category: 'fundamentals',
        question: 'Which of the following is considered the weakest link in cybersecurity?',
        options: ['Outdated firewalls', 'Human error', 'Weak encryption algorithms', 'Slow internet connections'],
        correctAnswer: 1, explanation: 'Human error (like falling for phishing or using weak passwords) is often the easiest target for attackers.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-6', category: 'fundamentals',
        question: 'What is the Principle of Least Privilege?',
        options: ['Giving users the most access possible', 'Giving users only the access they need to do their jobs', 'Removing all privileges from users', 'Only granting privileges on weekends'],
        correctAnswer: 1, explanation: 'Least Privilege minimizes risk by ensuring users cannot access sensitive data they don\'t need.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'fund-7', category: 'fundamentals',
        question: 'What is a brute-force attack?',
        options: ['Physically destroying a server', 'Guessing passwords by trying many combinations quickly', 'Sending a phishing email', 'Stealing a laptop'],
        correctAnswer: 1, explanation: 'Brute-force attacks use automated software to guess passwords by rapidly trying combinations.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-8', category: 'fundamentals',
        question: 'Why is it important to lock your computer when you step away?',
        options: ['To save electricity', 'To prevent unauthorized physical access to your account and data', 'To stop background apps', 'To cool down the processor'],
        correctAnswer: 1, explanation: 'Physical access often equates to total access. Locking your screen prevents this.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'fund-9', category: 'fundamentals',
        question: 'Which type of attacker usually lacks technical skills and uses pre-made tools?',
        options: ['Nation-state hackers', 'Advanced Persistent Threats (APTs)', 'Script kiddies', 'White hat hackers'],
        correctAnswer: 2, explanation: '"Script kiddies" rely on tools created by others rather than their own deep technical knowledge.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'fund-10', category: 'fundamentals',
        question: 'If a website crashes and users cannot access it, which element of the CIA triad is affected?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'None'],
        correctAnswer: 2, explanation: 'Availability ensures that systems and data are accessible to users when needed.', difficulty: 'Beginner', xp: 10
      }
    ]
  },
  {
    id: 'passwords',
    title: 'Password & Account Security',
    description: 'Assess your knowledge of strong credentials and multi-factor authentication.',
    icon: Lock,
    difficulty: 'Beginner',
    questions: [
      {
        id: 'pass-1', category: 'passwords',
        question: 'Which of the following makes for the strongest password?',
        options: ['Your pet\'s name and birth year', 'The word "Password" followed by "123!"', 'A long, random sequence of words (a passphrase)', 'Your company name'],
        correctAnswer: 2, explanation: 'Length is the most critical factor. Passphrases are long, making them very hard to crack, but easy for you to remember.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-2', category: 'passwords',
        question: 'Why is password reuse dangerous?',
        options: ['It confuses password managers', 'If one site is breached, attackers can try that password on your other accounts', 'It takes too much memory', 'It violates terms of service'],
        correctAnswer: 1, explanation: 'Attackers use lists of stolen passwords from one site to try and log into other popular sites (credential stuffing).', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-3', category: 'passwords',
        question: 'What is Multi-Factor Authentication (MFA)?',
        options: ['Using a really long password', 'Requiring two or more pieces of evidence to verify your identity', 'Logging in from multiple devices', 'Having two different email addresses'],
        correctAnswer: 1, explanation: 'MFA combines something you know (password) with something you have (phone) or something you are (biometrics).', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-4', category: 'passwords',
        question: 'Which form of MFA is generally considered the LEAST secure?',
        options: ['Hardware security keys (e.g., YubiKey)', 'Authenticator apps (e.g., Google Authenticator)', 'SMS text message codes', 'Biometrics'],
        correctAnswer: 2, explanation: 'SMS codes can be intercepted or stolen via SIM swapping attacks.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'pass-5', category: 'passwords',
        question: 'What is the primary benefit of a password manager?',
        options: ['It makes your computer run faster', 'It generates and securely stores unique passwords for every account', 'It stops phishing emails', 'It encrypts your hard drive'],
        correctAnswer: 1, explanation: 'Password managers eliminate the need to memorize or reuse passwords, increasing security.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-6', category: 'passwords',
        question: 'What is a "Master Password"?',
        options: ['A password that works on any website', 'The single, strong password used to unlock your password manager vault', 'A password assigned by your IT department', 'The default password on a new router'],
        correctAnswer: 1, explanation: 'The Master Password protects all other passwords in your manager, so it must be exceptionally strong.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-7', category: 'passwords',
        question: 'What should you do if you receive an unexpected password reset email?',
        options: ['Click the link and change your password just in case', 'Ignore it or delete it; do not click any links', 'Forward it to your friends', 'Reply to the email asking who requested it'],
        correctAnswer: 1, explanation: 'Unexpected reset emails are often phishing attempts or signs someone is trying to access your account. Never click the link.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-8', category: 'passwords',
        question: 'How often should you change your passwords?',
        options: ['Every 30 days', 'Only if you suspect they have been compromised or a breach has occurred', 'Every time you log in', 'Once a year'],
        correctAnswer: 1, explanation: 'Modern guidance suggests changing passwords only when compromised, as frequent forced changes often lead to weaker passwords.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'pass-9', category: 'passwords',
        question: 'Which of the following is an example of "something you have" in MFA?',
        options: ['A PIN', 'A fingerprint', 'A smartphone with an authenticator app', 'A passphrase'],
        correctAnswer: 2, explanation: 'A smartphone or hardware token is a physical object you possess ("have").', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'pass-10', category: 'passwords',
        question: 'Why should you delete old, unused online accounts?',
        options: ['To save internet bandwidth', 'To reduce your "attack surface" in case the old site is breached', 'To speed up your browser', 'Because it is required by law'],
        correctAnswer: 1, explanation: 'Unused accounts represent unnecessary risk. If that site is hacked, your data is exposed.', difficulty: 'Intermediate', xp: 10
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Phishing & Social Engineering',
    description: 'See if you can spot the tricks used to manipulate human psychology.',
    icon: AlertTriangle,
    difficulty: 'Beginner',
    questions: [
      {
        id: 'phish-1', category: 'phishing',
        question: 'Which of the following is a common sign of a phishing email?',
        options: ['A message you expected from a known contact', 'An urgent request asking you to click a suspicious link', 'A normal offline document', 'A saved contact number'],
        correctAnswer: 1, explanation: 'Phishing messages often create urgency (fear or excitement) to trick users into clicking links without thinking.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-2', category: 'phishing',
        question: 'What is "Spear Phishing"?',
        options: ['Phishing via text message', 'A highly targeted phishing attack aimed at a specific individual or organization', 'Phishing emails sent to millions of people randomly', 'Phishing over the phone'],
        correctAnswer: 1, explanation: 'Spear phishing uses personal information gathered about the target to make the email highly convincing.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'phish-3', category: 'phishing',
        question: 'What is "Smishing"?',
        options: ['Phishing via SMS (text messages)', 'Phishing via voice calls', 'Sending spam emails', 'Stealing passwords via Bluetooth'],
        correctAnswer: 0, explanation: 'Smishing uses text messages to trick targets into clicking malicious links or calling fraudulent numbers.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-4', category: 'phishing',
        question: 'If you get a suspicious email from your "bank", what is the safest action?',
        options: ['Reply to ask if it is real', 'Click the link to check your account', 'Go directly to the bank\'s official website by typing the URL yourself', 'Forward it to a friend'],
        correctAnswer: 2, explanation: 'Never trust links in suspicious emails. Always navigate independently to the verified website.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-5', category: 'phishing',
        question: 'What does hovering your mouse over a link in an email do?',
        options: ['It downloads the linked file', 'It shows the actual destination URL of the link', 'It scans the link for viruses', 'It opens the link in a safe sandbox'],
        correctAnswer: 1, explanation: 'Hovering reveals the true destination URL, allowing you to check if it matches the expected website before clicking.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-6', category: 'phishing',
        question: 'Which of the following is an example of Social Engineering?',
        options: ['Exploiting a software bug', 'Calling an employee pretending to be IT to get their password', 'Using a supercomputer to crack a password', 'Intercepting Wi-Fi traffic'],
        correctAnswer: 1, explanation: 'Social engineering relies on manipulating human psychology rather than technical hacking.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-7', category: 'phishing',
        question: 'Why do phishing emails often contain spelling and grammar errors?',
        options: ['Hackers are bad at spelling', 'They are translated poorly', 'To bypass basic spam filters and quickly filter out skeptical users', 'They don\'t; phishing emails are always perfect'],
        correctAnswer: 2, explanation: 'Errors act as a filter. Attackers want to target the most gullible people who overlook the errors, saving the attacker time.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'phish-8', category: 'phishing',
        question: 'What is "Vishing"?',
        options: ['Visual phishing using fake websites', 'Voice phishing (scam phone calls)', 'Viral phishing on social media', 'Virtual reality phishing'],
        correctAnswer: 1, explanation: 'Vishing (Voice Phishing) involves attackers calling targets over the phone to extract information or money.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'phish-9', category: 'phishing',
        question: 'You find a USB drive in the parking lot labeled "Q3 Layoffs". What should you do?',
        options: ['Plug it into your computer to see what is on it', 'Plug it into a public computer', 'Give it to your IT or security department', 'Throw it in the trash'],
        correctAnswer: 2, explanation: 'This is a "baiting" attack. Malicious USB drives can compromise a computer the moment they are plugged in. IT can safely dispose of it.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'phish-10', category: 'phishing',
        question: 'A pop-up claims your computer is infected and provides a number to call Microsoft Support. What is this?',
        options: ['A genuine Microsoft alert', 'A tech support scam', 'Your antivirus working correctly', 'A hardware failure'],
        correctAnswer: 1, explanation: 'Legitimate tech companies do not use alarming pop-ups with phone numbers. This is a scam designed to extort money.', difficulty: 'Beginner', xp: 10
      }
    ]
  },
  {
    id: 'browsing',
    title: 'Safe Browsing & Malware',
    description: 'Identify malicious websites, downloads, and understand malware threats.',
    icon: BookOpen,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'browse-1', category: 'browsing',
        question: 'What does the "S" in HTTPS stand for?',
        options: ['System', 'Secure', 'Standard', 'Server'],
        correctAnswer: 1, explanation: 'HTTPS stands for Hypertext Transfer Protocol Secure, meaning the connection is encrypted.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'browse-2', category: 'browsing',
        question: 'Does seeing a padlock icon (HTTPS) mean a website is legitimate and safe?',
        options: ['Yes, it means the site is verified by authorities', 'No, it only means the connection is encrypted; phishing sites can use HTTPS too', 'Yes, it means the site has no malware', 'No, the padlock is meaningless'],
        correctAnswer: 1, explanation: 'HTTPS encrypts data in transit, but attackers can easily get HTTPS certificates for malicious websites.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'browse-3', category: 'browsing',
        question: 'What is Ransomware?',
        options: ['Software that steals your passwords secretly', 'Software that encrypts your files and demands payment to unlock them', 'Software that shows you unwanted ads', 'A tool used by police to recover stolen data'],
        correctAnswer: 1, explanation: 'Ransomware holds your data hostage by encrypting it until a ransom is paid.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'browse-4', category: 'browsing',
        question: 'What is the most effective defense against ransomware?',
        options: ['Paying the ransom quickly', 'Using an ad-blocker', 'Maintaining regular, secure offline backups of your data', 'Changing your password frequently'],
        correctAnswer: 2, explanation: 'If you have a secure backup, you can restore your data without needing to pay the ransom.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'browse-5', category: 'browsing',
        question: 'What is a Trojan Horse in cybersecurity?',
        options: ['A virus that replicates across a network', 'Malware disguised as legitimate software to trick users into installing it', 'A firewall designed to block attacks', 'A physical device used to hack Wi-Fi'],
        correctAnswer: 1, explanation: 'Like the mythological wooden horse, Trojans hide malicious intent inside seemingly harmless software.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'browse-6', category: 'browsing',
        question: 'Which of the following file extensions is generally safe to open from an unknown source?',
        options: ['.exe (Executable)', '.txt (Text File)', '.scr (Screensaver)', '.bat (Batch file)'],
        correctAnswer: 1, explanation: 'Text files (.txt) generally cannot contain executable malicious code, unlike .exe, .scr, or .bat files.', difficulty: 'Advanced', xp: 10
      },
      {
        id: 'browse-7', category: 'browsing',
        question: 'What is "Malvertising"?',
        options: ['Marketing campaigns for security software', 'Using malicious online advertisements to spread malware', 'Pop-up blockers', 'Spam emails selling cheap products'],
        correctAnswer: 1, explanation: 'Malvertising injects malicious code into legitimate advertising networks, infecting users even on trusted websites.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'browse-8', category: 'browsing',
        question: 'Why is it important to keep your web browser and its extensions updated?',
        options: ['To get new visual themes', 'To patch security vulnerabilities that attackers could exploit', 'To make the internet load faster', 'To clear your browsing history automatically'],
        correctAnswer: 1, explanation: 'Updates often contain critical security patches that fix known vulnerabilities before attackers can exploit them.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'browse-9', category: 'browsing',
        question: 'What is a "Drive-by Download"?',
        options: ['Downloading files while in a moving car', 'Malware that downloads automatically in the background when you visit a compromised website', 'Downloading a movie to a USB drive', 'Sharing files over Bluetooth'],
        correctAnswer: 1, explanation: 'Drive-by downloads exploit browser vulnerabilities to install malware without the user clicking or approving anything.', difficulty: 'Advanced', xp: 10
      },
      {
        id: 'browse-10', category: 'browsing',
        question: 'You want to download a new PDF reader. What is the safest approach?',
        options: ['Search Google and click the first sponsored ad', 'Download it from a file-sharing site', 'Go directly to the official developer\'s website or use an official app store', 'Click a link in a forum post'],
        correctAnswer: 2, explanation: 'Official websites and app stores are much less likely to host bundled malware or Trojans.', difficulty: 'Beginner', xp: 10
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    description: 'Learn how personal information is collected, exposed, and safeguarded.',
    icon: CheckCircle2,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'priv-1', category: 'privacy',
        question: 'What does PII stand for?',
        options: ['Personal Internet Information', 'Personally Identifiable Information', 'Public Internet Identity', 'Private Information Interface'],
        correctAnswer: 1, explanation: 'PII refers to any data that can identify a specific individual (name, SSN, email, etc.).', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-2', category: 'privacy',
        question: 'What do browser "cookies" primarily do?',
        options: ['Block viruses', 'Store information about your browsing activity and preferences on your computer', 'Encrypt your internet connection', 'Delete your browsing history'],
        correctAnswer: 1, explanation: 'Cookies are small text files used to remember stateful information, like login status or tracking your activity across sites.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-3', category: 'privacy',
        question: 'Does using "Incognito" or "Private Browsing" mode make you completely anonymous online?',
        options: ['Yes, it hides your IP address', 'No, it only prevents your local browser from saving your history and cookies', 'Yes, it encrypts all traffic', 'Yes, it prevents websites from tracking you'],
        correctAnswer: 1, explanation: 'Incognito mode only hides activity from other people using the same computer. Your ISP and the websites you visit can still track you.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'priv-4', category: 'privacy',
        question: 'What is the primary purpose of a VPN (Virtual Private Network)?',
        options: ['To speed up your internet', 'To block all ads', 'To encrypt your internet traffic and hide your IP address', 'To remember your passwords'],
        correctAnswer: 2, explanation: 'A VPN creates a secure, encrypted tunnel for your data, enhancing privacy especially on public networks.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-5', category: 'privacy',
        question: 'Why can oversharing on social media be a security risk?',
        options: ['It slows down the platform', 'It provides attackers with answers to your security questions and material for spear phishing', 'It uses too much data', 'It is against terms of service'],
        correctAnswer: 1, explanation: 'Information like pet names, hometowns, and birthdays are often used for password recovery or to craft convincing scams.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-6', category: 'privacy',
        question: 'What should you do immediately if you receive a notice that your data was involved in a breach?',
        options: ['Close your bank account', 'Change the password for that specific account and any other accounts using the same password', 'Ignore it if you don\'t use the site often', 'Reply to the notice asking for more details'],
        correctAnswer: 1, explanation: 'Changing compromised passwords immediately prevents attackers from using the stolen credentials.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-7', category: 'privacy',
        question: 'What is the most secure way to dispose of physical documents containing sensitive information?',
        options: ['Throw them in the recycling bin', 'Tear them in half once', 'Use a cross-cut shredder', 'Burn them in a microwave'],
        correctAnswer: 2, explanation: 'Cross-cut shredding makes it virtually impossible for "dumpster divers" to reassemble the documents.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'priv-8', category: 'privacy',
        question: 'When an app on your phone asks for location access, you should:',
        options: ['Always allow it', 'Allow it only if the app\'s core function requires it (like a map app)', 'Never allow it', 'Only allow it during the day'],
        correctAnswer: 1, explanation: 'Applying the principle of least privilege means only granting permissions that are strictly necessary for the app to function.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'priv-9', category: 'privacy',
        question: 'Deleting a file on your computer and emptying the recycle bin:',
        options: ['Permanently destroys the data immediately', 'Only removes the reference to the file; the data can often be recovered until overwritten', 'Encrypts the file', 'Uploads it to the cloud'],
        correctAnswer: 1, explanation: 'Standard deletion doesn\'t wipe the data from the hard drive immediately. Secure wiping tools are needed to permanently destroy data.', difficulty: 'Advanced', xp: 10
      },
      {
        id: 'priv-10', category: 'privacy',
        question: 'What is the purpose of full-disk encryption (like BitLocker or FileVault)?',
        options: ['To prevent malware from downloading', 'To ensure that if a device is stolen, the data on the hard drive cannot be read without the password', 'To encrypt emails in transit', 'To speed up file transfers'],
        correctAnswer: 1, explanation: 'Full-disk encryption protects data at rest, making it unreadable to anyone who steals the physical device.', difficulty: 'Intermediate', xp: 10
      }
    ]
  },
  {
    id: 'dailylife',
    title: 'Cybersecurity in Daily Life',
    description: 'Practical security habits for smartphones, Wi-Fi, and online payments.',
    icon: Shield,
    difficulty: 'Beginner',
    questions: [
      {
        id: 'daily-1', category: 'dailylife',
        question: 'What is the main security risk of using public Wi-Fi networks?',
        options: ['They are too slow', 'They can drain your battery', 'They are often unencrypted, allowing attackers to intercept your traffic', 'They charge hidden fees'],
        correctAnswer: 2, explanation: 'Unsecured public Wi-Fi allows attackers on the same network to "eavesdrop" on your unencrypted internet traffic.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'daily-2', category: 'dailylife',
        question: 'What is a "Rogue Hotspot"?',
        options: ['A broken Wi-Fi router', 'A malicious Wi-Fi network set up by an attacker to look like a legitimate one', 'A hotspot with a weak signal', 'A mobile phone acting as a router'],
        correctAnswer: 1, explanation: 'Attackers create fake networks (e.g., "Free Airport Wi-Fi") to trick people into connecting so they can steal their data.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'daily-3', category: 'dailylife',
        question: 'Which payment method generally offers the best fraud protection when shopping online?',
        options: ['Debit card', 'Direct bank transfer', 'Credit card', 'Mailing a check'],
        correctAnswer: 2, explanation: 'Credit cards offer stronger legal protections against fraud and limit your liability compared to debit cards.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'daily-4', category: 'dailylife',
        question: 'Why should you avoid "jailbreaking" or "rooting" your smartphone?',
        options: ['It voids the warranty', 'It bypasses built-in operating system security controls, making the device much more vulnerable to malware', 'It uses too much storage space', 'It makes the screen dimmer'],
        correctAnswer: 1, explanation: 'Jailbreaking removes the strict security "sandboxes" designed to keep apps separated and safe.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'daily-5', category: 'dailylife',
        question: 'What is the 3-2-1 rule for backups?',
        options: ['Backup every 3 weeks, to 2 devices, 1 time', '3 copies of data, on 2 different media types, with 1 copy offsite/cloud', '3 files, 2 folders, 1 drive', 'Backup at 3 PM, 2 AM, and 1 PM'],
        correctAnswer: 1, explanation: 'The 3-2-1 rule is the gold standard for ensuring data recovery in case of hardware failure or ransomware.', difficulty: 'Advanced', xp: 10
      },
      {
        id: 'daily-6', category: 'dailylife',
        question: 'You receive a text from a friend containing only a random link. What should you do?',
        options: ['Click it to see what they sent', 'Verify with the friend through a different method (e.g., calling) before clicking', 'Forward it to others', 'Reply "STOP"'],
        correctAnswer: 1, explanation: 'Your friend\'s phone may be compromised or spoofed. Always verify unexpected links.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'daily-7', category: 'dailylife',
        question: 'What is a virtual credit card number?',
        options: ['A credit card for video games', 'A temporary, generated card number linked to your real account, used to protect your actual details online', 'A card that only works in VR', 'A cryptocurrency wallet'],
        correctAnswer: 1, explanation: 'Virtual numbers shield your actual credit card details from merchants. If the site is breached, your real card is safe.', difficulty: 'Intermediate', xp: 10
      },
      {
        id: 'daily-8', category: 'dailylife',
        question: 'What is a good practice for securing your smartphone lock screen?',
        options: ['Using a simple swipe pattern', 'Setting it to never auto-lock', 'Using a strong passcode/biometrics and a short auto-lock timeout', 'Using "1234" as the PIN'],
        correctAnswer: 2, explanation: 'A strong lock combined with a short timeout ensures your phone secures itself quickly when you put it down.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'daily-9', category: 'dailylife',
        question: 'What is the danger of answering fun social media quizzes (e.g., "What was your first car?")?',
        options: ['They are usually paid subscriptions', 'The answers are often the same as common security questions used for password recovery', 'They slow down the app', 'They are illegal'],
        correctAnswer: 1, explanation: 'Attackers use these quizzes to harvest personal data to break into accounts.', difficulty: 'Beginner', xp: 10
      },
      {
        id: 'daily-10', category: 'dailylife',
        question: 'When should you update your smartphone operating system?',
        options: ['Only when you buy a new phone', 'Once a year', 'Promptly when an update is available, as it likely contains security patches', 'Never, updates slow down the phone'],
        correctAnswer: 2, explanation: 'Promptly applying updates is one of the most critical habits for everyday cyber hygiene.', difficulty: 'Beginner', xp: 10
      }
    ]
  }
];
