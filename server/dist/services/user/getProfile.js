async function getProfile(req, res) {
    const user = req.user;
    res.status(200).json({ user });
    return;
}
export default getProfile;
