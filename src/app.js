const express = require("express");
require("dotenv").config();
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/superadmin", require("./routes/superAdminRoutes"));
app.use("/api/hospital", require("./routes/hospitalRoutes"));
app.use("/api/hospitaladmin", require("./routes/hospitalAdminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/hospitaladmin", require("./routes/hospitalAdminAppointmentRoutes"));

module.exports = app;
