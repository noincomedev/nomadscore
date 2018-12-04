Accounts.onCreateUser((params, user) => {
  const { profile } = params;
  profile.restricted = false;
  user.profile = profile;
  return user;
});
