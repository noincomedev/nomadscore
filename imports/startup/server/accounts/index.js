ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.upsert(
  {
    service: "facebook"
  },
  {
    $set: {
      appId: Meteor.settings.private.facebook.APP_ID,
      loginStyle: "popup",
      secret: Meteor.settings.private.facebook.APP_SECRET
    }
  }
);

ServiceConfiguration.configurations.upsert(
  {
    service: "google"
  },
  {
    $set: {
      clientId: Meteor.settings.private.google.CLIENT_ID,
      secret: Meteor.settings.private.google.APP_SECRET
    }
  }
);

Accounts.onCreateUser((options, user) => {
  const { profile } = options;
  if (user.services.facebook) {
    const { facebook } = user.services;
    const { picture } = facebook;
    const { url } = picture.data;
    profile.imgurl = url;
  }
  if (user.services.google) {
    const { google } = user.services;
    const { picture } = google;
    profile.imgurl = picture;
  }
  user.profile = profile;
  return user;
});
