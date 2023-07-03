import { JSDOM } from "jsdom";

export const extractMetadata = (html: string, name: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  if (name === "faulix" || name === "track-swart") {
    const titleElement = document.querySelector("h1");
    const descriptionElement = document.querySelector("h2");

    const title = titleElement?.textContent || "";
    const description = descriptionElement?.textContent || "";

    return { title, description };
  }

  if (name === "doxadoctor") {
    const titleElement = document.querySelector("title");
    const descriptionElement = document.querySelector(
      'meta[name="description"]'
    );

    const title = titleElement?.textContent || "";
    const description = descriptionElement?.getAttribute("content") || "";
    return { title, description };
  }

  return { title: "Parser Not Defined", description: "Parser Not Defined" };
};
