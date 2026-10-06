import { getProgress, saveProgress, CertificateData, addActivity } from './progress';
import { getCourses } from '../lib/admin-content';

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCertificate(courseId: string): CertificateData | null {
  const currentProgress = getProgress();
  
  // Check if already exists
  const existing = currentProgress.certificates.find((c: CertificateData) => c.courseId === courseId);
  if (existing) {
    return existing;
  }

  const course = getCourses().find(c => c.id === courseId);
  if (!course) return null;

  // Verify completion
  const completedInCourse = currentProgress.completedLessonIds.filter(id => id.startsWith(`${courseId}-`)).length;
  if (completedInCourse < course.lessons.length) {
    return null; // Not completed
  }

  const certificateNumber = `CA-${new Date().getFullYear()}-CYB-${generateRandomString(6)}`;
  const verificationCode = `CW-${generateRandomString(4)}-${generateRandomString(4)}`;

  const newCertificate: CertificateData = {
    id: Date.now().toString() + '-' + generateRandomString(4),
    courseId,
    courseTitle: course.title,
    learnerName: "Cyber Learner",
    issueDate: new Date().toISOString(),
    certificateNumber,
    completionPercentage: 100,
    totalLessons: course.lessons.length,
    completedLessons: course.lessons.length,
    verificationCode
  };

  const updatedCertificates = [...currentProgress.certificates, newCertificate];
  saveProgress({ certificates: updatedCertificates });
  
  // Checking achievements will happen in addActivity
  addActivity('achievement', `Earned certificate for ${course.title}`);

  return newCertificate;
}
