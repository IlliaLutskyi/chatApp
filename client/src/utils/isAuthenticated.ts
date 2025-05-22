import { api } from "../lib/api";
async function isAuthenticated() {
  try {
    const data = await api.get("/auth/isAuthenticated", {
      withCredentials: true,
    });
    const isAuth = data.data.isAuthenticated;
    return isAuth;
  } catch (err) {
    return false;
  }
}
export default isAuthenticated;
