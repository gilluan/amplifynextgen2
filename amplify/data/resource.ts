import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const biduHandler = defineFunction({
  entry: "./bidu/handler",
});

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(["low", "medium", "high"]),
    })
    .authorization([a.allow.owner()]),
  Profile: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
    })
    .authorization([a.allow.owner()]),
  BiduResponse: a.customType({
    text: a.string(),
    bidu: a.string(),
  }),
  bidu: a
    .query()
    .arguments({
      text: a.string(),
    })
    .returns(a.ref("BiduResponse"))
    .authorization([a.allow.owner()])
    .function("biduHandler"),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  functions: {
    biduHandler: biduHandler,
  },
});
