# KYUES ServeLink

## Run locally

1. Install Node.js and PostgreSQL, and create a project database.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Run `npm install`.
4. Run the SQL in `src/models/setup.sql` in a new/empty database.
5. Start the app with `npm run dev`, then open `http://127.0.0.1:3000`.

For an existing database created with the earlier one-category-per-project schema, run `src/models/migrations/001_project_categories.sql` once before deploying the updated application. It creates the `project_categories` junction table, preserves existing category assignments, adds relevant secondary sample categories, and removes the old `projects.category_id` column.

## Project structure

- `server.js` configures Express middleware and starts the server.
- `src/routes.js` maps URLs to controller functions.
- `src/controllers/` prepares data for the views.
- `src/models/` contains PostgreSQL queries and database setup/migration SQL.
- `views/` contains EJS templates and shared partials.
- `public/` contains CSS and images.

The application includes organization, service project, and category list/detail pages; upcoming project links; multiple category tags per project and five seeded upcoming projects; and custom 404 and 500 pages. The `/test-error` route triggers the custom 500 page.

Keep `.env` private. It is excluded from the source package.
