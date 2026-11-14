import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date,
            p.image_filename,
            c.name AS category_name,
            o.name AS organization_name
        FROM projects p
        INNER JOIN organization o
            ON p.organization_id = o.organization_id
        INNER JOIN categories c
            ON p.category_id = c.category_id
        ORDER BY p.project_id ASC
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };