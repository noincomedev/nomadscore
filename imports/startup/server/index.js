import { Meteor } from "meteor/meteor";

import "./accounts";
import "./api";

import Venues from "../../api/venues/Venues";

Meteor.startup(() => {
  console.log("server started");
});
