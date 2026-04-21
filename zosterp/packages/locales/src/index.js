import enJoi from "./en/joi.json" with { type: "json" };
import enWeb from "./en/web.json" with { type: "json" };

export const languageList = ["en"];
export const resources = {
  en: {
    translation: {
      ...enJoi,
      ...enWeb,
    },
  },
};
