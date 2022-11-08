import jwt from "jsonwebtoken";

export const verifyToken = async (token: string) => {
  try {
    let result = await jwt.verify(token, process.env.LOGIN_SECRET_KEY!);
    return result;
  } catch (error) {
    console.log(error);
  }
};
