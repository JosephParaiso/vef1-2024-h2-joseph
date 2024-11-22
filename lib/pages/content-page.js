import { renderNavigation } from "../components/navigation";
import { el } from "../elements";

export function renderContentPage(root, indexJson, contentJson) {
  console.log("rendering content page", root, indexJson.title);

  const headerElement = el("header", {}, el("h1", {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el("main", {});

  if (contentJson.lectures) {
    const lectures = contentJson.lectures;
    console.log("Hello! contentJsonFile.lectures exists!");

    const lecturesLinkContainer = el("div", { class: "lecture-links" });

    const currentUrl = window.location.href;
    //creates a link for each slug and append it to the link container
    lectures.forEach((lecture) => {
      const href = `${currentUrl}&lecture=${lecture.slug}`;
      const lectureLink = el("a", { href }, lecture.title);
      lecturesLinkContainer.appendChild(lectureLink);
    });
    mainElement.appendChild(lecturesLinkContainer);
  } else {
    const container = document.createElement("div");

    const imgElement = el("img", { src: "img/cat.jpg", alt: "cat" });

    const textElement = el("p", {}, "Þessi auka virkni var sleppt 😔");

    container.appendChild(imgElement);
    container.appendChild(textElement);

    mainElement.appendChild(container);
  }
  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
