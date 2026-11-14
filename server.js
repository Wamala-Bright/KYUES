import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { testConnection } from "./src/models/db.js";
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Resolve project directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Validate selected association
const getAssociation = (association) => {
  const allowedAssociations = ["KOGSA", "ACES"];

  return allowedAssociations.includes(association)
    ? association
    : "KOGSA";
};

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index", {
    title: "KYUES | Home"
  });
});

// ORGANIZATIONS PAGE
app.get("/organizations", async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "KYUES | Organizations",
      organizations
    });
  } catch (error) {
    next(error);
  }
});

// PROJECTS PAGE
app.get("/projects", async (req, res, next) => {
  try {
    const projects = await getAllProjects();

    console.log("Service Projects:", projects);

    res.render("projects", {
      title: "KYUES | Projects",
      projects
    });

  } catch (error) {
    next(error);
  }
});

// CATEGORIES PAGE
app.get("/categories", async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "KYUES | Categories",
            categories
        });
    } catch (error) {
        next(error);
    }
});

// ASSOCIATIONS PAGE
app.get("/associations", (req, res) => {
  res.render("associations", {
    title: "KYUES | Choose Association"
  });
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("login", {
    title: "KYUES | Login",
    association
  });
});

// SIGNUP PAGE
app.get("/signup", (req, res) => {
  res.render("signup", {
    title: "KYUES | Registration"
  });
});

// DASHBOARD PAGE
app.get("/dashboard", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("dashboard", {
    title: "KYUES | Student Dashboard",
    association
  });
});

// SHOP PAGE
app.get("/shop", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("shop", {
    title: "KYUES | Shop",
    association
  });
});

// EVENTS PAGE
app.get("/events", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("events", {
    title: "KYUES | Events",
    association
  });
});

// ASSOCIATION FAMILY PAGE
app.get("/family", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("family", {
    title: "KYUES | Association Family",
    association
  });
});

// MEMBERSHIP PAGE
app.get("/membership", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("membership", {
    title: "KYUES | Membership",
    association
  });
});

// QUESTION BOX PAGE
app.get("/questions", (req, res) => {
  const association = getAssociation(req.query.association);

  res.render("questions", {
    title: "KYUES | Question Box",
    association,
    success: req.query.success === "true"
  });
});

// SUBMIT A QUESTION
app.post("/questions", (req, res) => {
  const {
    studentName,
    registrationNumber,
    questionCategory,
    question,
    association
  } = req.body;

  // Validate required fields
  if (
    !studentName?.trim() ||
    !registrationNumber?.trim() ||
    !questionCategory ||
    !question?.trim()
  ) {
    return res.status(400).send(
      "Please complete all required fields."
    );
  }

  const selectedAssociation = getAssociation(association);

  console.log("\n========== NEW KYUES QUESTION ==========");
  console.log("Student Name:", studentName);
  console.log("Registration Number:", registrationNumber);
  console.log("Association:", selectedAssociation);
  console.log("Category:", questionCategory);
  console.log("Question:", question);
  console.log("========================================\n");

  res.redirect(
    `/questions?association=${encodeURIComponent(selectedAssociation)}&success=true`
  );
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).send(
    "Sorry, the requested page could not be found."
  );
});

// GENERAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Application error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send(
    NODE_ENV === "development"
      ? err.message
      : "Something went wrong. Please try again later."
  );
});

// START SERVER AND TEST DATABASE CONNECTION
const server = app.listen(port, async () => {
  console.log("-----------------------------------");
  console.log("KYUES SERVER STARTED");
  console.log(`URL: http://127.0.0.1:${port}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log("-----------------------------------");

  try {
    await testConnection();
    console.log("Database connection successful.");
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    console.error(
      "Check DATABASE_URL in your .env file."
    );
  }
});

// GRACEFUL SERVER SHUTDOWN
const shutdown = (signal) => {
  console.log(`\n${signal} received. Closing server...`);

  server.close(() => {
    console.log("KYUES server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));