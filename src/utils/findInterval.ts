const findInterval = (numberOne: number, numberTwo: number): number[] => {
  // returns [least, greatest]
  if (numberOne > numberTwo) {
    return [numberTwo, numberOne];
  } else {
    return [numberOne, numberTwo];
  }
};

export default findInterval;
