export const toLocalDateTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, 16);
  return localISO;
};
