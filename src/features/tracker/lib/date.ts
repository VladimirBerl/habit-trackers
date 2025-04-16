export const formatDayMonth = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month}`;
};

export const getDateKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};
