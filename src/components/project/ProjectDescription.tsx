import { useUpdateProject } from "@/hooks/ProjectHooks";
import React, { useEffect, useState } from "react";

const ProjectDescription = ({
  projectId,
  initialDescription,
}: {
  projectId: string;
  initialDescription: string;
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [oldDescription, setOldDescription] = useState(initialDescription);
  const { mutate: updateProject } = useUpdateProject();

  const blurHandler = () => {
    if (oldDescription.trim() === description.trim()) {
      // console.log("NOPE");
      return;
    }
    updateProject({ projectId, projectData: { description } });
  };

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  return (
    <textarea
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      onBlur={blurHandler}
      value={description}
      className="description-textarea"
      name="description"
      placeholder="You're description goes here!"
    />
  );
};

export default ProjectDescription;
