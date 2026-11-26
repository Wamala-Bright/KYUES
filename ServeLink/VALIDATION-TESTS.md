# W04 Data Validation - Test Checklist

Open `/new-organization` or use the **Add an Organization** button on the Organizations page.

| Test | Example input | Expected result |
|---|---|---|
| Empty name | Leave name empty | Error message: Organization name is required. |
| Short name | `A` | Error message: Organization name must be between 3 and 150 characters. |
| Empty description | Leave description empty | Error message: Organization description is required. |
| Long description | More than 500 characters | Error message that the description must not exceed 500 characters. |
| Invalid email | `bright-at-example` | Error message asking for a valid email address. |
| Valid submission | Name with at least 3 characters, description up to 500 characters, valid email | Record is inserted into PostgreSQL; success message is shown on the organization details page. |

The browser's `required`, `maxlength`, and `type=email` checks prevent some invalid submissions before they reach the server. To verify server-side validation independently, submit the POST request directly (for example with Postman or curl) or temporarily bypass browser validation. The name field intentionally has **no `minlength` attribute**: the minimum of 3 characters is enforced on the server.

## Example direct requests

Run these from a terminal while the application is running:

```bash
# One-character name: should redirect back with a validation error.
curl -i -X POST http://localhost:3000/new-organization \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "name=A" \
  --data-urlencode "description=Description for testing" \
  --data-urlencode "contactEmail=bright@example.com"

# Invalid email: should redirect back with a validation error.
curl -i -X POST http://localhost:3000/new-organization \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "name=Test Organization" \
  --data-urlencode "description=Description for testing" \
  --data-urlencode "contactEmail=not-an-email"
```

For the success test, use a name not already in the database because organization names are unique.
