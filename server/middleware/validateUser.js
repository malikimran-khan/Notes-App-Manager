export const validateUser = (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  if (password.length < 6)
    return res.status(400).json({ message: "Password must be at least 6 characters" });

  next();
};
