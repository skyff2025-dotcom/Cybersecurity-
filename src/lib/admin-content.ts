import { INITIAL_ALERTS } from '../data/alerts';
import { INITIAL_COURSES } from '../data/courses';
import { INITIAL_QUIZZES } from '../data/quizzes';
import { INITIAL_THREATS } from '../data/threats';

export function getCourses() {
  const stored = localStorage.getItem('cyberaware_courses');
  return stored ? JSON.parse(stored) : INITIAL_COURSES;
}

export function saveCourses(courses: any) {
  localStorage.setItem('cyberaware_courses', JSON.stringify(courses));
}

export function getQuizzes() {
  const stored = localStorage.getItem('cyberaware_quizzes');
  return stored ? JSON.parse(stored) : INITIAL_QUIZZES;
}

export function saveQuizzes(quizzes: any) {
  localStorage.setItem('cyberaware_quizzes', JSON.stringify(quizzes));
}

export function getThreats() {
  const stored = localStorage.getItem('cyberaware_threats');
  return stored ? JSON.parse(stored) : INITIAL_THREATS;
}

export function saveThreats(threats: any) {
  localStorage.setItem('cyberaware_threats', JSON.stringify(threats));
}

export function getAlerts() {
  const stored = localStorage.getItem('cyberaware_alerts');
  return stored ? JSON.parse(stored) : INITIAL_ALERTS;
}

export function saveAlerts(alerts: any) {
  localStorage.setItem('cyberaware_alerts', JSON.stringify(alerts));
}
