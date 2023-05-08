const notFound = (req, res) => {
  const { originalUrl } = req;
  res.status(404).json({ message: `${originalUrl} not found` });
};

module.exports = notFound;
