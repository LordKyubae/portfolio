import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  }
});

export const addContactMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactMessages", args);
  }
});