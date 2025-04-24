export const formatDate = (dateString) => {
  if (!dateString) return "No date provided";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date format";
  return date.toLocaleDateString();
};

export const formatDateTime = (dateStr) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date(dateStr)); // dd/MM/yyyy HH:mm:ss

// Helper function to convert "HH:mm" to Date object for today
export const toTodayTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
