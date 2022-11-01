import dayjs from "dayjs";

export function formatDate(date: string, format: string = 'YYYY월 MM월 DD일 HH:mm') {
  return dayjs(date).format(format)
}

export function formatMoney(price: string | number) {
  const _price = String(price);
  return _price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
}