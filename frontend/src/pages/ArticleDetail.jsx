import Hero from "../components/Hero";
import ArticleContent from "../components/ArticleContent";
import ArticleItem from "../components/ArticleItem";
import { relatedArticles, article } from "../data/articles";

const ArticleDetail = () => {
  return (
    <>
      <Hero page="newsDetail" />
      <ArticleContent key={article.id} article={article} />

      <div className="px-4 lg:px-[200px] pb-[50px] flex flex-col gap-8 bg-[#F9FAFB] py-[50px]">
        <h2 className="text-[#1C398E] font-inter text-2xl font-medium leading-6">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article) => {
            return <ArticleItem key={article.id} article={article} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ArticleDetail;