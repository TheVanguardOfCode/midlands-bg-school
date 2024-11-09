import { html, until } from "../lib.js";
export const navMenuTemplate = (navMenuList) => html`
  <div class="nav-menu" id="navMenu">
    <ul class="nav-list">
      ${until(navMenuList, html`<p>Loading...</p>`)}
    </ul>
  </div>
`;
//onClickNavLinkHandler: (e: Event) => void,
//onClickDropdownLinkHandler: (e: Event) => void,
//onMouseEenterDropdownItemHandler: (e: Event) => void,
//onMouseLeaveDropdownItemHandler: (e: Event) => void,
// <li class="noSelect">
//                 <a
//                     href="javascript:void(0)"
//                     class="nav-link"
//                     data-i18n="header.nav-link-1"
//                     @click=${onClickNavLinkHandler}></a>
//             </li>
//             <!-- Dropdown 1 -->
//             <li
//                 class="dropdown-item noSelect"
//                 @mouseenter=${onMouseEenterDropdownItemHandler}
//                 @mouseleave=${onMouseLeaveDropdownItemHandler}>
//                 <div class="nav-link" @click=${onClickNavLinkHandler}>
//                     <span data-i18n="header.nav-link-2"></span>
//                     <i class="fa-solid fa-caret-down dropdown-arrow"></i>
//                 </div>
//                 <ul class="dropdown-menu">
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-1"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-2"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-3"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-4"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-5"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-6"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-2-7"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                 </ul>
//             </li>
//             <!-- Dropdown 2 -->
//             <li
//                 class="dropdown-item noSelect"
//                 @mouseenter=${onMouseEenterDropdownItemHandler}
//                 @mouseleave=${onMouseLeaveDropdownItemHandler}>
//                 <div class="nav-link" @click=${onClickNavLinkHandler}>
//                     <span data-i18n="header.nav-link-3"></span>
//                     <i class="fa-solid fa-caret-down dropdown-arrow"></i>
//                 </div>
//                 <ul class="dropdown-menu">
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-3-1"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-3-2"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                 </ul>
//             </li>
//             <!-- Dropdown 3 -->
//             <li
//                 class="dropdown-item noSelect"
//                 @mouseenter=${onMouseEenterDropdownItemHandler}
//                 @mouseleave=${onMouseLeaveDropdownItemHandler}>
//                 <div class="nav-link" @click=${onClickNavLinkHandler}>
//                     <span data-i18n="header.nav-link-4"></span>
//                     <i class="fa-solid fa-caret-down dropdown-arrow"></i>
//                 </div>
//                 <ul class="dropdown-menu">
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-4-1"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                     <li>
//                         <a
//                             href="javascript:void(0)"
//                             class="dropdown-link"
//                             data-i18n="header.dropdown-link-4-2"
//                             @click=${onClickDropdownLinkHandler}></a>
//                     </li>
//                 </ul>
//             </li>
//             <li class="noSelect">
//                 <a
//                     href="javascript:void(0)"
//                     class="nav-link"
//                     data-i18n="header.nav-link-5"
//                     @click=${onClickNavLinkHandler}></a>
//             </li>
