export type Params = {
  year: string;
  month: string;
  date: string;
};

export const isValidParams = (params: unknown): params is Params => {
  if (typeof params !== "object" || params === null) {
    return false;
  }
  return "year" in params && "month" in params && "date" in params;
};
