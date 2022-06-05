
const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
 
  serializeUser
} = require("../utils/Auth");

// Users Registeration Route
router.post("/client", async (req, res) => {
  await userRegister(req.body, "client", res);
});
router.post("/agence", async (req, res) => {
  await userRegister(req.body, "agence", res);
});
router.post("/login", userLogin)

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/organisateur_amateur", async (req, res) => {
  await userRegister(req.body, "organisateur_amateur", res);
});

// Users Login Route
router.post("/login-client", async (req, res) => {
  await userLogin(req.body, "client", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
// Super Admin Login Route
router.post("/login-organisateur-amateur", async (req, res) => {
  await userLogin(req.body, "agence", res);
});
// Super Admin Login Route
router.post("/login-agence", async (req, res) => {
  await userLogin(req.body, "agence", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/organisateur_amateur-protectd",
  userAuth,
  checkRole(["organisateur_amateur"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);
router.get(
  "/agence-protectd",
  userAuth,
  checkRole(["agence"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["organisateur_amateur", "admin","agence"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);





module.exports = router;
