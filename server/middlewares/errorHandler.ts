import { HttpStatus } from "./../utils/Constants";
import { NextFunction, Request, Response } from "express";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(`Error Path: ${req.path}`, err);

  if (err instanceof ErrorWithCode) {
    const { code, message, options } = err;

    res.status(options?.status || HttpStatus.BAD_REQUEST).send({
      success: false,
      error: {
        code,
        message,
        payload: options?.payload ? options.payload : {},
      },
    });
  } else {
    const extractedMessage = extractMessageFromJoi(err?.message || "");
    res.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      error: {
        message: extractedMessage,
      },
    });
  }
};

const extractMessageFromJoi = (message: string): string => {
  if (!message) return message;

  if (message.match(/.*.is not allowed to be empty/)) {
    const word = extractQuoteFromMessage(message);
    return `${word} 값이 입력되지 않았습니다.`;
  }
  if (message.match(/child.*.fails because.*.is required]/)) {
    const word = extractQuoteFromMessage(message);
    return `${word} 값은 필수로 입력되어야 합니다.`;
  }
  if (message.match(/.*.must be a valid email/)) {
    return `올바른 이메일 형식이 아닙니다.`;
  }
  if (message.match(/.*.length must be less than or equal to .*. characters long/)) {
    const word = extractQuoteFromMessage(message);
    return `${word}의 입력 값이 너무 깁니다.`;
  }
  if (message.match(/.*.must have at least 1 key/)) {
    const word = extractQuoteFromMessage(message);
    return `최소 1개 이상의 값을 입력해 주세요.`;
  }
  return message;
};

const extractQuoteFromMessage = (message: string): string => {
  if (/".+?"/.test(message)) {
    const quotedWord = message.match(/".+?"/)[0];
    const word = quotedWord.slice(1, -1);
    return word;
  }
  return message;
};

export default errorHandler;
