export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // 'Nov'
  const year = date.getFullYear();

  const getDaySuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month}, ${year}`;
};

// "Wed, April 25th 2025"; format
export const formatDateWithOrdinal = (dateStr: string): string => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  return `${weekday}, ${month} ${day}${ordinal} ${year}`;
  // Example:
  // const createdAt = "2025-04-18T19:15:10.947+00:00";
  // console.log(formatDateWithOrdinal(createdAt));
  // Output: "Fri, April 18th 2025"
};

export const getMonth = (createdAt: string) => {
  const monthName = new Date(createdAt).toLocaleString('default', { month: 'long' });
  return monthName
}

export const getRelativeTime = (dateStr: string): string => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const past = new Date(dateStr);
  const diffInSeconds = Math.floor((past.getTime() - now.getTime()) / 1000);

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60 * 60, "minute"],
    [60 * 60 * 24, "hour"],
    [60 * 60 * 24 * 7, "day"],
    [60 * 60 * 24 * 30, "week"],
    [60 * 60 * 24 * 365, "month"],
    [Infinity, "year"],
  ];

  for (let i = 0; i < intervals.length; i++) {
    const [threshold, unit] = intervals[i];
    const nextThreshold = intervals[i + 1]?.[0] ?? Infinity;

    if (Math.abs(diffInSeconds) < nextThreshold) {
      const value = Math.round(diffInSeconds / threshold);
      return rtf.format(value, unit);
    }
  }

  return "just now";
  // Example:
  // const lastUpdated = "2025-04-01T20:11:54.043+00:00";
  // console.log(getRelativeTime(lastUpdated));
  // Output: "in 11 months" or "2 weeks ago" (depending on current date)
};

export const formatFullDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const day = date.getDate();
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  return `${hours}:${minutes}, ${month} ${day}${ordinal} ${year}`;
  // Example usage:
  const timestamp = "2025-04-07T12:13:00.000Z";
  console.log(formatFullDateTime(timestamp));
  // Output: "12:13, April 7th 2025"
};
