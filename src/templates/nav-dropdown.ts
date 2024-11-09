import { html, TemplateResult, until } from "../lib";

export const navDropdownTemplate = (
    onClickNavLinkHandler: (e: Event) => void,
    onMouseEenterDropdownItemHandler: (e: Event) => void,
    onMouseLeaveDropdownItemHandler: (e: Event) => void,
    dataI18n: string,
    navDropdownLinks: TemplateResult
): TemplateResult => html`
    <li
        class="dropdown-item noSelect"
        @mouseenter=${onMouseEenterDropdownItemHandler}
        @mouseleave=${onMouseLeaveDropdownItemHandler}>
        <div class="nav-link" @click=${onClickNavLinkHandler}>
            <span data-i18n=${dataI18n}></span>
            <i class="fa-solid fa-caret-down dropdown-arrow"></i>
        </div>
        <ul class="dropdown-menu">
            ${until(navDropdownLinks, html`<p>Loading...</p>`)}
        </ul>
    </li>
`;
