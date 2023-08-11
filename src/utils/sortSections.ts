import { SectionWithTasks } from "@/types/types";

export default function sortArray(arr: any[]) {
  return arr.sort((a, b) => a.order! - b.order!);
}
