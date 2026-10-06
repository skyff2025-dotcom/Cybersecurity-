export interface Threat {
  id: string;
  title: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  overview: string;
  howItWorks: string[];
  warningSigns: string[];
  protection: string[];
  response: string[];
  keywords: string[];
  publishedDate: string;
  status: 'Awareness Topic';
}

export const INITIAL_THREATS: Threat[] = [
  {
    id: 'credential-phishing',
    title: 'Credential Phishing',
    category: 'Phishing',
    severity: 'High',
    description: 'Attackers use deceptive emails or messages to trick users into providing usernames and passwords.',
    overview: 'Credential phishing attempts to trick users into providing usernames, passwords, or other authentication information by impersonating trusted entities such as banks, service providers, or employers.',
    howItWorks: [
      'Attacker creates a deceptive message appearing to be from a legitimate source.',
      'User receives the message, which often creates a sense of urgency or fear.',
      'User clicks a malicious link embedded in the message.',
      'A fake website resembling the legitimate service requests login credentials.',
      'Attacker harvests the entered credentials and uses them to access the real account.'
    ],
    warningSigns: [
      'Unexpected login requests or password reset notifications.',
      'Urgent language threatening account suspension.',
      'Suspicious sender email addresses or domain names.',
      'Generic greetings like "Dear Customer".',
      'Links that point to unfamiliar or slightly misspelled URLs.'
    ],
    protection: [
      'Verify the sender\'s email address carefully.',
      'Never click links in unexpected emails; navigate to the website directly.',
      'Enable Multi-Factor Authentication (MFA) on all accounts.',
      'Use a password manager to generate and store unique passwords.',
      'Report suspicious internal emails to your IT or security team.'
    ],
    response: [
      'Do not enter any information if you suspect a phishing site.',
      'If you already entered credentials, change your password immediately from a trusted device.',
      'Enable MFA if it is not already active.',
      'Monitor your account for unauthorized activity.',
      'Report the incident to the service provider and your organization\'s IT department.'
    ],
    keywords: ['password', 'login', 'email', 'fake website', 'credentials', 'MFA'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'fake-delivery-messages',
    title: 'Fake Delivery Messages',
    category: 'Social Engineering',
    severity: 'Medium',
    description: 'Scam text messages or emails claiming a package delivery failed, aiming to steal personal info or fees.',
    overview: 'Attackers send SMS messages (smishing) or emails impersonating popular delivery services (USPS, FedEx, UPS) claiming a package could not be delivered due to missing information or unpaid customs fees.',
    howItWorks: [
      'Attacker sends a mass text message claiming a package delivery issue.',
      'The message includes a link to "update delivery preferences" or "pay a small fee".',
      'The link directs the victim to a fraudulent website that looks like the delivery company.',
      'The site requests personal information, credit card details, or a small payment.',
      'Attackers use the stolen payment info for fraudulent purchases.'
    ],
    warningSigns: [
      'Receiving a delivery notification when you are not expecting a package.',
      'Messages requesting a small "redelivery fee".',
      'Links that do not match the official tracking website of the carrier.',
      'Messages originating from unfamiliar phone numbers or personal email addresses.',
      'Urgent requests claiming the package will be returned to sender immediately.'
    ],
    protection: [
      'Track packages directly using the official app or website of the carrier.',
      'Do not click links in unsolicited text messages or emails.',
      'Be highly suspicious of any request for a small fee to release a package.',
      'Familiarize yourself with how delivery companies actually communicate.',
      'Use SMS filtering on your mobile device.'
    ],
    response: [
      'Ignore and delete the suspicious message.',
      'If you provided payment information, contact your bank or credit card issuer immediately to block the card.',
      'Monitor your financial statements for unauthorized charges.',
      'Report the scam message to the official delivery company and relevant authorities.'
    ],
    keywords: ['smishing', 'text message', 'package', 'shipping', 'USPS', 'FedEx', 'UPS', 'scam'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'qr-code-phishing',
    title: 'QR Code Phishing (Quishing)',
    category: 'Phishing',
    severity: 'Medium',
    description: 'Malicious QR codes placed in public spaces or emails that direct users to phishing sites.',
    overview: 'QR Code Phishing, or "Quishing," involves attackers placing malicious QR codes on physical posters, parking meters, or within digital documents. Scanning the code directs the victim\'s smartphone to a fraudulent website designed to steal credentials or install malware.',
    howItWorks: [
      'Attacker generates a QR code linking to a malicious website.',
      'The QR code is distributed via email, physical mail, or placed over legitimate QR codes in public places (like parking meters or restaurant menus).',
      'Victim scans the QR code with their smartphone camera.',
      'The victim is directed to a phishing site or prompted to download a malicious app.',
      'Victim unknowingly enters credentials or installs malware on their device.'
    ],
    warningSigns: [
      'QR codes physically pasted as stickers over other signs or parking meters.',
      'Unexpected emails containing QR codes asking you to scan them to log in or view a document.',
      'Scanning a QR code that opens a shortened URL or an unfamiliar domain.',
      'A QR code that immediately prompts a file download.',
      'Poorly printed or suspicious-looking materials bearing a QR code.'
    ],
    protection: [
      'Inspect physical QR codes to ensure they aren\'t stickers placed over the original.',
      'Avoid scanning QR codes from unexpected or unknown emails.',
      'Use a QR scanner app or built-in camera feature that previews the URL before opening it.',
      'Never download apps directly from a QR code link; use official app stores.',
      'Treat QR codes with the same caution as embedded links in emails.'
    ],
    response: [
      'If you scan a code and it looks suspicious, close the browser immediately.',
      'If you entered credentials, change your password for that service right away.',
      'If you downloaded an app, delete it and run a security scan on your device.',
      'Report tampered public QR codes to the relevant business or authority.'
    ],
    keywords: ['quishing', 'QR code', 'mobile', 'scanning', 'fake website'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'ransomware-attacks',
    title: 'Ransomware Attacks',
    category: 'Ransomware',
    severity: 'Critical',
    description: 'Malware that encrypts your files or systems and demands payment for the decryption key.',
    overview: 'Ransomware is a severe type of malicious software that encrypts a victim\'s files, making them inaccessible. The attacker then demands a ransom payment, usually in cryptocurrency, in exchange for the decryption key. Some variants also steal data and threaten to publish it (double extortion).',
    howItWorks: [
      'Ransomware enters the system through a phishing email, malicious download, or exploited vulnerability.',
      'The malware quietly encrypts valuable files, documents, and system components.',
      'A ransom note is displayed on the screen, detailing how to pay the attacker to regain access.',
      'If the ransom is paid, the attacker may or may not provide the decryption key.',
      'If unpaid, data remains encrypted and may be permanently lost or publicly leaked.'
    ],
    warningSigns: [
      'Inability to open normal files (e.g., documents, photos).',
      'Files suddenly changing extensions to something unfamiliar (e.g., .encrypted, .locked).',
      'A prominent screen or text file demanding payment appearing on the desktop.',
      'Unexpected high disk activity or system slowdowns as files are encrypted.',
      'Security software being unexpectedly disabled.'
    ],
    protection: [
      'Maintain regular, secure, offline backups of all important data (the 3-2-1 rule).',
      'Keep your operating system and all software updated with the latest security patches.',
      'Use robust antivirus and anti-malware solutions.',
      'Avoid opening suspicious email attachments or clicking unknown links.',
      'Enable Multi-Factor Authentication (MFA) on all network access points.'
    ],
    response: [
      'Disconnect the infected device from the network immediately to prevent spreading.',
      'Do not pay the ransom, as it does not guarantee recovery and funds criminal activity.',
      'Report the incident to local law enforcement or cybersecurity authorities.',
      'Seek assistance from IT security professionals for containment and recovery.',
      'Restore systems from clean, offline backups once the environment is secured.'
    ],
    keywords: ['malware', 'encryption', 'extortion', 'backups', 'bitcoin', 'payment'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'infostealer-malware',
    title: 'Infostealer Malware',
    category: 'Malware',
    severity: 'High',
    description: 'Malware designed to silently gather sensitive information from the infected system.',
    overview: 'Information stealers (Infostealers) are a type of Trojan malware designed to secretly gather sensitive information from an infected computer. This includes saved browser passwords, cookies, cryptocurrency wallets, and system information, which are then sent back to the attacker.',
    howItWorks: [
      'Victim unknowingly downloads the infostealer, often disguised as cracked software, game cheats, or malicious email attachments.',
      'The malware executes silently in the background.',
      'It targets web browsers, extracting saved passwords, cookies, and autofill data.',
      'It searches the system for cryptocurrency wallet files and sensitive documents.',
      'The gathered data is packaged and transmitted to the attacker\'s command and control server.'
    ],
    warningSigns: [
      'Infostealers are designed to be stealthy, so there may be no obvious signs of infection.',
      'Unexpected logins to your online accounts from unknown locations.',
      'Unexplained loss of funds from cryptocurrency wallets.',
      'Your antivirus software detects a Trojan or suspicious activity.',
      'Slight system slowdowns or unexpected network activity.'
    ],
    protection: [
      'Avoid downloading pirated software, keygens, or game cheats.',
      'Use a dedicated password manager rather than saving passwords directly in your browser.',
      'Keep your antivirus software active and updated.',
      'Enable Multi-Factor Authentication (MFA) on all accounts to mitigate stolen passwords.',
      'Clear browser cookies regularly.'
    ],
    response: [
      'Run a full system scan with reputable antivirus software.',
      'If an infection is found, change all important passwords immediately from a different, clean device.',
      'Revoke active sessions for your online accounts.',
      'Monitor financial and social accounts for unauthorized activity.',
      'Consider reinstalling the operating system if you cannot ensure the malware is fully removed.'
    ],
    keywords: ['trojan', 'passwords', 'browser', 'cookies', 'stealer', 'crypto'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'account-takeover',
    title: 'Account Takeover (ATO)',
    category: 'Account Security',
    severity: 'High',
    description: 'When unauthorized individuals gain control of your online accounts.',
    overview: 'Account Takeover occurs when an attacker gains access to a user\'s account, typically through stolen credentials, brute force attacks, or session hijacking. Once in control, the attacker can steal personal data, make fraudulent purchases, or use the account to launch attacks against others.',
    howItWorks: [
      'Attacker obtains the victim\'s credentials through a data breach, phishing, or malware.',
      'Attacker logs into the victim\'s account.',
      'Attacker changes the password and recovery email to lock the legitimate user out.',
      'Attacker exploits the account (e.g., drains funds, sends spam to contacts, accesses linked services).',
      'Victim discovers they can no longer access their account.'
    ],
    warningSigns: [
      'Receiving password reset emails you didn\'t request.',
      'Notifications of logins from unfamiliar devices or locations.',
      'Changes to your account settings or profile information that you didn\'t make.',
      'Friends reporting strange messages sent from your account.',
      'Inability to log in with your correct password.'
    ],
    protection: [
      'Enable Multi-Factor Authentication (MFA) on every account that offers it.',
      'Use strong, unique passwords for every service.',
      'Use a password manager to securely store credentials.',
      'Regularly monitor your accounts for unusual activity.',
      'Protect your primary email account with the highest level of security.'
    ],
    response: [
      'Attempt to reset the password immediately using the "forgot password" feature.',
      'Contact the service provider\'s support team to report the compromise.',
      'Check account settings for any unauthorized changes (e.g., forwarding rules in email).',
      'Notify your contacts that your account was compromised so they don\'t fall for scams.',
      'Review linked accounts or financial information that may have been exposed.'
    ],
    keywords: ['ATO', 'hacked account', 'credentials', 'MFA', 'unauthorized access'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'public-wifi-attacks',
    title: 'Public Wi-Fi Attacks',
    category: 'Web Security',
    severity: 'Medium',
    description: 'Attackers intercepting data on unsecured public networks or setting up rogue hotspots.',
    overview: 'Public Wi-Fi networks in cafes, airports, and hotels are often unsecured. This allows attackers on the same network to intercept unencrypted data (Man-in-the-Middle attacks) or set up fake "rogue" hotspots designed to steal information from anyone who connects.',
    howItWorks: [
      'Victim connects to an open, unsecured public Wi-Fi network.',
      'An attacker on the same network uses software to capture unencrypted traffic passing through the air.',
      'Alternatively, the attacker sets up a fake hotspot named similarly to a legitimate one (e.g., "Starbucks_Guest_Free").',
      'Victim connects to the rogue hotspot, routing all their traffic through the attacker\'s device.',
      'Attacker harvests intercepted passwords, session cookies, or personal data.'
    ],
    warningSigns: [
      'Connecting to a network that doesn\'t require a password (open network).',
      'Seeing multiple networks with similar names in the same location.',
      'Browser warnings about insecure connections or invalid security certificates.',
      'Being prompted to install a "security certificate" or "update" to access the Wi-Fi.',
      'Unusually slow internet speeds.'
    ],
    protection: [
      'Use a Virtual Private Network (VPN) whenever connecting to public Wi-Fi to encrypt your traffic.',
      'Avoid logging into sensitive accounts (banking, email) on public networks without a VPN.',
      'Ensure websites use HTTPS (look for the padlock icon), though a VPN is still safer.',
      'Turn off automatic connection to open Wi-Fi networks on your devices.',
      'Use your smartphone\'s cellular data connection (hotspot) instead of public Wi-Fi when possible.'
    ],
    response: [
      'Disconnect from the suspicious Wi-Fi network immediately.',
      'If you logged into sensitive accounts without a VPN, change those passwords from a secure network.',
      'Clear your browser cookies and cache.',
      'Run a malware scan if you were prompted to download anything while connected.',
      'Forget the network in your device settings so it doesn\'t automatically reconnect.'
    ],
    keywords: ['hotspot', 'MitM', 'unsecured', 'VPN', 'interception', 'cafe', 'airport'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'malicious-browser-extensions',
    title: 'Malicious Browser Extensions',
    category: 'Web Security',
    severity: 'Medium',
    description: 'Add-ons that promise useful features but secretly track activity or inject adware.',
    overview: 'Malicious browser extensions masquerade as helpful tools (like PDF converters, coupon finders, or ad blockers) but are actually designed to track browsing history, inject unwanted advertisements, hijack search results, or steal sensitive information.',
    howItWorks: [
      'User installs an extension from a web store or third-party site to add functionality to their browser.',
      'The extension asks for broad permissions (e.g., "Read and change all your data on the websites you visit").',
      'Once installed, it operates in the background while the user browses.',
      'It monitors web traffic, steals session cookies, or injects affiliate links and ads into webpages.',
      'The extension may also prevent the user from accessing the browser\'s extension management page to uninstall it.'
    ],
    warningSigns: [
      'Sudden increase in pop-up ads or unexpected advertisements on legitimate websites.',
      'Your default search engine or homepage changes without your permission.',
      'Browser performance degrades significantly.',
      'You are redirected to unfamiliar websites when clicking standard links.',
      'Extensions requesting permissions that seem unnecessary for their stated purpose.'
    ],
    protection: [
      'Only install extensions from official browser web stores (e.g., Chrome Web Store).',
      'Even in official stores, read reviews and check the developer\'s reputation before installing.',
      'Minimize the number of extensions you use; fewer extensions mean less risk.',
      'Carefully review the permissions requested by an extension before approving the installation.',
      'Regularly audit your installed extensions and remove any you no longer use or don\'t recognize.'
    ],
    response: [
      'Navigate to your browser\'s extension management page and disable or uninstall the suspicious extension.',
      'If the browser prevents you from doing this, you may need to start the browser in "Safe Mode" or reset the browser settings.',
      'Run an anti-malware scan to ensure the extension didn\'t drop additional payloads.',
      'Change passwords for important accounts if you suspect the extension was logging keystrokes or stealing cookies.',
      'Report the malicious extension to the browser\'s web store.'
    ],
    keywords: ['add-on', 'plugin', 'chrome', 'adware', 'tracking', 'hijacking'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'fake-software-downloads',
    title: 'Fake Software Downloads',
    category: 'Malware',
    severity: 'High',
    description: 'Malware disguised as legitimate software, often distributed through deceptive search ads or torrents.',
    overview: 'Attackers create fake websites or use malicious search engine advertisements to distribute malware disguised as popular, legitimate software (e.g., web browsers, media players, or productivity tools). Users intending to download safe software inadvertently install malware.',
    howItWorks: [
      'Attacker purchases sponsored ads on search engines for keywords related to popular software.',
      'User searches for the software and clicks the top sponsored link, which looks legitimate.',
      'User is directed to a lookalike website and downloads the installation file.',
      'The installation file contains the requested software bundled with malware, or is entirely malware.',
      'User installs the file, infecting their system with spyware, ransomware, or infostealers.'
    ],
    warningSigns: [
      'Downloading software from a site other than the official developer\'s website.',
      'Search engine results marked as "Sponsored" or "Ad" pointing to unfamiliar domains.',
      'Installation files that are much smaller than expected or have strange file extensions.',
      'Security warnings from your operating system or browser when attempting to download or run the file.',
      'The software installer asks to install additional "special offers" or toolbars.'
    ],
    protection: [
      'Always download software directly from the official developer\'s website or your OS\'s official app store.',
      'Be wary of sponsored search results when looking for software downloads.',
      'Use an ad blocker to reduce the risk of clicking malicious advertisements.',
      'Never download pirated software, keygens, or cracks, as these are heavily bundled with malware.',
      'Keep your antivirus software active to scan files as they are downloaded.'
    ],
    response: [
      'Cancel the installation immediately if you notice suspicious behavior or bundled offers.',
      'If installed, uninstall the software through your operating system\'s control panel.',
      'Run a full system scan with a reputable antivirus program.',
      'If malware is detected, follow the antivirus prompts to quarantine or remove it.',
      'Monitor your system for unusual behavior and change important passwords if you suspect an infostealer.'
    ],
    keywords: ['trojan', 'malvertising', 'downloads', 'piracy', 'freeware', 'bundled software'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'social-engineering-scams',
    title: 'Social Engineering Scams',
    category: 'Social Engineering',
    severity: 'Medium',
    description: 'Psychological manipulation tactics used to trick people into revealing information or sending money.',
    overview: 'Social engineering encompasses various scams that exploit human psychology—trust, fear, urgency, or helpfulness—rather than technical vulnerabilities. Examples include tech support scams, romance scams, and CEO fraud (Business Email Compromise).',
    howItWorks: [
      'Attacker initiates contact via phone, email, or social media, establishing a false pretext.',
      'Attacker builds trust or creates a sense of urgency (e.g., claiming a computer is infected or a loved one is in trouble).',
      'Attacker requests sensitive information, access to a computer, or payment (often via gift cards or wire transfer).',
      'Victim, acting under emotional pressure or a desire to help, complies with the request.',
      'Attacker disappears with the funds or uses the information for further exploitation.'
    ],
    warningSigns: [
      'Unsolicited calls claiming to be from tech support (e.g., Microsoft or Apple) warning of a virus.',
      'Requests for payment using unconventional methods like gift cards, cryptocurrency, or wire transfers.',
      'Messages from a "boss" or "executive" urgently requesting a wire transfer or gift cards, often bypassing normal procedures.',
      'Online acquaintances expressing strong romantic feelings quickly but continually making excuses to avoid video calls or meeting in person.',
      'Situations that demand immediate action and insist on secrecy.'
    ],
    protection: [
      'Maintain a healthy level of skepticism regarding unsolicited communications.',
      'Verify the identity of the person contacting you through an independent channel (e.g., calling the company\'s official number).',
      'Never give remote access to your computer to an unsolicited caller.',
      'Understand that legitimate organizations will not demand payment via gift cards.',
      'Follow established verification procedures for financial transactions at work.'
    ],
    response: [
      'Terminate the communication immediately (hang up the phone, delete the email).',
      'If you provided payment, contact your bank or the gift card issuer immediately to report the fraud.',
      'If you granted remote access, disconnect your computer from the internet and run a malware scan.',
      'Report the scam to relevant authorities (e.g., FTC, local law enforcement).',
      'If it was a work-related scam, notify your IT or security department immediately.'
    ],
    keywords: ['scam', 'manipulation', 'tech support', 'gift cards', 'impersonation', 'fraud'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'data-breach-exposure',
    title: 'Data Breach Exposure',
    category: 'Data Breach',
    severity: 'High',
    description: 'The risks and necessary actions when a company you use suffers a data compromise.',
    overview: 'A data breach occurs when cybercriminals successfully infiltrate a company\'s database and steal sensitive user information. This can include emails, passwords, credit card numbers, and personal details. Even if your personal security is strong, you are at risk when services you use are compromised.',
    howItWorks: [
      'Attackers exploit a vulnerability in a company\'s network or application.',
      'They access and exfiltrate databases containing customer information.',
      'The stolen data is often sold on dark web marketplaces.',
      'Other criminals purchase this data to launch targeted phishing attacks, commit identity theft, or attempt credential stuffing attacks on other websites.',
      'The compromised company eventually detects the breach and notifies users.'
    ],
    warningSigns: [
      'Receiving an official notification from a company that your data was involved in a breach.',
      'Finding your email address listed on breach notification services like "Have I Been Pwned".',
      'Unexpected login attempts on your accounts.',
      'Receiving highly personalized phishing emails referencing information only that company would know.',
      'Unexplained charges on your credit card.'
    ],
    protection: [
      'Use unique, strong passwords for every single online account.',
      'Use a password manager to keep track of these unique passwords.',
      'Enable Multi-Factor Authentication (MFA) to protect accounts even if the password is stolen.',
      'Provide only the minimum necessary personal information when signing up for services.',
      'Monitor your credit reports regularly for signs of identity theft.'
    ],
    response: [
      'Immediately change the password for the breached account.',
      'If you reused that password anywhere else, change it on those accounts as well.',
      'If financial information was exposed, contact your bank and monitor your statements.',
      'Consider placing a fraud alert or credit freeze on your credit file.',
      'Be on high alert for phishing emails related to the breached service.'
    ],
    keywords: ['breach', 'leak', 'exposed data', 'identity theft', 'dark web', 'credential stuffing'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  },
  {
    id: 'mobile-banking-scams',
    title: 'Mobile Banking Scams',
    category: 'Mobile Security',
    severity: 'High',
    description: 'Fraudulent schemes targeting mobile banking users via fake apps or deceptive alerts.',
    overview: 'As mobile banking usage increases, attackers target users with scams designed to steal login credentials or intercept funds. This includes fake banking apps, SMS alerts about compromised accounts, and scams involving peer-to-peer payment apps (like Zelle or Venmo).',
    howItWorks: [
      'Attacker sends an SMS warning of a "fraudulent charge" and asks the user to reply or click a link.',
      'The link leads to a fake login page where the user enters their banking credentials.',
      'Alternatively, the attacker calls the victim, pretending to be bank fraud prevention, and asks them to "verify" their identity by reading back a security code (which the attacker is actually using to log in or authorize a transfer).',
      'Attacker gains access to the account or convinces the victim to transfer funds directly.',
      'The victim loses funds, often with limited recourse for peer-to-peer transfers.'
    ],
    warningSigns: [
      'Urgent text messages from your bank containing a link.',
      'Callers claiming to be from your bank who ask for your password, PIN, or MFA code.',
      'Requests to send money to yourself or a "safe account" to reverse a fraudulent charge.',
      'Apps in the app store that look like your bank\'s app but have few reviews or an unknown developer.',
      'Unexpected requests for money from friends or family via payment apps (their account may be compromised).'
    ],
    protection: [
      'Never click links in text messages regarding your bank account; log in via the official app instead.',
      'Understand that your bank will NEVER call or text you and ask for your password, PIN, or MFA code.',
      'Only download banking apps from the official Apple App Store or Google Play Store.',
      'Treat peer-to-peer payment apps like cash; only send money to people you know and trust.',
      'Enable notifications for all transactions on your bank account.'
    ],
    response: [
      'If you suspect a scam call, hang up and dial the number on the back of your bank card.',
      'If you clicked a malicious link and entered credentials, contact your bank\'s fraud department immediately.',
      'Change your banking password and ensure MFA is enabled.',
      'If you sent money via a payment app under fraudulent pretenses, report it to the app\'s support team, though recovery is not guaranteed.',
      'File a report with relevant authorities.'
    ],
    keywords: ['banking', 'fraud', 'Zelle', 'Venmo', 'SMS', 'MFA code', 'fake app'],
    publishedDate: 'Recent',
    status: 'Awareness Topic'
  }
];
