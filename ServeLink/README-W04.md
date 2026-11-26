# KYUES — W04 Inserting and Updating Data

## Setup
1. Install Node.js (LTS recommended).
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` to your PostgreSQL connection string.
4. Set `SESSION_SECRET` to a long random value (generate with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`).
5. Run `npm install` and `npm run dev`.
6. Open `http://localhost:3000`.

The existing database schema is expected to include `organization`, `projects`, `categories`, and `project_categories`. Do not run `src/models/setup.sql` on an existing populated database because it is a seed/setup script.

## W04 routes
- `/manage/organization/new`, `/manage/project/new`, `/manage/category/new`
- `/manage/organization/:id/edit`, `/manage/project/:id/edit`, `/manage/category/:id/edit`
- `/project/:id/categories` for category assignment

All database writes use parameterized PostgreSQL queries. Forms use HTML constraints and server-side validation. Flash messages require session middleware and a persistent `SESSION_SECRET`.

## Render
Set `DATABASE_URL` and `SESSION_SECRET` under the existing web service's Environment settings. Never commit or share `.env`.

See `W04-SUBMISSION-CHECKLIST.md` and complete every test against your own database before submission.
