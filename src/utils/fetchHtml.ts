export const fetchHtml = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al solicitar el HTML");
    }
    const html = await response.text();
    return html;
  } catch (error) {
    console.error("Error al solicitar el HTML", error, new Date());
    throw error;
  }
};
