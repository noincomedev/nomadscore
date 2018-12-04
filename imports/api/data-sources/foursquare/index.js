import { RESTDataSource } from "apollo-datasource-rest";

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

  async getVenueDetails(id) {
    const result = await this.get(`${id}`, {
      client_id: Meteor.settings.private.foursquare.CLIENT_ID,
      client_secret: Meteor.settings.private.foursquare.CLIENT_SECRET,
      v: Meteor.settings.private.foursquare.API_VERSION
    });
    const { venue } = result.response;
    return venue;
  }
}

export default FoursquareAPI;
