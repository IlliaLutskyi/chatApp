import cookie from "cookie";
function retrieveToken(socket, next) {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader)
        return next(new Error("unauthorized"));
    const cookies = cookie.parse(cookieHeader);
    return cookies.token;
}
export default retrieveToken;
