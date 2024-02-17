export default function sortArrayByOrder(arr: any[]) {
  return arr.sort((a, b) => a.order! - b.order!);
}
