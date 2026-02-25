type SecurityEvent =
  | "form_submission"
  | "validation_failure"
  | "rate_limit_hit"
  | "honeypot_triggered";

interface SecurityLog {
  event: SecurityEvent;
  timestamp: string;
  ip?: string;
  details?: Record<string, unknown>;
}

export function logSecurityEvent(
  event: SecurityEvent,
  ip?: string,
  details?: Record<string, unknown>
): void {
  const log: SecurityLog = {
    event,
    timestamp: new Date().toISOString(),
    ip: ip ?? "unknown",
    details,
  };

  console.log(JSON.stringify(log));
}
