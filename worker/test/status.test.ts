import { describe, expect, it } from "vitest";
import { buildStatus } from "../src/index";

describe("buildStatus", () => {
  const now = new Date("2026-10-23T10:00:00Z");

  it("marks every feed stale when no upstream time exists", () => {
    const s = buildStatus(now, { fire: null, rain: null, weather: null });
    expect(s.generated_at).toBe("2026-10-23T10:00:00.000Z");
    expect(Object.values(s.feeds).every((f) => f.stale)).toBe(true);
  });

  it("marks a feed fresh inside its threshold and stale outside it", () => {
    const s = buildStatus(now, {
      fire: new Date("2026-10-23T05:00:00Z"),
      rain: new Date("2026-10-22T20:00:00Z"),
      weather: new Date("2026-10-22T09:00:00Z"),
    });
    expect(s.feeds.fire.stale).toBe(false);
    expect(s.feeds.rain.stale).toBe(true);
    expect(s.feeds.weather.stale).toBe(true);
  });
});
