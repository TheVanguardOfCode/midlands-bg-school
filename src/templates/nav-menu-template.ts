import { html, until, TemplateResult } from "../lib";

export const navMenuTemplate = (
    navMenuList: TemplateResult
): TemplateResult => html`
    <div class="nav-menu" id="navMenu">
        <ul class="nav-list">
            ${until(navMenuList, html`<p>Loading...</p>`)}
        </ul>
    </div>
`;
