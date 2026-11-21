import db from './db.js';

const getAllProjects = async () => {
  const { rows } = await db.query(`
    SELECT
      p.project_id, p.organization_id, p.category_id, p.title,
      p.description, p.location, p.date, p.image_filename,
      o.name AS organization_name,
      c.name AS category_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    JOIN categories c ON c.category_id = p.category_id
    ORDER BY p.date ASC, p.project_id ASC
  `);
  return rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const limit = Number.parseInt(numberOfProjects, 10);
  if (!Number.isInteger(limit) || limit < 1) return [];

  const { rows } = await db.query(`
    SELECT
      p.project_id, p.organization_id, p.category_id, p.title,
      p.description, p.location, p.date, p.image_filename,
      o.name AS organization_name,
      c.name AS category_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    JOIN categories c ON c.category_id = p.category_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC, p.project_id ASC
    LIMIT $1
  `, [limit]);
  return rows;
};

const getProjectDetails = async (projectId) => {
  const { rows } = await db.query(`
    SELECT
      p.project_id, p.organization_id, p.category_id, p.title,
      p.description, p.location, p.date, p.image_filename,
      o.name AS organization_name,
      c.name AS category_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    JOIN categories c ON c.category_id = p.category_id
    WHERE p.project_id = $1
  `, [projectId]);
  return rows[0] ?? null;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const { rows } = await db.query(`
    SELECT project_id, organization_id, category_id, title, description,
           location, date, image_filename
    FROM projects
    WHERE organization_id = $1
    ORDER BY date ASC, project_id ASC
  `, [organizationId]);
  return rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.category_id, p.title,
           p.description, p.location, p.date, p.image_filename,
           o.name AS organization_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    WHERE p.category_id = $1
    ORDER BY p.date ASC, p.project_id ASC
  `, [categoryId]);
  return rows;
};

export {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  getProjectsByCategoryId
};
