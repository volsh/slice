import { SanityDocument } from "next-sanity";

export type ActionParamsType = SanityDocument & {
  parallel?: boolean;
};
