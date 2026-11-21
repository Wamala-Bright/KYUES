# KYUES ServeLink

## Run locally

1. Install Node.js and PostgreSQL, and create the project database.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Run `npm install`.
4. Run the SQL in `src/models/setup.sql` in your database.
5. Start the app with `npm run dev`, then open `http://127.0.0.1:3000`.

The application includes organization, service project, and category detail pages; upcoming project links; development request logging; and custom 404 and 500 pages. The `/test-error` route triggers the custom 500 page.

## Project structure

- `server.js` configures Express middleware and starts the server.
- `src/routes.js` maps URLs to controller functions.
- `src/controllers/` prepares data for the views.
- `src/models/` contains PostgreSQL queries.
- `views/` contains EJS templates and shared partials.

Keep `.env` private. It is excluded from the source package.
