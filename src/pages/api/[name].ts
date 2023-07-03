import { type NextApiRequest, type NextApiResponse } from "next";
import { extractMetadata } from "../../utils/extractMetadata";
import { fetchHtml } from "../../utils/fetchHtml";
import { insertDataToDB } from "@/utils/insertToDb";
import { type ResponseData } from "@/types/responseData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { url, name } = req.body;

  // request the page
  const html = await fetchHtml(url);

  // scrap the page & get elements
  const { title, description, imgSrc } = extractMetadata(html, name);

  const responseData = { title, description, url, name, imgSrc };

  // update db
  const { error } = await insertDataToDB(responseData, req, res)

  if(error){
    throw Error(error.message)
  }

  res.status(200).json({ message: "Objeto recibido", data: responseData });
}
