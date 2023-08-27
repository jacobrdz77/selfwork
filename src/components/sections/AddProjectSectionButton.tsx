import {
  useCreateProjectSection
} from "@/hooks/SectionHooks";

const AddProjectSectionButton = ({
  projectId,
  sectionsLength,
}: {
  projectId: string;
  sectionsLength: number;
}) => {
  const { mutate } = useCreateProjectSection(projectId);
  const addNewSectionHandler = () => {
    mutate({ name: "Untitled Section", order: sectionsLength });
  };

  return (
    <button className="new-section" onClick={addNewSectionHandler}>
      <div className="new-section__add new-section__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="new-section__icon"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>Add Section</div>
    </button>
  );
};

export default AddProjectSectionButton;
