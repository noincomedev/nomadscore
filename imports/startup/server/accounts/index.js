Accounts.onCreateUser((options, user) => {
  const prospect = {
    prospect: false
  };
  user.profile = prospect;
  return user;
});
