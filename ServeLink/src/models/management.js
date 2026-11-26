import db from './db.js';

export async function listOrganizations(){ return (await db.query('SELECT organization_id AS id,name FROM organization ORDER BY name')).rows; }
export async function listCategories(){ return (await db.query('SELECT category_id AS id,name FROM categories ORDER BY name')).rows; }
export async function getRecord(type,id){
 const cfg={organization:['organization','organization_id','organization_id AS id,name,description,contact_email AS email,logo_filename AS image'],project:['projects','project_id','project_id AS id,organization_id,title AS name,description,location,date,image_filename AS image'],category:['categories','category_id','category_id AS id,name,description,image_filename AS image']}[type];
 if(!cfg) throw new Error('Invalid record type');
 return (await db.query(`SELECT ${cfg[2]} FROM ${cfg[0]} WHERE ${cfg[1]}=$1`,[id])).rows[0]||null;
}
export async function createRecord(type,d){
 if(type==='organization') return (await db.query('INSERT INTO organization(name,description,contact_email,logo_filename) VALUES($1,$2,$3,$4) RETURNING organization_id AS id',[d.name,d.description,d.email,d.image||'engineering-students.jpg'])).rows[0];
 if(type==='category') return (await db.query('INSERT INTO categories(name,description,image_filename) VALUES($1,$2,$3) RETURNING category_id AS id',[d.name,d.description,d.image||'community_outreach.jfif'])).rows[0];
 if(type==='project') return (await db.query('INSERT INTO projects(organization_id,title,description,location,date,image_filename) VALUES($1,$2,$3,$4,$5,$6) RETURNING project_id AS id',[d.organization_id,d.name,d.description,d.location,d.date,d.image||'projects.jfif'])).rows[0];
}
export async function updateRecord(type,id,d){
 if(type==='organization') return db.query('UPDATE organization SET name=$1,description=$2,contact_email=$3 WHERE organization_id=$4',[d.name,d.description,d.email,id]);
 if(type==='category') return db.query('UPDATE categories SET name=$1,description=$2 WHERE category_id=$3',[d.name,d.description,id]);
 if(type==='project') return db.query('UPDATE projects SET organization_id=$1,title=$2,description=$3,location=$4,date=$5 WHERE project_id=$6',[d.organization_id,d.name,d.description,d.location,d.date,id]);
}
export async function getProjectCategoryIds(id){return (await db.query('SELECT category_id FROM project_categories WHERE project_id=$1',[id])).rows.map(r=>r.category_id);}
export async function saveProjectCategories(projectId,ids){
 const client=await db.connect(); try { await client.query('BEGIN'); await client.query('DELETE FROM project_categories WHERE project_id=$1',[projectId]); for(const id of ids) await client.query('INSERT INTO project_categories(project_id,category_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[projectId,id]); await client.query('COMMIT'); } catch(e){await client.query('ROLLBACK');throw e;} finally{client.release();}
}
