import { body, validationResult } from 'express-validator';
import { createRecord, updateRecord, getRecord, listOrganizations, listCategories, getProjectCategoryIds, saveProjectCategories } from '../models/management.js';
import { getAllProjects } from '../models/projects.js';

export const managementValidation = [
 body('name').trim().notEmpty().withMessage('Name is required.').bail().isLength({min:3,max:200}).withMessage('Name must be between 3 and 200 characters.').bail().escape(),
 body('description').trim().notEmpty().withMessage('Description is required.').bail().isLength({max:500}).withMessage('Description must not exceed 500 characters.').bail().escape(),
 body('email').optional({checkFalsy:true}).trim().normalizeEmail().isEmail().withMessage('Enter a valid email address.'),
 body('organization_id').optional({checkFalsy:true}).isInt({min:1}).withMessage('Select an organization.'),
 body('location').optional().trim().isLength({min:2,max:200}).withMessage('Enter a valid location.'),
 body('date').optional().isISO8601().withMessage('Enter a valid project date.')
];
const types=['organization','project','category'];
const pathFor=(t,id)=>t==='organization'?`/organization/${id}`:t==='project'?`/project/${id}`:`/category/${id}`;
export async function showCreate(req,res){const type=req.params.type;if(!types.includes(type))return res.sendStatus(404);res.render('manage-form',{title:`Add ${type}`,type,record:{},organizations:await listOrganizations()});}
export async function showEdit(req,res){const {type,id}=req.params;if(!types.includes(type))return res.sendStatus(404);const record=await getRecord(type,id);if(!record)return res.sendStatus(404);res.render('manage-form',{title:`Edit ${type}`,type,record,organizations:await listOrganizations()});}
export async function save(req,res){const {type,id}=req.params;if(!types.includes(type))return res.sendStatus(404);const errors=validationResult(req);const extra=[];if(type==='organization' && (!req.body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))) extra.push('Enter a valid contact email.');if(type==='project' && (!req.body.location || !req.body.date)) extra.push('Project location and date are required.');if(!errors.isEmpty() || extra.length){errors.array().forEach(e=>req.flash('error',e.msg));extra.forEach(e=>req.flash('error',e));return res.redirect(id?`/manage/${type}/${id}/edit`:`/manage/${type}/new`);}try{const d={...req.body,email:req.body.email||req.body.contactEmail};const row=id?await updateRecord(type,id,d).then(()=>({id})):await createRecord(type,d);req.flash('success',`${type[0].toUpperCase()+type.slice(1)} ${id?'updated':'created'} successfully.`);res.redirect(pathFor(type,row.id));}catch(e){req.flash('error',e.code==='23505'?'A record with that name already exists.':e.message);res.redirect(id?`/manage/${type}/${id}/edit`:`/manage/${type}/new`);}}
export async function showAssign(req,res){const id=Number(req.params.id);const project=await getRecord('project',id);if(!project)return res.sendStatus(404);res.render('assign-categories',{title:'Update Project Categories',project,categories:await listCategories(),selected:await getProjectCategoryIds(id)});}
export async function saveAssign(req,res){const id=Number(req.params.id);const project=await getRecord('project',id);if(!project)return res.sendStatus(404);let ids=req.body.category_ids||[];if(!Array.isArray(ids))ids=[ids];ids=ids.map(Number).filter(Number.isInteger);const allowed=new Set((await listCategories()).map(c=>c.id));if(ids.some(x=>!allowed.has(x))){req.flash('error','Invalid category selection.');return res.redirect(`/project/${id}/categories`);}await saveProjectCategories(id,ids);req.flash('success','Project categories updated successfully.');res.redirect(`/project/${id}`);}
