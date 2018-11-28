import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Venues = new Mongo.Collection("venues");

Venues.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Venues.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let coordsSchema = new SimpleSchema({
  lat: Number,
  lng: Number,
  address: String
});

let voteSchema = new SimpleSchema({
  owner: {
    type: String,
    label: "Owner id",
    optional: false
  },
  a: {
    type: SimpleSchema.Integer,
    label: "A",
    optional: false
  },
  b: {
    type: SimpleSchema.Integer,
    label: "B",
    optional: false
  }
});

Venues.schema = new SimpleSchema({
  status: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  providerid: {
    type: String,
    label: "Provider id",
    optional: false
  },
  createdAt: {
    type: String,
    label: "The date this venue was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this venue was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  photourl: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: false
  },
  location: {
    type: coordsSchema,
    optional: false
  },
  type: {
    type: String,
    optional: false
  },
  votes: { type: Array, optional: true },
  "votes.$": { type: voteSchema, optional: true }
});

Venues.attachSchema(Venues.schema);

export default Venues;
