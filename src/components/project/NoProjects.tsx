import React from "react";
import Button from "../ui/Button";

const NoProjects: React.FC<{ buttonHandler: () => void }> = ({
  buttonHandler,
}) => {
  return (
    <div>
      <div>
        <h1>No Projects</h1>
        <p>There are currently no projects set up yet</p>
      </div>
      <Button buttonHandler={buttonHandler}>Add Project</Button>
    </div>
  );
};

export default NoProjects;
