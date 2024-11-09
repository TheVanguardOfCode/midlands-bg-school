import { html } from "../lib.js";
export const navDropdownLinkTemplate = (onClickDropdownLinkHandler, dataI18n) =>
  html`<li>
    <a
      href="javascript:void(0)"
      class="dropdown-link"
      data-i18n=${dataI18n}
      @click=${onClickDropdownLinkHandler}
    ></a>
  </li>`;
