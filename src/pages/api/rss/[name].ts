import { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let currentItem = null;

  const supabase = createPagesServerClient({ req, res });

  const { name } = req.query;

  const feedOptions = {
    title: "RSS FEED",
    description: "RSS FEED FOR SOCIAL NETWORK",
    feed_url: `http://localhost:3000/api/rss/${name}`,
    site_url: `http://localhost:3000/api/rss/${name}`,
  };

  const feed = new RSS(feedOptions);

  const getBlogs = async () => {
    try {
      const blogs = await supabase
        .from("blogs")
        .select("*")
        .eq("name", name)
        .order("created_at", { ascending: false })
        .limit(1);
      return blogs.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const response = await getBlogs();

  if (response) {
    response.forEach((e) => {
      currentItem = {
        guid: e.created_at,
        title: e.title,
        description: e.description,
        url: e.url,
        name: e.name,
        date: new Date(),
      };
      return;
    });
  } else {
    console.log("error: getBlogs() is false");
  }

  if (currentItem) {
    feed.item(currentItem);
  }

  const rssOutput = feed.xml({ indent: true });

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(rssOutput);
};

export default handler;
