import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ArticleItem from "../components/ArticleItem";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { categories, featuredArticle, recentArticles } from "../data/articles";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Hero page="news" />

      <div className="px-4 lg:px-[200px] py-[25px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-[50px]">
        <div className="flex items-center gap-2.5 flex-1 w-full md:w-auto bg-[#F3F3F5] rounded-lg px-4 py-1 h-9">
          <Search className="w-4 h-4 text-[#99A1AF]" strokeWidth={1.33} />
          <input
            type="text"
            placeholder="Search articles..."
            className="bg-transparent text-sm font-inter text-[#717182] outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`h-8 px-3 rounded-lg font-inter text-sm font-medium leading-5 transition-colors ${selectedCategory === category
                ? "bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white"
                : "bg-white border border-black/10 text-[#0A0A0A] hover:border-vision-secondary"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-[200px] pb-[50px] flex flex-col gap-[25px] bg-white">
        <div className="border border-black/10 rounded-[14px] bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full md:w-[326px] h-[319px] object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-4 p-6 md:py-6 md:pr-6 md:pl-0 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-4 h-7">
                <span className="px-[9px] py-1 rounded-full bg-[#DBEAFE] text-[#155DFC] font-inter text-sm leading-5">
                  {featuredArticle.category}
                </span>
                <div className="flex items-center gap-1 text-sm text-[#6A7282] font-inter leading-5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" strokeWidth={1.33} />
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
                <span className="text-sm text-[#6A7282] font-inter leading-5">
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="text-[#101828] font-inter text-base leading-6">
                {featuredArticle.title}
              </h2>
              <p className="text-[#4A5565] font-inter text-base leading-6 flex-1">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#6A7282]" strokeWidth={1.33} />
                <span className="text-[#6A7282] font-inter text-sm leading-5">
                  {featuredArticle.author}
                </span>
              </div>
              <Link
                to={`/news/${featuredArticle.id}`}
                className="inline-flex items-center gap-3.5 px-3 py-2 rounded-lg bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white font-inter text-sm font-medium leading-5 hover:opacity-90 transition-opacity w-fit"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" strokeWidth={1.33} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-[200px] pb-[50px] flex flex-col gap-8 bg-[#F9FAFB] py-[50px]">
        <h2 className="text-[#1C398E] font-inter text-2xl font-medium leading-6">
          Recent Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => {
            return <ArticleItem key={article.id} article={article} />;
          })}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="h-8 px-3 rounded-lg border border-black/10 bg-white font-inter text-sm font-medium leading-5 text-[#0A0A0A] hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 px-3 rounded-lg font-inter text-sm font-medium leading-5 transition-colors ${currentPage === page
                  ? "bg-[#159EEC] text-white"
                  : "border border-black/10 bg-white text-[#0A0A0A] hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
            className="h-8 px-3 rounded-lg border border-black/10 bg-white font-inter text-sm font-medium leading-5 text-[#0A0A0A] hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Articles;