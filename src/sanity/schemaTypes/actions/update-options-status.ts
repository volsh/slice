import { defineField, defineType } from "sanity";

export declare type SendEmailType = {
  to: string;
  template: string;
};

export default defineType({
  name: "updateOptionsStatus",
  type: "object",
  title: "Grants of Options Status Update",
  fields: [
    defineField({
      name: "to",
      title: "Employee",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Options Status",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parallel",
      title: "Parallel",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      to: "to",
      status: "status",
    },
    prepare(selection) {
      const { to, status } = selection;
      return {
        title: `Update options status for ${to} to ${status}`,
      };
    },
  },
});
