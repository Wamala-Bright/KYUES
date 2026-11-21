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

const getCategoriesByProjectId = async (projectId) => {
  const { rows } = await db.query(`
    SELECT c.category_id, c.name
    FROM project_categories pc
    JOIN categories c ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name ASC
  `, [projectId]);
  return rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId };
