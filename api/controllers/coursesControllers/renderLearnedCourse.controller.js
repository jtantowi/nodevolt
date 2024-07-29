const {
  findOneCourseService,
} = require('../../../database/services/modelServices/courseServices');
const {
  render500ErrorHelper,
  redirectNonExistentDataHelper,
} = require('../helpers');

exports.renderLearnedCourseController = async (req, res) => {
  const { id } = req.params;
  const { local } = req.user;

  const isCourse = await findOneCourseService(id);

  if (isCourse instanceof Error) {
    render500ErrorHelper(res);
    return;
  }

  if (isCourse === null) {
    redirectNonExistentDataHelper(req, res);
    return;
  }

  res.status(200).render('users/students/course-learned', {
    local,
    isCourse,
  });
};
