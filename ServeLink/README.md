# KYUES ServeLink

KYUES is an Express, EJS and PostgreSQL web application for engineering student organizations, projects and categories.

## Run locally

1. Install Node.js (LTS) and PostgreSQL.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env`.
4. Set `DATABASE_URL` to your PostgreSQL connection string and replace `SESSION_SECRET` with a long random secret.
5. From this project folder run:

   ```bash
   npm install
   ```

6. Run the SQL in `src/models/setup.sql` in the new database. If you are updating an existing database that uses the earlier one-category-per-project structure, run `src/models/migrations/001_project_categories.sql` once instead of recreating the database.
7. Start the application:

   ```bash
   npm run dev
   ```

8. Open `http://localhost:3000`.

## Data validation activity

The **Add an Organization** form is available at `/new-organization` and from the Organizations page. Server-side validation uses `express-validator` to trim and escape the organization name and description, normalize the email address, and enforce the required fields and length/email rules. The form also uses browser validation (`required`, `maxlength`, and `type=email`).

Validation errors and successful submissions use one-time session-backed flash messages. Sessions are configured in `server.js`; the flash middleware is in `src/middleware/flash.js`. Set `SESSION_SECRET` in your local `.env` file and in Render's environment variables.

## Render deployment

- Build command: `npm install`
- Start command: `npm start`
- Add `DATABASE_URL`, `SESSION_SECRET`, and `NODE_ENV=production` as environment variables.
- Ensure the Render PostgreSQL database contains the schema and data described above.
- Never commit `.env` or expose database credentials.

## Project structure

- `server.js` configures Express, sessions, flash messages and error handling.
- `src/routes.js` maps URLs to controller functions.
- `src/controllers/` contains route controllers and form validation.
- `src/middleware/flash.js` provides one-time session flash messages.
- `src/models/` contains PostgreSQL queries and database setup/migration SQL.
- `views/` contains EJS templates and shared partials.
- `public/` contains CSS and images.
