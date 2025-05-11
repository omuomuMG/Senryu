import { create } from "zustand";

type Content = {
  id: string;
  title: string;
  body: string;
  firstPart?: string;
  middlePart?: string;
  lastPart?: string;
};

type ContentState = {
  id: string;
  title: string;
  body: string;
  firstPart?: string;
  middlePart?: string;
  lastPart?: string;
  getContent: (content: Content) => void;
};

export const useStore = create<ContentState>((set) => ({
  id: "",
  title: "",
  body: "",
  firstPart: "",
  middlePart: "",
  lastPart: "",
  getContent: (content: Content) =>
    set({
      id: content.id,
      title: content.title,
      body: content.body,
      firstPart: content.firstPart,
      middlePart: content.middlePart,
      lastPart: content.lastPart,
    }),
}));
