function logout(req, res) {
    res
        .clearCookie("token", { httpOnly: true })
        .json({ message: "You was logged out successfully" });
    return;
}
export default logout;
