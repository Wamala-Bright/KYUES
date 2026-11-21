import db from './db.js';

// Category links are stored in project_categories because one project may
// belong to more than one category.
const PROJECT_CATEGORY_JSON = `
  COALESCE((
    SELECT json_agg(json_build_object(
      'category_id', c.category_id,
      'name', c.name
    ) ORDER BY c.name)
    FROM project_categories pc
    JOIN categories c ON c.category_id = pc.category_id
    WHERE pc.project_id = p.project_id
  ), '[]'::json) AS categories`;

const getAllProjects = async () => {
  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.title, p.description,
           p.location, p.date, p.image_filename,
           o.name AS organization_name,
           ${PROJECT_CATEGORY_JSON}
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    ORDER BY p.date ASC, p.project_id ASC
  `);
  return rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const limit = Number.parseInt(numberOfProjects, 10);
  if (!Number.isInteger(limit) || limit < 1) return [];

  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.title, p.description,
           p.location, p.date, p.image_filename,
           o.name AS organization_name,
           ${PROJECT_CATEGORY_JSON}
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC, p.project_id ASC
    LIMIT $1
  `, [limit]);
  return rows;
};

const getProjectDetails = async (projectId) => {
  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.title, p.description,
           p.location, p.date, p.image_filename,
           o.name AS organization_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    WHERE p.project_id = $1
  `, [projectId]);
  return rows[0] ?? null;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.title, p.description,
           p.location, p.date, p.image_filename,
           ${PROJECT_CATEGORY_JSON}
    FROM projects p
    WHERE p.organization_id = $1
    ORDER BY p.date ASC, p.project_id ASC
  `, [organizationId]);
  return rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const { rows } = await db.query(`
    SELECT p.project_id, p.organization_id, p.title, p.description,
           p.location, p.date, p.image_filename,
           o.name AS organization_name
    FROM projects p
    JOIN organization o ON o.organization_id = p.organization_id
    JOIN project_categories pc ON pc.project_id = p.project_id
    WHERE pc.category_id = $1
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
