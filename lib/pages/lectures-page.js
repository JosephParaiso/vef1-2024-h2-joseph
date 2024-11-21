import { el } from "../elements";
import { renderNavigation } from "../components/navigation";
import { translateLectureContentJson } from "../translate-function";
export function renderContentLecturePage(root, indexJson, contentJsonFile, lectureSlug) {
    console.log('rendering content lecture page');

    //headerElement and main
    const headerElement = el('header', {}, el('h1', {}, indexJson.title));
    headerElement.appendChild(renderNavigation(indexJson.navigation));

    const mainElement = el('main', {}, );

    //Find the index of which lectureSlug is located
    const lectureIndex = contentJsonFile.lectures.findIndex(lecture => lecture.slug === lectureSlug);

    const contentJson = contentJsonFile.lectures[lectureIndex].content;

    //heading 2 (also in body)
    const heading2 = el('h2', {}, contentJsonFile.lectures[lectureIndex].slug);
    mainElement.appendChild(heading2);
    //lectureContent body
    const contentDiv = translateLectureContentJson(contentJson);
    mainElement.appendChild(contentDiv);

    root.appendChild(headerElement);
    root.appendChild(mainElement);
}