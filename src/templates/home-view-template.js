import { html, until } from "../lib.js";
export const homeViewTemplate = (homeViewParallaxSection) => html`
  <section class="parallax" id="parallax">
    ${until(homeViewParallaxSection, html`<p>Loading...</p>`)}
  </section>
`;
