import {
  getUpcomingProjects,
  getProjectDetails
} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  res.render('projects', {
    title: 'KYUES | Upcoming Service Projects',
    projects
  });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = Number.parseInt(req.params.id, 10);
  const project = Number.isInteger(projectId)
    ? await getProjectDetails(projectId)
    : null;

  if (!project) {
    const error = new Error('Service Project Not Found');
    error.status = 404;
    throw error;
  }

  const categories = await getCategoriesByProjectId(projectId);
  res.render('project', {
    title: `KYUES | ${project.title}`,
    project,
    categories
  });
};

export { showProjectsPage, showProjectDetailsPage };
