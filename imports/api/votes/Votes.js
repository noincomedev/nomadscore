import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Votes = new Mongo.Collection("votes");

Votes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Votes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Votes.schema = new SimpleSchema({
  status: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  createdAt: {
    type: String,
    label: "The date this table was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this table was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  venueid: { type: String, optional: false },
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

Votes.attachSchema(Votes.schema);

export default Votes;
