import { body, validationResult } from 'express-validator';
import {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const organizationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Organization name is required.')
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage('Organization name must be between 3 and 150 characters.')
    .bail()
    .escape(),
  body('description')
    .trim()
    .notEmpty().withMessage('Organization description is required.')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Organization description must not exceed 500 characters.')
    .bail()
    .escape(),
  body('contactEmail')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Contact email is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.')
];

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  res.render('organizations', {
    title: 'KYUES | Organizations',
    organizations
  });
};

const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = Number.parseInt(req.params.id, 10);
  const organization = Number.isInteger(organizationId)
    ? await getOrganizationDetails(organizationId)
    : null;

  if (!organization) {
    const error = new Error('Organization Not Found');
    error.status = 404;
    throw error;
  }

  const projects = await getProjectsByOrganizationId(organizationId);
  res.render('organization', {
    title: `KYUES | ${organization.name}`,
    organization,
    projects
  });
};

const showNewOrganizationForm = (req, res) => {
  res.render('new-organization', {
    title: 'KYUES | Add Organization'
  });
};

const processNewOrganizationForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    for (const error of results.array()) {
      req.flash('error', error.msg);
    }
    return res.redirect('/new-organization');
  }

  const { name, description, contactEmail } = req.body;
  const organization = await createOrganization({
    name,
    description,
    contactEmail,
    logoFilename: 'engineering-students.jpg'
  });

  req.flash('success', 'Organization added successfully.');
  return res.redirect(`/organization/${organization.organization_id}`);
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation
};
