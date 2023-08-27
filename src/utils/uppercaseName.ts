export const upperCaseName = (name: string) => {
  const fullName = name.split(" ");
  const firstName = fullName[0];
  const lastName = fullName[1];
  const firstLetterFirstName = fullName[0][0].toUpperCase();
  const restFirstName = firstName.slice(1);
  const secondLetter = fullName[1][0].toUpperCase();
  const restSecondName = lastName.slice(1);
  return `${firstLetterFirstName + restFirstName} ${
    secondLetter + restSecondName
  }`;
};
