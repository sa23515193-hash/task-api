require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const swaggerUi =
  require("swagger-ui-express");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const swaggerSpec =
  require("./swagger");

const errorHandler =
  require("./middleware/errorMiddleware");


const app =
  express();


// DATABASE
connectDB();


// MIDDLEWARE
app.use(
  cors({
    origin: "*"
  })
);

app.use(
  express.json()
);


// HOME
app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      name:
        "Task Management REST API",
      status:
        "API is running",
      documentation:
        "/api-docs"
    });
  }
);


// HEALTH CHECK
app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Task API is healthy."
    });
  }
);


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);


// SWAGGER
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerSpec
  )
);


// 404
app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route not found."
    });
  }
);


// ERROR HANDLER
app.use(
  errorHandler
);


// PORT
const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);
