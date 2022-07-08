import { HttpStatus } from "./../utils/Constants";
import { Request, Response } from "express";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";

const errorHandler = (err: any, req: Request, res: Response) => {
  console.log(`Error Path: ${req.path}`, err);

  if (err instanceof ErrorWithCode) {
    const { code, message, options } = err;

    res.status(options?.status || HttpStatus.BAD_REQUEST).send({
      error: {
        code,
        message,
        payload: options?.payload ? options.payload : {},
      },
    });
  } else {
    const extractedMessage = extractMessageFromJoi(err.message || "");
    res.status(HttpStatus.BAD_REQUEST).send({
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
