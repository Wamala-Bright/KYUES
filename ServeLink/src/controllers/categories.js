import {
  getAllCategories,
  getCategoryDetails
} from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  res.render('categories', {
    title: 'KYUES | Categories',
    categories
  });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  const category = Number.isInteger(categoryId)
    ? await getCategoryDetails(categoryId)
    : null;

  if (!category) {
    const error = new Error('Category Not Found');
    error.status = 404;
    throw error;
  }

  const projects = await getProjectsByCategoryId(categoryId);
  res.render('category', {
    title: `KYUES | ${category.name}`,
    category,
    projects
  });
};

export { showCategoriesPage, showCategoryDetailsPage };
