import cookie from "cookie";
import { NextFunction } from "express";
import { ExtendedError, Socket } from "socket.io";

function retrieveToken(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) return next(new Error("unauthorized"));
  const cookies = cookie.parse(cookieHeader);
  return cookies.token;
}
export default retrieveToken;
