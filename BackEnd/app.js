// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/auth.routes");
// const testRoutes = require("./routes/test.routes");
// const groupRoutes = require("./routes/group.routes");
// const expenseRoutes = require("./routes/expense.routes");
// const balanceRoutes = require("./routes/balance.routes");
// const settlementRoutes = require("./routes/settlement.routes");
// const activityRoutes = require("./routes/activity.routes");
// const notificationRoutes = require("./routes/notification.routes");


// const app = express();

// // 🔥 CORS — MUST BE BEFORE ROUTES
// app.use(
//   cors({
//     origin: "https://splitwise-fullstack.vercel.app", // frontend
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/test", testRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/group", groupRoutes); // ✅ FIXED
// app.use("/api/expense", expenseRoutes);
// app.use("/api/balance", balanceRoutes);
// app.use("/api/settle", settlementRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/api/notifications", notificationRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "API running" });
// });

// module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// // Routes
// const authRoutes = require("./routes/auth.routes");
// const testRoutes = require("./routes/test.routes");
// const groupRoutes = require("./routes/group.routes");
// const expenseRoutes = require("./routes/expense.routes");
// const balanceRoutes = require("./routes/balance.routes");
// const settlementRoutes = require("./routes/settlement.routes");
// const activityRoutes = require("./routes/activity.routes");
// const notificationRoutes = require("./routes/notification.routes");

// const app = express();

// /* ======================================================
//    🔥 CORS CONFIG — MUST BE BEFORE ALL ROUTES
//    ====================================================== */

// const allowedOrigins = [
//   "https://splitwise-fullstack.vercel.app",
//   "https://splitwise-fullstack-7kkcx3lmf-muhammad-javid-pashas-projects.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       // Allow all Vercel preview + prod URLs
//       if (
//         origin.endsWith(".vercel.app") ||
//         origin === "http://localhost:5173"
//       ) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// /* ======================================================
//    🔥 MIDDLEWARES
//    ====================================================== */

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ======================================================
//    🔥 ROUTES
//    ====================================================== */

// app.use("/api/test", testRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/group", groupRoutes);
// app.use("/api/expense", expenseRoutes);
// app.use("/api/balance", balanceRoutes);
// app.use("/api/settle", settlementRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/api/notifications", notificationRoutes);

// /* ======================================================
//    🔥 ROOT CHECK
//    ====================================================== */

// app.get("/", (req, res) => {
//   res.json({ message: "API running 🚀" });
// });

// module.exports = app;


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const groupRoutes = require("./routes/group.routes");
const expenseRoutes = require("./routes/expense.routes");
const balanceRoutes = require("./routes/balance.routes");
const settlementRoutes = require("./routes/settlement.routes");
const activityRoutes = require("./routes/activity.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

/* ======================================================
   🔥 CORS CONFIG — PRODUCTION SAFE
   ====================================================== */

const allowedOrigins = [
  "https://splitwise-fullstack.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman / mobile apps / server-to-server
    if (!origin) return callback(null, true);

    // Allow main domains + all vercel preview URLs
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/* ======================================================
   🔥 IMPORTANT: Express 5 SAFE CORS
   ====================================================== */

app.use(cors(corsOptions));

// ✅ Express 5 FIX — "*" nahi use karna
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return cors(corsOptions)(req, res, next);
  }
  next();
});

/* ======================================================
   🔥 MIDDLEWARES
   ====================================================== */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   🔥 ROUTES
   ====================================================== */

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/settle", settlementRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);

/* ======================================================
   🔥 ROOT CHECK
   ====================================================== */

app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

/* ======================================================
   🔥 GLOBAL ERROR HANDLER
   ====================================================== */

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
