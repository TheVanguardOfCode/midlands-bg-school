import { html, until } from "../lib.js";
export const navDropdownTemplate = (
  onClickNavLinkHandler,
  onMouseEenterDropdownItemHandler,
  onMouseLeaveDropdownItemHandler,
  dataI18n,
  navDropdownLinks,
) => html`
  <li
    class="dropdown-item noSelect"
    @mouseenter=${onMouseEenterDropdownItemHandler}
    @mouseleave=${onMouseLeaveDropdownItemHandler}
  >
    <div class="nav-link" @click=${onClickNavLinkHandler}>
      <span data-i18n=${dataI18n}></span>
      <i class="fa-solid fa-caret-down dropdown-arrow"></i>
    </div>
    <ul class="dropdown-menu">
      ${until(navDropdownLinks, html`<p>Loading...</p>`)}
    </ul>
  </li>
`;
