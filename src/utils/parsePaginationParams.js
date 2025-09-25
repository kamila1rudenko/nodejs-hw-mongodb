function parseNumber(value, def) {
  if (typeof value === 'undefined') return def;
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return def;
  return parsed;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
