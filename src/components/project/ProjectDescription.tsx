import { useUpdateProject } from "@/hooks/ProjectHooks";
import React, { useState } from "react";

const ProjectDescription = ({
  projectId,
  initialDescription,
}: {
  projectId: string;
  initialDescription: string;
}) => {
  const [description, setDescription] = useState(
    initialDescription ? initialDescription : ""
  );
  const [oldDescription, setOldDescription] = useState(
    initialDescription ? initialDescription : ""
  );
  const { mutate: updateProject } = useUpdateProject();
  console.log("Projectid: ", projectId);

  const blurHandler = () => {
    if (oldDescription.trim() === description.trim()) {
      console.log("NOPE");
      return;
    }
    updateProject({ projectId, projectData: { description } });
  };

  return (
    <textarea
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      onBlur={blurHandler}
      value={description ? description : ""}
      className="description-textarea"
      name="description"
      placeholder="You're description goes here!"
    ></textarea>
  );
};

export default ProjectDescription;
