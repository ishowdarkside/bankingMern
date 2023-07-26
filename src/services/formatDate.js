import { getMonths } from "./getMonths";
export function formatDate(date) {
  const months = getMonths();
  const formatDate = `${months[new Date(date).getMonth()]} ${new Date(
    date
  ).getDate()} ${new Date(date).getFullYear()}`;

  return formatDate;
}
