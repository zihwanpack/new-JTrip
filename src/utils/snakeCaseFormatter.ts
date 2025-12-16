const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
};
export const snakeCaseKeys = <T>(input: unknown): T => {
  if (Array.isArray(input)) {
    return input.map((item) => snakeCaseKeys(item)) as T;
  }

  if (input === null || typeof input !== 'object' || input instanceof Date) {
    return input as T;
  }

  const obj = input as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const snakeKey = toSnakeCase(key);
    const value = obj[key];

    result[snakeKey] = snakeCaseKeys(value);
  }

  return result as T;
};
