import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import { cryptoHelper } from "../utils/CryptoHelper";

function makeAuthGuard(jwtCookieName: string) {
  return function authGuard(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        let jwt = args[0].cookies[jwtCookieName];
        if (args[0].headers.authorization && args[0].headers.authorization.includes("Bearer ")) {
          jwt = args[0].headers.authorization.split("Bearer ")[1];
        }
        if (!jwt) return args[2](new ErrorWithCode("JWT.NO_TOKEN", "jwt 토큰이 없습니다."));

        const decoded = cryptoHelper.verifyJwt(jwt);
        args.push(decoded);
        const result = originalMethod.apply(this, args);
        return result;
      } catch (err) {
        return args[2](err);
      }
    };
    return descriptor;
  };
}

const jwtCookieName = process.env.JWT_COOKIE_NAME;
export const authGuard = makeAuthGuard(jwtCookieName);
