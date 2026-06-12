const IST_TIME_ZONE = "Asia/Kolkata";

function toValidDate(value) {
  if (!value) return null;

  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return { year, month, day };
}

function formatMonthParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;

  return { year, month };
}

function createIstBoundaryDate(year, month, day, timeFragment) {
  return new Date(`${year}-${month}-${day}T${timeFragment}+05:30`);
}

export function formatDate(value) {
  const date = toValidDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value) {
  const date = toValidDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatRelativeTime(value) {
  const date = toValidDate(value);
  if (!date) return "";

  const diffMs = date.getTime() - Date.now();
  const absDiff = Math.abs(diffMs);
  const minuteMs = 1000 * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;
  const formatter = new Intl.RelativeTimeFormat("en-IN", { numeric: "auto" });

  if (absDiff < hourMs) {
    return formatter.format(Math.round(diffMs / minuteMs), "minute");
  }

  if (absDiff < dayMs) {
    return formatter.format(Math.round(diffMs / hourMs), "hour");
  }

  return formatter.format(Math.round(diffMs / dayMs), "day");
}

export function formatDateForInput(value) {
  const date = toValidDate(value);
  if (!date) return "";

  const { year, month, day } = formatDateParts(date);
  return `${year}-${month}-${day}`;
}

export function getTodayDateValue() {
  return formatDateForInput(new Date());
}

export function getCurrentYear() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
  }).format(new Date());
}

export function getIstDateKey(value) {
  const date = toValidDate(value);
  if (!date) return "";

  const { year, month, day } = formatDateParts(date);
  return `${year}-${month}-${day}`;
}

export function getIstMonthKey(value) {
  const date = toValidDate(value);
  if (!date) return "";

  const { year, month } = formatMonthParts(date);
  return `${year}-${month}`;
}

export function getIstMonthBounds(value) {
  const date = toValidDate(value);
  if (!date) {
    return { start: null, end: null };
  }

  const { year, month } = formatMonthParts(date);
  const monthNumber = Number(month);
  const yearNumber = Number(year);
  const start = createIstBoundaryDate(year, month, "01", "00:00:00.000");
  const nextMonthNumber = monthNumber === 12 ? 1 : monthNumber + 1;
  const nextYearNumber = monthNumber === 12 ? yearNumber + 1 : yearNumber;
  const nextMonth = String(nextMonthNumber).padStart(2, "0");
  const nextYear = String(nextYearNumber);
  const end = createIstBoundaryDate(nextYear, nextMonth, "01", "00:00:00.000");

  return { start, end };
}