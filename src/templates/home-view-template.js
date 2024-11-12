import { html, until } from "../lib.js";
export const homeViewTemplate = (
  homeViewParallaxSection,
  homeViewInfoSection,
) => html`
  <section class="parallax" id="parallax">
    ${until(homeViewParallaxSection, html`<p>Loading...</p>`)}
  </section>
  <section class="info">
    ${until(homeViewInfoSection, html`<p>Loading...</p>`)}
  </section>
`;
