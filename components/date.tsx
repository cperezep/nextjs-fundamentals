import { parseISO, format } from "date-fns";

type DateProps = {
  dateString: string;
};

function Date({ dateString }: DateProps) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}

export default Date;
