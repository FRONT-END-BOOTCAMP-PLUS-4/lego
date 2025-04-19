export function formatNumber(num: number) {
  return num.toLocaleString("ko-KR", {
    maximumFractionDigits: 0,
  });
}
