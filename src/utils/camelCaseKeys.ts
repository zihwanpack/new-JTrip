function toCamelCase(str: string): string {
  return str.replace(/_([a-zA-Z])/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export function camelCaseKeys<T>(input: T): T {
  // 배열 처리
  if (Array.isArray(input)) {
    return input.map((item) =>
      typeof item === 'object' && item !== null ? camelCaseKeys(item) : item
    ) as unknown as T;
  }

  // null이나 primitive면 그대로 반환
  if (input === null || typeof input !== 'object') {
    return input;
  }

  const obj = input as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const camelKey = toCamelCase(key);
    const value = obj[key];

    if (value instanceof Date) {
      result[camelKey] = value;
      continue;
    }

    if (Array.isArray(value)) {
      result[camelKey] = value.map((v) =>
        typeof v === 'object' && v !== null ? camelCaseKeys(v) : v
      );
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      result[camelKey] = camelCaseKeys(value);
      continue;
    }

    result[camelKey] = value;
  }

  return result as T;
}
