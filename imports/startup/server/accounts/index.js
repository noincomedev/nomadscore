Accounts.onCreateUser((options, user) => {
  const profile = {
    prospect: false,
    restricted: false
  };
  user.profile = profile;
  return user;
});
