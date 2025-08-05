import { query } from "./_generated/server";

export const listProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  }
});