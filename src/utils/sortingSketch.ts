export const sortSketchByEditedDate = (array: any[]) => {
  return array.sort((a, b) => {
    return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
  });
};

export const sortSketchByName = (array: any[]) => {
  return array.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};
