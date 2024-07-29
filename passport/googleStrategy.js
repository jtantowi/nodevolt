const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { googleAuth } = require('../configs');
const User = require('../database/models/user.model');
const {
  createNewGoogleUserService,
} = require('../database/services/modelServices/userServices');
const { handleAsyncFunction } = require('../utils/global-utils');

exports.googleAuthStrategy = new GoogleStrategy(
  {
    clientID: googleAuth.clientId,
    clientSecret: googleAuth.clientSecret,
    callbackURL: googleAuth.callbackUrl,
    passReqToCallback: true,
  },
  async (req, accessToken, _refreshToken, profile, done) => {
    console.log('Google callback executed');

    // Check if user is logged in
    if (!req.user) {
      console.log('No user in request, checking if user exists in database');
      const [userResults, error] = await handleAsyncFunction(
        User.findOne({ 'google.id': profile.id })
      );

      if (error) {
        console.error('Error finding user:', error);
        return done(error);
      }

      if (userResults) {
        // if there is a user id already but no token (user was linked at one point and then removed)
        if (!userResults.google.token) {
          console.log('User found, but no token. Updating user.');
          userResults.google.token = accessToken;
          userResults.google.name = profile.displayName;
          userResults.google.email = profile.emails[0].value.toLocaleLowerCase();
          userResults.profilePictureUrl = profile.photos[0].value;

          const [updatedUserResults, saveError] = await handleAsyncFunction(
            userResults.save()
          );

          if (saveError) {
            console.error('Error saving user:', saveError);
            return done(saveError);
          }

          return done(null, updatedUserResults);
        }

        return done(null, userResults);
      }

      console.log('Creating new Google user');
      const isGoogleUser = await createNewGoogleUserService(
        profile,
        accessToken
      );

      if (isGoogleUser instanceof Error) {
        console.error('Error creating Google user:', isGoogleUser);
        return done(isGoogleUser);
      }

      return done(null, isGoogleUser);
    }

    // user already exists and is logged in, we have to link accounts
    console.log('User already exists and is logged in, linking accounts');
    const { user } = req;

    user.google.id = profile.id;
    user.google.token = accessToken;
    user.google.name = profile.displayName;
    user.google.email = (profile.emails[0].value || '').toLocaleLowerCase();
    user.profilePictureUrl = profile.photos[0].value || '';

    const [updatedUser, updateError] = await handleAsyncFunction(user.save());

    if (updateError) {
      console.error('Error updating user:', updateError);
      return done(updateError);
    }

    return done(null, updatedUser);
  }
);
