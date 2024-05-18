var express = require('express');
const fs = require('fs');
const path = require('path');

// Helper để đọc và render partials
// const renderPartial = (partialName) => {
//   const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
//   return fs.readFileSync(partialPath, 'utf8');
// };
// const renderPartial = (partialName) => {
//   const partialPath = path.join(__dirname, 'views', 'partials', `${partialName}.hbs`);
//   return fs.readFileSync(partialPath, 'utf8');
// };
const renderPartial = (partialName) => {
  const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
  return fs.readFileSync(partialPath, 'utf8');
};

//
const categoryRouter = require('./category/index');
const movieRouter = require('./movie/index');
const userRouter = require('./user/index');
const authenticateToken = require('../middlewares/auth');

//
const router = express.Router();
//
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/movie", movieRouter);

router.get("/", function(req, res, next) {
  res.render('login', { title: 'LOGIN' })
});
router.get("/login", function(req, res, next) {
  res.render('login', { title: 'LOGIN' })
});
router.get("/category", function(req, res, next) {
  const content = renderPartial('category');
  res.render('main', { 
      title: 'Category',
      body: content,
  });
});
router.get("/movie", function(req, res, next) {
  const content = renderPartial('movie');
  res.render('main', { 
      title: 'Movie',
      body: content,
  });
});
router.get("/showtimes", function(req, res, next) {
  const content = renderPartial('showtimes');
  res.render('main', { 
      title: 'ShowTimes',
router.get("/user", function(req, res, next) {
  const content = renderPartial('user');
  res.render('main', { 
      title: 'User',
      body: content,
  });
});
module.exports = router;
