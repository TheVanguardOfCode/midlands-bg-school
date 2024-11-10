import { html, TemplateResult } from "../lib";

export const navDropdownLinkTemplate = (
    onClickDropdownLinkHandler: (e: Event) => void,
    dataI18n: string
): TemplateResult =>
    html`<li>
        <a
            href="javascript:void(0)"
            class="dropdown-link"
            data-i18n=${dataI18n}
            @click=${onClickDropdownLinkHandler}></a>
    </li>`;
