export default (req, res) => {
  const year = new Date().getFullYear();

  res.status(200).json({ year });
}