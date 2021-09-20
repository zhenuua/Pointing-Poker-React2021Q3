import jwt from "jsonwebtoken";
const { sign } = jwt;


export const generateAccessToken = (socketId, userRole, secret) => {
  const payload = {
    socketId,
    userRole
  }
  return sign(payload, secret, {expiresIn: "1h"});
}