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

    const venuecategoryids = venue.categories.map(category => category.id);

    const isHostel = venuecategoryids.includes(
      Meteor.settings.private.foursquare.request.categoryids.HOSTELS
    );

    const hostelcategoryid =
      Meteor.settings.private.foursquare.request.categoryids.HOSTELS;
    const cafecategoryid = Meteor.settings.private.foursquare.request.categoryids.CAFES.split(
      ","
    )[0];

    const cachedVenue = Venues.insert({
      providerid: venue.id,
      providercategoryid: isHostel ? hostelcategoryid : cafecategoryid,
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
      type: isHostel ? "hostel" : "cafe",
      votes: []
    });

    return Venues.findOne({ _id: cachedVenue });
  }
}

export default FoursquareAPI;
