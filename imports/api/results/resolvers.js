import Venues from "../venues/Venues";

export default {
  Result: {
    cafes: search => {
      if (Meteor.isDevelopment) {
        return Venues.find({ type: "cafe" }, { limit: 8 }).fetch();
      }

      const { lat, lng } = search.coords;
      const response = HTTP.call(
        "GET",
        "https://api.foursquare.com/v2/venues/search",
        {
          params: {
            client_id: Meteor.settings.private.foursquare.CLIENT_ID,
            client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
            ll: `${lat},${lng}`,
            categoryId: "4bf58dd8d48988d1e0931735,4bf58dd8d48988d1f0941735",
            v: "20180323",
            limit: 8,
            intent: "checkin",
            radius: 3500
          }
        }
      );

      const { data } = response;
      const { venues } = data.response;

      const venueids = venues.map(venue => venue.id);

      const cachedVenues = Venues.find({
        providerid: { $in: venueids }
      }).fetch();

      const cachedvenueids = cachedVenues.map(venue => venue.providerid);

      const idsToFetch = venueids.filter(id => !cachedvenueids.includes(id));

      const fetchedVenues = idsToFetch.map(id => {
        const result = HTTP.call(
          "GET",
          `https://api.foursquare.com/v2/venues/${id}`,
          {
            params: {
              client_id: Meteor.settings.private.foursquare.CLIENT_ID,
              client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
              v: "20180323"
            }
          }
        );

        const { venue } = result.data.response;

        const parseAddress = ({ address, city }) => {
          return `${address ? address + ", " : ""}${city ? city + "." : ""}`;
        };

        return {
          providerid: venue.id,
          name: venue.name,
          photourl:
            venue.photos.count > 0
              ? `${venue.bestPhoto.prefix}500x300${venue.bestPhoto.suffix}`
              : "/assets/placeholder.png",
          location: {
            address: parseAddress(venue.location),
            lat: venue.location.lat,
            lng: venue.location.lng
          },
          type: "cafe",
          votes: []
        };
      });

      fetchedVenues.forEach(venue => {
        Venues.insert(venue);
        cachedVenues.push(venue);
      });

      return cachedVenues;
    },
    hostels: search => {
      if (Meteor.isDevelopment) {
        return Venues.find({ type: "hostel" }, { limit: 8 }).fetch();
      }

      const { lat, lng } = search.coords;
      const response = HTTP.call(
        "GET",
        "https://api.foursquare.com/v2/venues/search",
        {
          params: {
            client_id: Meteor.settings.private.foursquare.CLIENT_ID,
            client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
            ll: `${lat},${lng}`,
            categoryId: "4bf58dd8d48988d1ee931735",
            v: "20180323",
            limit: 8,
            intent: "checkin",
            radius: 3500
          }
        }
      );

      const { data } = response;
      const { venues } = data.response;

      const venueids = venues.map(venue => venue.id);

      const cachedVenues = Venues.find({
        providerid: { $in: venueids }
      }).fetch();

      const cachedvenueids = cachedVenues.map(venue => venue.providerid);

      const idsToFetch = venueids.filter(id => !cachedvenueids.includes(id));

      const fetchedVenues = idsToFetch.map(id => {
        const result = HTTP.call(
          "GET",
          `https://api.foursquare.com/v2/venues/${id}`,
          {
            params: {
              client_id: Meteor.settings.private.foursquare.CLIENT_ID,
              client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
              v: "20180323"
            }
          }
        );

        const { venue } = result.data.response;

        const parseAddress = ({ address, city }) => {
          return `${address && address + ", "}${city && city + "."}`;
        };

        return {
          providerid: venue.id,
          name: venue.name,
          photourl:
            venue.photos.count > 0
              ? `${venue.bestPhoto.prefix}500x300${venue.bestPhoto.suffix}`
              : "/assets/placeholder.png",
          location: {
            address: parseAddress(venue.location),
            lat: venue.location.lat,
            lng: venue.location.lng
          },
          type: "hostel",
          votes: []
        };
      });

      fetchedVenues.forEach(venue => {
        Venues.insert(venue);
        cachedVenues.push(venue);
      });

      return cachedVenues;
    }
  }
};
