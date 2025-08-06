import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  projects: defineTable({
    client: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    links: v.record(v.string(), v.string())
  }),
  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string()
  })
});