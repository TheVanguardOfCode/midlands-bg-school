import { html, TemplateResult } from "../lib";

export const navLinkTemplate = (
    onClickNavLinkHandler: (e: Event) => void,
    dataI18n: string
): TemplateResult => html`
    <li class="noSelect">
        <a
            href="javascript:void(0)"
            class="nav-link"
            data-i18n=${dataI18n}
            @click=${onClickNavLinkHandler}></a>
    </li>
`;
