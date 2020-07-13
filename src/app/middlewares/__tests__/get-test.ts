import { dateTimeToTime } from "../get";

describe("dateTimeToTime", () => {
  it("変換できる", () => {
    expect(dateTimeToTime(new Date("2000-05-17T11:45:00.000Z"))).toBe(
      "11:45:00",
    );
  });
});
