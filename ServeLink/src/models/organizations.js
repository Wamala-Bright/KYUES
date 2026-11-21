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

export { getAllOrganizations, getOrganizationDetails };
