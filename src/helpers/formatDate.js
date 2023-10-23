import moment from "moment";

const createDatesArr = (_val) => {
  const val = moment(_val);
  const arr = [val.format("YYYY-MM-DD")];
  for (let i = 0; i < 12; i++) {
    arr.push(val.add(1, "months").format("YYYY-MM-DD"));
  }
  const dates = arr
    .map((a, b) => !!arr[b + 1] && `${a}..${arr[b + 1]}`, [])
    .filter((val) => !!val);
  const months = arr.map((val) => moment(val).format("MMM"));

  return { dates, months };
};
export default createDatesArr;
