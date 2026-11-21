import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
  showOrganizationsPage,
  showOrganizationDetailsPage
} from './controllers/organizations.js';
import {
  showProjectsPage,
  showProjectDetailsPage
} from './controllers/projects.js';
import {
  showCategoriesPage,
  showCategoryDetailsPage
} from './controllers/categories.js';
import { testErrorPage, showNotFoundPage } from './controllers/errors.js';
import {
  showAssociationsPage,
  showLoginPage,
  showSignupPage,
  showDashboardPage,
  showShopPage,
  showEventsPage,
  showFamilyPage,
  showMembershipPage,
  showQuestionsPage,
  submitQuestion
} from './controllers/pages.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/associations', showAssociationsPage);
router.get('/login', showLoginPage);
router.get('/signup', showSignupPage);
router.get('/dashboard', showDashboardPage);
router.get('/shop', showShopPage);
router.get('/events', showEventsPage);
router.get('/family', showFamilyPage);
router.get('/membership', showMembershipPage);
router.get('/questions', showQuestionsPage);
router.post('/questions', submitQuestion);

router.get('/test-error', testErrorPage);
router.use(showNotFoundPage);

export default router;
