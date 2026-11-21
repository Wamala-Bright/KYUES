import db from './db.js';

const getAllCategories = async () => {
  const { rows } = await db.query(`
    SELECT category_id, name, description, image_filename
    FROM categories
    ORDER BY name ASC
  `);
  return rows;
};

const getCategoryDetails = async (categoryId) => {
  const { rows } = await db.query(`
    SELECT category_id, name, description, image_filename
    FROM categories
    WHERE category_id = $1
  `, [categoryId]);
  return rows[0] ?? null;
};

// The current schema assigns one category to each project. Return an array
// so the project controller and view remain compatible with category tags.
const getCategoriesByProjectId = async (projectId) => {
  const { rows } = await db.query(`
    SELECT c.category_id, c.name
    FROM categories c
    JOIN projects p ON p.category_id = c.category_id
    WHERE p.project_id = $1
    ORDER BY c.name ASC
  `, [projectId]);
  return rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId };
