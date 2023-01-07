import React from "react";
import Button from "../ui/Button";

const NoProjects: React.FC<{ buttonHandler: () => void }> = ({
  buttonHandler,
}) => {
  return (
    <div className="no-data">
      <div>
        <h1>No projects</h1>
        <p>There are no projects. Create one!</p>
      </div>
      <Button
        className="button--blue no-data__button"
        buttonHandler={buttonHandler}
      >
        Add Project
      </Button>
    </div>
  );
};

export default NoProjects;
