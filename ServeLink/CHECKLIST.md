# W04 Inserting and Updating Data — Test Checklist

Use a development/test database before testing writes. Do not run setup.sql against a populated database.

## Create
- [ ] Create an organization; confirm it appears in Organizations and its details page opens.
- [ ] Create a project; confirm it appears in Projects and its details page opens.
- [ ] Create a category; confirm it appears in Categories and its details page opens.
- [ ] Confirm success flash messages appear once and disappear after refresh.

## Edit
- [ ] Open each entity details page and use its Edit link.
- [ ] Confirm existing values are populated.
- [ ] Change values and save; confirm the details page shows the updated values.
- [ ] Confirm success flash messages and redirects.

## Project categories
- [ ] Open a project and choose Update Categories.
- [ ] Confirm all categories appear and current assignments are checked.
- [ ] Check and uncheck categories, save, and verify the project details page reflects the changes.

## Validation
- [ ] Submit empty required fields.
- [ ] Submit a name shorter than three characters.
- [ ] Submit a description longer than 500 characters.
- [ ] Submit an invalid organization email.
- [ ] Submit a project without organization, location, or date.
- [ ] Confirm invalid input does not create or update database rows.

## Deployment
- [ ] Set DATABASE_URL and SESSION_SECRET in Render Environment.
- [ ] Keep .env out of Git and submission ZIPs.
- [ ] Test create, edit, assignment, and validation on the deployed app.
