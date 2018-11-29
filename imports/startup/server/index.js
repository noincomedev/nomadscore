import { Meteor } from "meteor/meteor";

import "./accounts";
import "./api";

import Venues from "../../api/venues/Venues";

Meteor.startup(() => {
  console.log("server started");

  if (Meteor.isDevelopment) {
    const venues = Venues.find().fetch();
    if (venues.length == 0) {
      const MOCK_DATA = Array.from({ length: 16 }, (item, index) => ({
        providerid: Random.id(8),
        name: "The Princesa Insolente Hostel",
        photourl:
          "https://fastly.4sqi.net/img/general/500x300/20039797_gbGf9AcL5CVoMorQiSlSk1zD9mGUA5Xv_-evv11R3YA.jpg",
        location: {
          lat: -33.4441805115594,
          lng: -70.668845936179,
          address: "street name, city"
        },
        type: index % 2 == 0 ? "hostel" : "cafe",
        votes: []
      }));
      MOCK_DATA.forEach(item => Venues.insert(item));
    }
  }
});
