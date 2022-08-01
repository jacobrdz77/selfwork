interface Project {}

export const getProjects = async () => {
  return fetch("api/projects").then((res) => res.json());
};
