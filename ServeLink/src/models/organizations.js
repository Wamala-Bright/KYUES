import db from './db.js';

const getAllOrganizations = async () => {
  const { rows } = await db.query(`
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM organization
    ORDER BY name ASC
  `);
  return rows;
};

const getOrganizationDetails = async (organizationId) => {
  const { rows } = await db.query(`
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM organization
    WHERE organization_id = $1
  `, [organizationId]);
  return rows[0] ?? null;
};

const createOrganization = async ({ name, description, contactEmail, logoFilename }) => {
  const { rows } = await db.query(`
    INSERT INTO organization (name, description, contact_email, logo_filename)
    VALUES ($1, $2, $3, $4)
    RETURNING organization_id, name, description, contact_email, logo_filename
  `, [name, description, contactEmail, logoFilename]);
  return rows[0];
};

export { getAllOrganizations, getOrganizationDetails, createOrganization };
