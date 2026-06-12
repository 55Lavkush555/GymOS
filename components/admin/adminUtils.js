export function getSubscriptionStatus(planEndDate) {
  const expiry = new Date(planEndDate);

  if (Number.isNaN(expiry.getTime())) {
    return "expired";
  }

  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(diffMs / dayMs);

  if (diffMs < 0) {
    return "expired";
  }

  if (daysLeft <= 7) {
    return "expiring_soon";
  }

  return "active";
}

export function getInitials(name) {
  if (!name) return "NA";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}