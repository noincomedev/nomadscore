import React from "react";

export default ({ active, providercategoryid }) => {
  const cafesids = Meteor.settings.public.foursquare.request.categoryids.CAFES.split(
    ","
  );

  const isCafe = cafesids.includes(providercategoryid);

  const src = `/assets/${isCafe ? "cafe" : "hostel"}-marker${
    active ? "-active" : ""
  }.png`;
  return <img src={src} style={{ maxHeight: "8vh" }} />;
};
