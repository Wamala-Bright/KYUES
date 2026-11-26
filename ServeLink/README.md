# KYUES / ServeLink

KYUES is an engineering-student community and service-project application built with Express, EJS and PostgreSQL.

## Local setup
1. Install Node.js (LTS recommended).
2. Copy `.env.example` to `.env` and enter your PostgreSQL connection string and a long random `SESSION_SECRET`.
3. Run `npm install`.
4. Run `npm run dev` and open `http://localhost:3000`.

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Do not commit `.env` or share database credentials. The provided `src/models/setup.sql` is a schema/seed script; do not run it against a populated production database without reviewing it first.

## W04 create, update and category assignment
- Add records using `/manage/organization/new`, `/manage/project/new`, and `/manage/category/new`.
- Edit records from their detail pages.
- Assign project categories from the **Update Categories** link on each project detail page.
- Server-side validation and HTML form constraints are applied to management forms.
- Flash messages are stored in the session and consumed on the next request.

See `README-W04.md` and `W04-SUBMISSION-CHECKLIST.md` for setup and testing details.
