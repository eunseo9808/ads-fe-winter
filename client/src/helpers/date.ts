export const getTodayDateString = () => {
  const today = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hour = ("0" + today.getHours()).slice(-2);
  const minute = ("0" + today.getMinutes()).slice(-2);

  return `${today.getFullYear()}_${month}_${day}_${hour}_${minute}`;
};
