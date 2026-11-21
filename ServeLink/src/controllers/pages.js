const getAssociation = (association) =>
  ['KOGSA', 'ACES'].includes(association) ? association : 'KOGSA';

const showAssociationsPage = (req, res) => {
  res.render('associations', { title: 'KYUES | Choose Association' });
};

const showLoginPage = (req, res) => {
  res.render('login', {
    title: 'KYUES | Login',
    association: getAssociation(req.query.association)
  });
};

const showSignupPage = (req, res) => {
  res.render('signup', { title: 'KYUES | Registration' });
};

const showDashboardPage = (req, res) => {
  res.render('dashboard', {
    title: 'KYUES | Student Dashboard',
    association: getAssociation(req.query.association)
  });
};

const showShopPage = (req, res) => {
  res.render('shop', {
    title: 'KYUES | Shop',
    association: getAssociation(req.query.association)
  });
};

const showEventsPage = (req, res) => {
  res.render('events', {
    title: 'KYUES | Events',
    association: getAssociation(req.query.association)
  });
};

const showFamilyPage = (req, res) => {
  res.render('family', {
    title: 'KYUES | Association Family',
    association: getAssociation(req.query.association)
  });
};

const showMembershipPage = (req, res) => {
  res.render('membership', {
    title: 'KYUES | Membership',
    association: getAssociation(req.query.association)
  });
};

const showQuestionsPage = (req, res) => {
  res.render('questions', {
    title: 'KYUES | Question Box',
    association: getAssociation(req.query.association),
    success: req.query.success === 'true'
  });
};

const submitQuestion = (req, res) => {
  const {
    studentName,
    registrationNumber,
    questionCategory,
    question,
    association
  } = req.body;

  if (
    typeof studentName !== 'string' || !studentName.trim() ||
    typeof registrationNumber !== 'string' || !registrationNumber.trim() ||
    typeof questionCategory !== 'string' || !questionCategory ||
    typeof question !== 'string' || !question.trim()
  ) {
    return res.status(400).send('Please complete all required fields.');
  }

  const selectedAssociation = getAssociation(association);
  console.log('New KYUES question received:', {
    studentName: studentName.trim(),
    registrationNumber: registrationNumber.trim(),
    association: selectedAssociation,
    category: questionCategory,
    question: question.trim()
  });

  return res.redirect(
    `/questions?association=${encodeURIComponent(selectedAssociation)}&success=true`
  );
};

export {
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
};
