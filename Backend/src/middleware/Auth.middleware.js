import jwt from "jsonwebtoken";


export const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Received Token:", token); 

  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid Token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
    req.user = data.user;
    console.log("Decoded User:", req.user); 
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ error: "Invalid Token" });
  }
};
