import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name,
            description,
            image_filename
        FROM categories
        ORDER BY category_id ASC
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllCategories };