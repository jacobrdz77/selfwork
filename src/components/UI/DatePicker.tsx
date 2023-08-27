import ReactDatePicker from "react-datepicker";

const DatePicker = ({
  // date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  return (
    <ReactDatePicker
      placeholderText="Select Date"
      onChange={(date) => {
        setDate(date!);
      }}
    />
  );
};

export default DatePicker;
