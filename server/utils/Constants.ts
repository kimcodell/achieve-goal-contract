export const HttpStatus = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

export const TransactionJobName = Object.freeze({
  DISTRIBUTE_TOKEN: "인증 실패 - 토큰 분배",
  EXCHANGE_TOKEN_TO_MONEY: "환전 - 토큰 환전",
  EXCAHNGE_MONEY_TO_TOKEN: "환전 - 토큰 구매",
});
