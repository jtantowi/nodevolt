const { filterCoursesHelper, render500ErrorHelper } = require('../helpers');
const {
  findAllCoursesService,
} = require('../../../database/services/modelServices/courseServices');

exports.renderMyCoursesController = async (req, res) => {
  const { _id, local, role } = req.user;

  const isAllCourses = await findAllCoursesService();

  if (isAllCourses instanceof Error) {
    render500ErrorHelper(res);
    return;
  }

  const { coursesTaught, coursesLearned } = filterCoursesHelper(
    isAllCourses,
    _id
  );

  const user = { role, coursesTaught, coursesLearned };

  res.status(200).render('users/common/my-courses', {
    user,
    local,
  });
};
