import { defineField, defineType } from "sanity";

export declare type SendEmailType = {
  to: string;
  template: string;
};

export default defineType({
  name: "sendEmail",
  type: "object",
  title: "Email",
  fields: [
    defineField({
      name: "template",
      title: "Email Template Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "to",
      title: "Send Email to",
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
      template: "template",
      to: "to",
    },
    prepare(selection) {
      const { template, to } = selection;
      return {
        title: `Send ${template} to ${to}`,
      };
    },
  },
});
