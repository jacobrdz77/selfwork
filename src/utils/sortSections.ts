import { SectionWithTasks } from "@/types/types";

export default function sortSections(sections: SectionWithTasks[]) {
  return sections.sort((a, b) => a.order! - b.order!);
}
