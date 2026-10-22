import { describe, expect, it } from "vitest";
import { buildStatus } from "../src/status.js";

const staleHours = { fire: 6, rain: 12, weather: 24 };

describe("buildStatus", () => {
  const now = new Date("2026-10-23T10:00:00Z");

  it("marks every feed stale when no upstream time exists", () => {
    const s = buildStatus(now, staleHours, { fire: null, rain: null, weather: null });
    expect(s.generated_at).toBe("2026-10-23T10:00:00.000Z");
    expect(Object.values(s.feeds).every((f) => f.stale)).toBe(true);
  });

  it("marks a feed fresh inside its threshold and stale outside it", () => {
    const s = buildStatus(now, staleHours, {
      fire: new Date("2026-10-23T05:00:00Z"),
      rain: new Date("2026-10-22T20:00:00Z"),
      weather: new Date("2026-10-22T09:00:00Z"),
    });
    expect(s.feeds.fire.stale).toBe(false);
    expect(s.feeds.rain.stale).toBe(true);
    expect(s.feeds.weather.stale).toBe(true);
  });

  it("refuses a feed with no upstream time entry", () => {
    expect(() => buildStatus(now, staleHours, { fire: null, rain: null })).toThrow(/weather/);
  });
});
