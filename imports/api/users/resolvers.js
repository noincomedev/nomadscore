import Venues from "../venues/Venues";

export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    },
    search(obj, { coords }, { user }) {
      const { profile } = user;
      const { lastSearch } = profile;
      let restricted = false;
      if (Meteor.isDevelopment) {
        return { coords };
      }
      if (lastSearch) {
        const prevDate = new Date(lastSearch);
        const today = new Date();
        const diff = Math.abs(today.getTime() - prevDate.getTime());
        restricted = diff / (1000 * 60 * 60).toFixed(1) < 24;
      }
      if (restricted) {
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
        return { coords };
      }
    },
    voted(obj, { providerid }, { user }) {
      if (user) {
        const venue = Venues.findOne({ providerid });
        const { votes } = venue;
        const voteids = votes.map(vote => vote.owner);
        return {
          voted: voteids.includes(user._id)
        };
      }
      return { voted: false };
    }
  },
  Mutation: {
    submitVote(obj, { vote }, { user }) {
      if (user) {
        return Venues.update(
          { providerid: vote.venueid },
          {
            $addToSet: {
              votes: {
                owner: user._id,
                a: vote.a,
                b: vote.b
              }
            }
          }
        );
      }
      throw new Error("unauthorized");
    },
    setAsProspect(obj, args, { user }) {
      if (user) {
        const { profile } = user;
        profile.prospect = true;
        const userid = Meteor.users.update(
          { _id: user._id },
          { $set: { profile: { ...profile } } }
        );
        return Meteor.users.findOne({ _id: user._id });
      }
      throw new Error("unauthorized");
    }
  },
  User: {
    admin: user => (user.profile ? user.profile.admin : false),
    profile: user => {
      const { profile } = user;
      return profile;
    },
    prospect: ({ profile }) => {
      const { prospect } = profile;
      return prospect ? prospect : false;
    }
  }
};
