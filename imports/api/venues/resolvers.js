import Venues from "./Venues";

export default {
  Query: {
    venue: async (obj, { providerid }, { user, dataSources }) => {
      const cachedVenue = Venues.findOne({ providerid });
      if (cachedVenue) return cachedVenue;
      const result = await dataSources.FoursquareAPI.getVenue(providerid);
      const { venue } = result.response;
      return venue;
    },
    venues: async (obj, { coords, categories }, { user, dataSources }) => {
      if (Meteor.isDevelopment) {
        return Venues.find({}, { limit: 10 }).fetch();
      }
      const { profile } = user;
      const { lastSearch } = profile;
      let restricted = false;

      // Not restricted on development mode
      if (!Meteor.isDevelopment && lastSearch) {
        const prevDate = new Date(lastSearch);
        const today = new Date();
        const diff = Math.abs(today.getTime() - prevDate.getTime());
        restricted = diff / (1000 * 60 * 60).toFixed(1) < 24;
        if (restricted)
          throw new Error(Meteor.settings.public.error.DAILY_LIMIT);
      } else {
        const updatedProfile = {
          ...profile,
          lastSearch: new Date()
        };

        Meteor.users.update(
          { _id: user._id },
          { $set: { profile: updatedProfile } }
        );

        const categoryId = cats => {
          const hostelsid =
            Meteor.settings.private.foursquare.request.categoryids.HOSTELS;
          const cafesid =
            Meteor.settings.private.foursquare.request.categoryids.CAFES;
          const ids = [];
          if (cats.hostels) ids.push(hostelsid);
          if (cats.cafes) ids.push(cafesid);
          return ids.join(",");
        };

        const result = await dataSources.FoursquareAPI.getVenues(
          coords,
          categoryId(categories)
        );

        const { venues } = result.response;

        return venues.map(venue => ({
          providerid: venue.id,
          providercategoryid: venue.categories[0].id,
          name: venue.name,
          location: {
            lat: venue.location.lat,
            lng: venue.location.lng
          }
        }));
      }
    }
  },
  Venue: {
    score: ({ providerid }) => {
      const venue = Venues.findOne({ providerid });
      const { votes } = venue;
      if (votes) {
        const scores = [];
        venue.votes.forEach(vote => scores.push(vote.score));
        return scores.reduce((a, b) => a + b, 0) / venue.votes.length;
      } else {
        return 0;
      }
    },
    voted: ({ providerid }, args, { user }) => {
      const venue = Venues.findOne({ providerid });
      const userids = venue.votes.map(vote => vote.owner);
      return userids.includes(user._id);
    }
  }
};
