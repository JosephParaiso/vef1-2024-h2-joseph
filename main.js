import { fetcher } from './lib/fetcher.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';
import { renderContentLecturePage } from './lib/pages/lectures-page.js';
import { el } from './lib/elements.js';

async function render(root, querystring) {
  const mainIndexJson = await fetcher('/data/index.json');

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');
  const lectureSlug = params.get('lecture');

  console.log(`type: ${type} content: ${content} lectureSlug: ${lectureSlug}`);

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  //We start checking for the deepest site first and work our way down
  if (type && content && lectureSlug) {
    console.log('attempting to render lectureslug page');
    const contentJson = await fetcher(`data/${type}/${content}.json`);
    return renderContentLecturePage(root, mainIndexJson, contentJson, lectureSlug);
  }
  if (type && content) {
    const contentJson = await fetcher(`data/${type}/${content}.json`);
    console.log('attempting to render Content Page');
    return renderContentPage(root, mainIndexJson, contentJson);
  }
  if (type) {
    console.log('attempting to render sub page');
    return renderSubpage(root, mainIndexJson, type);
  }
}

const root = document.querySelector('#app');

render(root, window.location.search);
