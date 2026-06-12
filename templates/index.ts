import { christianTemplates } from "./christianTemplates";
import { generalTemplates } from "./generalTemplates";
import { hinduTemplates } from "./hinduTemplates";
import { muslimTemplates } from "./muslimTemplates";
import { sikhTemplates } from "./sikhTemplates";

export const allTemplates = [
  ...hinduTemplates,
  ...muslimTemplates,
  ...sikhTemplates,
  ...christianTemplates,
  ...generalTemplates
];
