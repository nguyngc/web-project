import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import ArticleContent from "../components/ArticleContent";
import ArticleItem from "../components/ArticleItem";
import { fetchArticles, fetchArticleById } from "../services/articleService";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const load = async () => {
      const main = await fetchArticleById(id);
      setArticle(main);

      const rel = await fetchArticles({
        category: main.category,
        isPublished: true,
      });

      setRelatedArticles(rel.filter((a) => a.id !== main.id).slice(0, 3));
    };

    load();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <Hero page="newsDetail" />
      <ArticleContent key={article.id}  article={article} />

      <div className="px-4 lg:px-[200px] py-[50px] bg-[#F9FAFB]">
        <h2 className="text-[#1C398E] text-2xl font-medium mb-6">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
