import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type ResponseData } from "@/types/responseData";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type blogData } from "@/types/blogData";

export async function insertDataToDB(
  responseData: blogData,
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase.from("blogs").insert(responseData);

  if (error) {
    console.log("Error al insertar en la base de datos:", error);
  } else {
    console.log("Datos insertados en la base de datos:", data, new Date());
  }

  return { data, error }
}
