import { html, until, TemplateResult } from "../lib";

export const homeViewTemplate = (
    homeViewParallaxSection: TemplateResult
): TemplateResult => html`
    <section class="parallax" id="parallax">
        ${until(homeViewParallaxSection, html`<p>Loading...</p>`)}
    </section>
`;
