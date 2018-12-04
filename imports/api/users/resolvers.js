import Venues from "../venues/Venues";

export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    }
  },
  Mutation: {
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
    },
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
