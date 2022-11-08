import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyUser(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY!);
    const user = (decoded as JwtPayload).username;
    return user == undefined ? false : true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
