import { Meteor } from "meteor/meteor";

import "./accounts";
import "./api";

Meteor.startup(() => {
  console.log("server started");
  // Accounts.createUser({
  //   email: "root@nomadscore.com",
  //   password: "123456",
  //   profile: {
  //     name: "Tablrz Root",
  //     admin: true
  //   }
  // });
});
