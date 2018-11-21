import Votes from "../votes/Votes";

export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    },
    nearVenues(obj, { coords }, { user }) {
      const { lat, lng } = coords;
      const venuesResult = HTTP.call(
        "GET",
        "https://api.foursquare.com/v2/venues/search",
        {
          params: {
            client_id: Meteor.settings.private.foursquare.CLIENT_ID,
            client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
            ll: `${lat},${lng}`,
            categoryId:
              "4bf58dd8d48988d1f0941735,4bf58dd8d48988d174941735,4bf58dd8d48988d1ee931735",
            v: "20180323",
            limit: 25,
            intent: "checkin",
            radius: 5000
          }
        }
      );

      const { data } = venuesResult;
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

      return venues.map(item => {
        const category = getCategory(item.categories);
        return {
          _id: item.id,
          name: item.name,
          location: { lat: item.location.lat, lng: item.location.lng },
          category
        };
      });
    }
  },
  Mutation: {
    submitVote(obj, { vote }, { user }) {
      if (user) {
        const { venueid, a, b } = vote;
        const voteid = Votes.insert({ owner: user._id, venueid, a, b });
        return { _id: voteid };
      }
      throw new Error("unauthorized");
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
