import { RESTDataSource } from "apollo-datasource-rest";

import Venues from "../../venues/Venues";

class FoursquareAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.foursquare.com/v2/venues/";
  }

  async getVenues(coords, categoryId) {
    const { lat, lng } = coords;
    const params = {
      client_id: Meteor.settings.private.foursquare.CLIENT_ID,
      client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
      ll: `${lat},${lng}`,
      categoryId: categoryId,
      v: Meteor.settings.private.foursquare.API_VERSION,
      limit: Meteor.settings.private.foursquare.request.LIMIT,
      intent: Meteor.settings.private.foursquare.request.INTENT,
      radius: Meteor.settings.private.foursquare.request.RADIUS
    };

    return this.get("search", params);
  }

  async getVenue(id) {
    const result = await this.get(`${id}`, {
      client_id: Meteor.settings.private.foursquare.CLIENT_ID,
      client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
      v: Meteor.settings.private.foursquare.API_VERSION
    });

    const { venue } = result.response;

    const parseAddress = ({ address, city }) => {
      return `${address ? address + ", " : ""}${city ? city + "." : ""}`;
    };

    const cachedVenue = Venues.insert({
      providerid: venue.id,
      name: venue.name,
      photourl:
        venue.photos.count > 0
          ? `${venue.bestPhoto.prefix}300x300${venue.bestPhoto.suffix}`
          : "/assets/placeholder.png",
      location: {
        address: parseAddress(venue.location),
        lat: venue.location.lat,
        lng: venue.location.lng
      },
      votes: []
    });

    return cachedVenue;
  }
}

export default FoursquareAPI;
