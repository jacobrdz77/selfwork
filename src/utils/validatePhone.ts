const validatePhone = (number: string) => {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(number);
};

export default validatePhone;
