export function formatWithCommas(num: number | string): string {
  const parsed =
    typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num;
  if (isNaN(parsed)) return "0";
  return new Intl.NumberFormat("en-US").format(parsed);
}
