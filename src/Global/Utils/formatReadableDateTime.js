export function formatReadableDateTime(isoString) {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Oct"
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}${ordinal} ${month}, ${year}, ${time}`;
}
