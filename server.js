import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index", {
    title: "KYUES | Home"
  });
});

// ORGANIZATIONS PAGE
app.get("/organizations", (req, res) => {
  res.render("organizations", {
    title: "KYUES | Organizations"
  });
});

// PROJECTS PAGE
app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "KYUES | Projects"
  });
});

// CATEGORIES PAGE
app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "KYUES | Categories"
  });
});

// ASSOCIATIONS PAGE
app.get("/associations", (req, res) => {
  res.render("associations", {
    title: "KYUES | Choose Association"
  });
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  const association = req.query.association || "KOGSA";

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
  const association = req.query.association || "KOGSA";

  res.render("dashboard", {
    title: "KYUES | Student Dashboard",
    association
  });
});

// SHOP PAGE
app.get("/shop", (req, res) => {
  const association = req.query.association || "KOGSA";

  res.render("shop", {
    title: "KYUES | Shop",
    association
  });
});

// EVENTS PAGE
app.get("/events", (req, res) => {
  const association = req.query.association || "KOGSA";

  res.render("events", {
    title: "KYUES | Events",
    association
  });
});

// ASSOCIATION FAMILY PAGE
app.get("/family", (req, res) => {
  const association = req.query.association || "KOGSA";

  res.render("family", {
    title: "KYUES | Association Family",
    association
  });
});

// MEMBERSHIP PAGE
app.get("/membership", (req, res) => {
  const association = req.query.association || "KOGSA";

  res.render("membership", {
    title: "KYUES | Membership",
    association
  });
});

// QUESTION BOX PAGE
app.get("/questions", (req, res) => {
  const association = req.query.association || "KOGSA";

  res.render("questions", {
    title: "KYUES | Question Box",
    association
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

  console.log("\n========== NEW KYUES QUESTION ==========");
  console.log("Student Name:", studentName);
  console.log("Registration Number:", registrationNumber);
  console.log("Association:", association);
  console.log("Category:", questionCategory);
  console.log("Question:", question);
  console.log("========================================\n");

  const selectedAssociation = encodeURIComponent(association || "KOGSA");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KYUES | Question Submitted</title>
      </head>
      <body>
        <main>
          <h1>Question Submitted Successfully!</h1>
          <p>Your question has been received.</p>
          <a href="/questions?association=${selectedAssociation}">
            Submit another question
          </a>
          <br><br>
          <a href="/dashboard?association=${selectedAssociation}">
            Return to Dashboard
          </a>
        </main>
      </body>
    </html>
  `);
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).send("Sorry, the requested page could not be found.");
});

// START SERVER
app.listen(port, () => {
  console.log(`KYUES is running at http://localhost:${port}`);
});