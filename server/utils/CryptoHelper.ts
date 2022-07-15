import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

class CryptoHelper {
  private jwtSecret: string = null;
  private bcryptRound: number = null;

  public setup(props: { jwtSecret?: string; bcryptRound?: number }) {
    this.jwtSecret = props.jwtSecret;
    this.bcryptRound = props.bcryptRound;
  }

  public encodeJwt<T extends Object>(data: T) {
    if (!this.jwtSecret) throw new Error("jwtSecret을 초기화해야 합니다.");
    const jwtToken = jwt.sign({ ...data }, this.jwtSecret);
    return jwtToken;
  }

  public decodeJwt(token: string): any {
    return jwt.decode(token);
  }

  public verifyJwt(token: string) {
    if (!this.jwtSecret) throw new Error("jwtSecret을 초기화해야 합니다.");
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (err) {
      throw new Error(`유효하지 않거나 만료된 jwt 토큰입니다. token :${token}`);
    }
  }

  public bcryptHash(password: string): string {
    if (!this.bcryptRound) throw new Error("bcryptRound를 초기화해야 합니다.");
    const salt = bcrypt.genSaltSync(this.bcryptRound);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  public compareBcryptHash(plain: string, encoded: string): boolean {
    let isValid = bcrypt.compareSync(plain, encoded);
    return isValid;
  }
}

export const cryptoHelper = new CryptoHelper();
