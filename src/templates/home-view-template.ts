import { html, until, TemplateResult } from "../lib";

export const homeViewTemplate = (
    homeViewParallaxSection: TemplateResult,
    homeViewInfoSection: TemplateResult
): TemplateResult => html`
    <section class="parallax" id="parallax">
        ${until(homeViewParallaxSection, html`<p>Loading...</p>`)}
    </section>
    <section class="info">
        ${until(homeViewInfoSection, html`<p>Loading...</p>`)}
    </section>
`;
