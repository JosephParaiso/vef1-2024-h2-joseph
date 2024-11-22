import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null; //initialzing foundType?

  //this code from the teacher is to check if type in the window search is appropriate
  if (indexJson.navigation.find((i) => i.slug === type)) {
    foundType = type;
  }

  let mainElement;

  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
  } else {
    const contentJsonFile = `data/${type}/index.json`;

    const contentJson = await fetcher(contentJsonFile);
    const content = contentJson.content;

    const contentElement = document.createElement("div");

    for (const item of content) {
      const itemElement = document.createElement("section");
      const button = document.createElement("button");
      button.textContent = item.title;

      //button becomes child of section
      itemElement.appendChild(button);

      //button hides sibling div
      button.addEventListener("click", (e) => {
        if (!e) {
          return;
        }
        const contentDiv = e?.target?.parentElement?.querySelector("div");
        contentDiv.classList.toggle("hidden");
      });

      //add link
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("hidden");

      const itemText = document.createElement("p");
      itemText.textContent = item.text;

      //Content link
      const href = `/?type=${type}&content=${item.slug}`;
      const itemContentLink = el("a", { href }, item.type);

      itemContainer.appendChild(itemContentLink);
      itemContainer.appendChild(itemText);

      itemElement.appendChild(itemContainer);

      contentElement.appendChild(itemElement);
    }

    mainElement = el("main", {}, contentElement);
  }

  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
