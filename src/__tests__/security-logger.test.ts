import { describe, it, expect, vi } from "vitest";
import { logSecurityEvent } from "@/lib/security-logger";

describe("logSecurityEvent", () => {
  it("logs event with correct JSON format", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logSecurityEvent("form_submission", "192.168.1.1", {
      service: "Revisão",
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("form_submission");
    expect(logOutput.ip).toBe("192.168.1.1");
    expect(logOutput.details).toEqual({ service: "Revisão" });
    expect(logOutput.timestamp).toBeDefined();

    consoleSpy.mockRestore();
  });

  it("logs with unknown IP when not provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logSecurityEvent("rate_limit_hit");

    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.ip).toBe("unknown");

    consoleSpy.mockRestore();
  });

  it("logs honeypot_triggered event", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logSecurityEvent("honeypot_triggered", "10.0.0.1", {
      honeypotValue: "spam",
    });

    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("honeypot_triggered");
    expect(logOutput.details?.honeypotValue).toBe("spam");

    consoleSpy.mockRestore();
  });

  it("logs validation_failure event", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logSecurityEvent("validation_failure", "10.0.0.2", {
      errors: { name: ["Required"] },
    });

    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("validation_failure");

    consoleSpy.mockRestore();
  });
});
