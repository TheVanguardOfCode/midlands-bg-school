import { html } from "../lib.js";
export const navLinkTemplate = (onClickNavLinkHandler, dataI18n) => html`
  <li class="noSelect">
    <a
      href="javascript:void(0)"
      class="nav-link"
      data-i18n=${dataI18n}
      @click=${onClickNavLinkHandler}
    ></a>
  </li>
`;
