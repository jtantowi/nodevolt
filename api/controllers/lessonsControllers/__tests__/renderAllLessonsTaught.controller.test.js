const {
  renderAllLessonsTaughtController,
} = require('../renderAllLessonsTaught.controller');
const {
  setupReqRes,
  clearMocks,
} = require('../../../../utils/test-utils/courseControllerDeps');
const {
  render500ErrorHelper,
  redirectNonExistentDataHelper,
} = require('../../helpers');
const {
  validateMockValueToHaveBeenCalled,
} = require('../../../../utils/test-utils/validators.utils');
const {
  findOneCourseService,
} = require('../../../../database/services/modelServices/courseServices');

jest.mock('../../helpers');
jest.mock('../../../../database/services/modelServices/courseServices');

let req;
let res;

describe('renderAllLessonsTaught Controller Test Suite', () => {
  beforeEach(() => {
    const { request, response } = setupReqRes();
    req = request;
    res = response;
  });

  afterEach(() => {
    clearMocks();
  });

  test('should validate render500ErrorHelper is called', async () => {
    findOneCourseService.mockReturnValueOnce(new Error());

    await renderAllLessonsTaughtController(req, res);

    validateMockValueToHaveBeenCalled(render500ErrorHelper);
  });

  test('should validate redirectNonExistentDataHelper is called', async () => {
    findOneCourseService.mockReturnValueOnce(null);

    await renderAllLessonsTaughtController(req, res);

    validateMockValueToHaveBeenCalled(redirectNonExistentDataHelper);
  });

  test('should validate res.status & res.render is called', async () => {
    await renderAllLessonsTaughtController(req, res);

    const { status, render } = res;

    validateMockValueToHaveBeenCalled(status);
    validateMockValueToHaveBeenCalled(render);
  });
});
