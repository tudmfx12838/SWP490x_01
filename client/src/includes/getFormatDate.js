export default function getFormatDate(date) {
  var date_obj = new Date(date);
  var day =
  date_obj.getDate() < 10 ? "0" + date_obj.getDate() : date_obj.getDate();
  var month =
  date_obj.getMonth() + 1 < 10
      ? "0" + (date_obj.getMonth() + 1)
      : date_obj.getMonth() + 1;
  var formattedDate = date_obj.getFullYear() + "-" + month + "-" + day;
  return formattedDate;
}
