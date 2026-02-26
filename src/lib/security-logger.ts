type SecurityEvent =
  | "form_submission"
  | "validation_failure"
  | "rate_limit_hit"
  | "honeypot_triggered"
  | "redis_failure";

type Severity = "info" | "warn" | "error";

const EVENT_SEVERITY: Record<SecurityEvent, Severity> = {
  form_submission: "info",
  validation_failure: "warn",
  rate_limit_hit: "warn",
  honeypot_triggered: "warn",
  redis_failure: "error",
};

interface SecurityLog {
  event: SecurityEvent;
  level: Severity;
  timestamp: string;
  ip?: string;
  details?: Record<string, unknown>;
}

export function logSecurityEvent(
  event: SecurityEvent,
  ip?: string,
  details?: Record<string, unknown>
): void {
  const level = EVENT_SEVERITY[event];
  const log: SecurityLog = {
    event,
    level,
    timestamp: new Date().toISOString(),
    ip: ip ?? "unknown",
    details,
  };

  const message = JSON.stringify(log);

  if (level === "error") {
    console.error(message);
  } else if (level === "warn") {
    console.warn(message);
  } else {
    console.log(message);
  }
}
