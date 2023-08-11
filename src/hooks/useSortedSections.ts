import { useState, useEffect } from "react";
import sortSections from "@/utils/sortSections";
import { SectionWithTasks } from "@/types/types";

const useSortedSections = (sections: SectionWithTasks[]) => {
  const [sortedSections, setSortedSections] = useState(sortSections(sections));

  useEffect(() => {
    setSortedSections(sortSections(sections));
  }, [sections]);

  return { sortedSections, setSortedSections };
};

export default useSortedSections;
