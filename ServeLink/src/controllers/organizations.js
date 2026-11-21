import {
  getAllOrganizations,
  getOrganizationDetails
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

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

export { showOrganizationsPage, showOrganizationDetailsPage };
