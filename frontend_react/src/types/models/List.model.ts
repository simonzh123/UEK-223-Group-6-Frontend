import { User } from "./User.model";

export type List = {
  id: string;
  title: string;
  text: string;
  importance: Importance;
  createdAt: Date;
  user: User;
};

export type ListDTO = {
  id: string;
  title: string;
  text: string;
  importance: string;
  createdAt: string;
  user: User;
};

export enum Importance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum SortByListCategories {
  DATE = "DATE",
  IMPORTANCE = "IMPORTANCE",
  USER = "USER",
}
