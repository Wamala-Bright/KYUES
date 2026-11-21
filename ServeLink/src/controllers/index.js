const showHomePage = (req, res) => {
  res.render('index', { title: 'KYUES | Home' });
};

export { showHomePage };
