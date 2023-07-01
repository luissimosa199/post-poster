import { JSDOM } from 'jsdom';

export const extractMetadata = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const titleElement = document.querySelector('title');
  const descriptionElement = document.querySelector('meta[name="description"]');

  const title = titleElement?.textContent || '';
  const description = descriptionElement?.getAttribute('content') || '';

  return { title, description };
};