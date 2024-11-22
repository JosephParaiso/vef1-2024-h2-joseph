import { el } from "./elements";

/**
 * "Translates" the content json array put in it and outputs the data in an html div container, each index being its own html element
 * @param {Object} contentJson - the content array data in the lectures.json
 * @returns A div container containing an appropriate element for each index of the array
 */
export function translateLectureContentJson(contentJson) {
  const container = el("div", { class: "lecture-div" }); // container to hold elements

  for (const item of contentJson) {
    if (!("type" in item && "data" in item)) {
      console.log(
        "type or data in contentJson.array does not exist, skipping..."
      );
      continue; //skips the current iteration
    }
    const type = item.type;
    const data = item.data;
    //|| otherwise null
    const caption = item.caption || null;
    const attribute = item.attribute || null;
    let element;

    //create data element based off of type.
    switch (type) {
      case "quote":
        element = el("blockquote", {}, data);
        //only add the attribute if it is cite
        if (attribute === "cite") {
          const cite = el("cite", {}, `— ${attribute}`);
          element.appendChild(cite);
        }
        break;

      case "image": {
        const img = el("img", { src: `/${data}`, alt: caption || "image" });

        if (caption) {
          console.log("if caption encountered");
          const figcaption = el("figcaption", {}, caption);

          const imageContainer = el("div", {}, img, figcaption);

          element = imageContainer;
        } else {
          element = img;
        }
        break;
      }

      case "text":
        element = el("p", {}, data);
        break;

      case "heading":
        //We do h3 because header is h1, then we have the page title which is h2
        element = el("h3", {}, data);
        break;

      case "list": {
        const listItems = data.map((listItem) => el("li", {}, listItem));
        element = el("ul", {}, ...listItems);
        break;
      }

      case "code":
        element = el("pre", {}, el("code", {}, data));
        break;

      default:
        element = el("p", {}, `Unknown type: ${type}`);
        break;
    }
    container.appendChild(element);
  }

  return container;
}
