export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    },
    nearVenues(obj, { near }, { user }) {
      const result = HTTP.call(
        "GET",
        "https://api.foursquare.com/v2/venues/search",
        {
          params: {
            client_id: Meteor.settings.private.foursquare.CLIENT_ID,
            client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
            near,
            categoryId:
              "4bf58dd8d48988d1f0941735,4bf58dd8d48988d174941735,4bf58dd8d48988d1ee931735",
            v: "20180323",
            limit: 25,
            intent: "browse",
            radius: 5000
          }
        }
      );

      const { data } = result;
      const { venues } = data.response;

      const categoryids = [
        "4bf58dd8d48988d1f0941735",
        "4bf58dd8d48988d174941735",
        "4bf58dd8d48988d1ee931735"
      ];

      const getCategory = categories => {
        const category = { name: "", _id: "" };
        categories.forEach(cat => {
          if (categoryids.includes(cat.id)) {
            category.name = cat.name;
            category._id = cat.id;
          }
        });
        return category;
      };

      return venues.map(venue => {
        const category = getCategory(venue.categories);
        return {
          _id: venue.id,
          name: venue.name,
          location: { lat: venue.location.lat, lng: venue.location.lng },
          category
        };
      });
    }
  },
  User: {
    admin: user => (user.profile ? user.profile.admin : false),
    profile: user => {
      const { profile } = user;
      return profile;
    }
  }
};
