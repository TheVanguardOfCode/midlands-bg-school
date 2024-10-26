import { TemplateResult } from "../lib.js";
import { Locales } from "../model/locales-query.types";

export type Context = {
    render: (template: TemplateResult) => void;
    i18nText: Locales;
};
