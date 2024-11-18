import { el } from '../elements.js';

export function renderNavigation(navigation, onClickHandler) {
  /*
  <nav>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
  </nav>
  */
  const navigationElement = el('ul', { class: 'navigation__list' });

  for (const item of navigation) {
    const { title, slug } = item;
    /* sama og
    const title = item.title;
    const slug = item.slug;
    */
    const href = `/?type=${slug}`;
    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      el('a', { href, class: 'navigation__link' }, title),
    );

    //History API dót
    navItemElement.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', href);

      if (onClickHandler) {
        onClickHandler(href);
      }
    });

    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
}
