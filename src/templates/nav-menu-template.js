import { html, until } from "../lib.js";
export const navMenuTemplate = (navMenuList) => html`
  <div class="nav-menu" id="navMenu">
    <ul class="nav-list">
      ${until(navMenuList, html`<p>Loading...</p>`)}
    </ul>
  </div>
`;
