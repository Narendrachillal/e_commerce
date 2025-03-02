export const uploadImage = (req, res) => {
  res.json({
    success: true,
    image_url: `${process.env.BASE_URL}/images/${req.file.filename}`,
  });
};
