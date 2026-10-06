export interface AlertActivity {
  alertId: string;
  viewedAt: string;
  read: boolean;
}

export function getAlertActivity(): Record<string, AlertActivity> {
  const stored = localStorage.getItem('cyberaware_alert_activity');
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    return {};
  }
}

export function markAlertAsRead(alertId: string) {
  const activity = getAlertActivity();
  if (!activity[alertId]) {
    activity[alertId] = {
      alertId,
      viewedAt: new Date().toISOString(),
      read: true
    };
    localStorage.setItem('cyberaware_alert_activity', JSON.stringify(activity));
  }
}

export function isAlertRead(alertId: string): boolean {
  const activity = getAlertActivity();
  return !!activity[alertId]?.read;
}
