import { defineField, defineType } from "sanity";
import { ActionParamsType } from "../actions/interfaces";
import { SanityDocument } from "next-sanity";

export declare type WorkflowType = SanityDocument & {
  title: string;
  // trigger: string;
  workflowId: string;
  actions: Array<ActionParamsType>;
};

export default defineType({
  name: "workflow",
  type: "document",
  title: "Workflow",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "trigger",
    //   title: "Trigger",
    //   type: "string",
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "workflowId",
      title: "Workflow ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [{ type: "delay" }, { type: "updateOptionsStatus" }, { type: "sendEmail" }],
    }),
  ],
});
