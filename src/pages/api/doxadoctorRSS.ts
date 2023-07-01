import { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


  
  const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    let currentItem = null;

    const supabase = createPagesServerClient({ req: _req, res })

    const feedOptions = {
        title: 'DOXA RSS FEED',
        description: 'DOXA RSS FEED FOR SOCIAL NETWORK',
        feed_url: 'https://mi-sitio.com/feed.xml',
        site_url: 'https://mi-sitio.com',
      };
      
      const feed = new RSS(feedOptions);
      
      const getBlogs = async () => {
        try {
          const blogs = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);
          return blogs.data;
        } catch (err) {
          console.log(err);
          return [];
        }
      };
  
    const response = await getBlogs();

    if(response){
        response.forEach((e) => {
          currentItem = {
            title: e.title,
            description: e.description,
            url: e.url,
            date: new Date(),
          };
          return;
        });
    } else {
        console.log("error: getBlogs() is false")
    }
  
  
    if (currentItem) {
      feed.item(currentItem);
    }
  
    const rssOutput = feed.xml({ indent: true });
  
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(rssOutput);
  };

export default handler;
