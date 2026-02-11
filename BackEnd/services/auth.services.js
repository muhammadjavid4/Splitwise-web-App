const userRepo = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const generateToken = require("../utils/generateToken");

const DEFAULT_PROFILE_PIC =
  "https://ui-avatars.com/api/?name=User&background=random";

const isValidGmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

// REGISTER
exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!isValidGmail(email)) {
    throw new Error("Please enter a valid Gmail address");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const userId = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    profile_pic: DEFAULT_PROFILE_PIC,
  });

  const token = generateToken({ id: userId, email });

  return {
    token,
    user: {
      id: userId,
      name,
      email,
      profile_pic: DEFAULT_PROFILE_PIC,
    },
  };
};

// LOGIN
exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.auth_provider !== "local") {
    throw new Error("Please login using Google");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
    },
  };
};
