exports.renderRegistrationFormWithErrorsHelper = (response, request, error) => {
  const { firstName, lastName, email, username, password } = request.body;

  response.status(400).render('users/auth/register', {
    firstName,
    lastName,
    email,
    username,
    password,
    errors: error.array(),
  });
};
