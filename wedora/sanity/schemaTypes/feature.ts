import { defineType, defineField } from "sanity"

export default defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Use: clock, shield, star, message, calendar, dollar",
    }),
  ],
})