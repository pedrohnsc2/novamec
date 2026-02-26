import { describe, it, expect, vi } from "vitest";
import { logSecurityEvent } from "@/lib/security-logger";

describe("logSecurityEvent", () => {
  it("logs form_submission with level info via console.log", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    logSecurityEvent("form_submission", "192.168.1.1", {
      service: "Revisão",
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("form_submission");
    expect(logOutput.level).toBe("info");
    expect(logOutput.ip).toBe("192.168.1.1");
    expect(logOutput.details).toEqual({ service: "Revisão" });
    expect(logOutput.timestamp).toBeDefined();

    consoleSpy.mockRestore();
  });

  it("logs rate_limit_hit with level warn via console.warn", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    logSecurityEvent("rate_limit_hit");

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("rate_limit_hit");
    expect(logOutput.level).toBe("warn");
    expect(logOutput.ip).toBe("unknown");

    consoleSpy.mockRestore();
  });

  it("logs honeypot_triggered with level warn via console.warn", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    logSecurityEvent("honeypot_triggered", "10.0.0.1", {
      honeypotValue: "spam",
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("honeypot_triggered");
    expect(logOutput.level).toBe("warn");
    expect(logOutput.details?.honeypotValue).toBe("spam");

    consoleSpy.mockRestore();
  });

  it("logs validation_failure with level warn via console.warn", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    logSecurityEvent("validation_failure", "10.0.0.2", {
      errors: { name: ["Required"] },
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("validation_failure");
    expect(logOutput.level).toBe("warn");

    consoleSpy.mockRestore();
  });

  it("logs redis_failure with level error via console.error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    logSecurityEvent("redis_failure", "10.0.0.3", {
      error: "Connection refused",
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(logOutput.event).toBe("redis_failure");
    expect(logOutput.level).toBe("error");
    expect(logOutput.details?.error).toBe("Connection refused");

    consoleSpy.mockRestore();
  });
});
