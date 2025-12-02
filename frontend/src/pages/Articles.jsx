import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ArticleItem from "../components/ArticleItem";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { fetchArticles } from "../services/articleService";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [allCategories, setAllCategories] = useState(["All Articles"]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const loadCategories = async () => {
      const all = await fetchArticles({ isPublished: true });
      const uniqueCats = [...new Set(all.map(a => a.category).filter(Boolean))];
      setAllCategories(["All Articles", ...uniqueCats]);
    };

    loadCategories();
  }, []);

  const loadArticles = async () => {
    const data = await fetchArticles({
      q: searchQuery || undefined,
      category: activeCategory !== "All Articles" ? activeCategory : undefined,
      isPublished: true,
    });

    setArticles(data);
    setFeaturedArticle(data[0] || null);
  };

  useEffect(() => {
    loadArticles();
  }, [searchQuery, activeCategory]);

  const indexOfLast = currentPage * perPage;
  const current = articles.slice(indexOfLast - perPage, indexOfLast);
  const totalPages = Math.ceil(articles.length / perPage);

  return (
    <div>
      <Hero page="news" />

      {/* Search / Category */}
      <div className="px-4 lg:px-[200px] py-[25px] flex flex-col md:flex-row items-start gap-[50px]">

        {/* SEARCH INPUT */}
        <div className="flex items-center gap-2.5 flex-1 bg-[#F3F3F5] rounded-lg px-4 py-2">
          <Search className="w-4 h-4 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search articles..."
            className="bg-transparent text-sm text-[#717182] outline-none pl-2 w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Categories fetched dynamically */}
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`h-8 px-3 rounded-lg text-sm font-medium ${activeCategory === cat
                ? "bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white"
                : "bg-white border border-black/10 text-[#0A0A0A] hover:border-vision-secondary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      {featuredArticle && (
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
                  {featuredArticle.subtitle}
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
      )}

      {/* RECENT ARTICLES */}
      <div className="px-4 lg:px-[200px] pb-[50px]">
        <h2 className="text-[#1C398E] text-2xl font-medium mb-6">
          Recent Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${currentPage === i + 1
                ? "bg-[#159EEC] text-white"
                : "border border-black/10 bg-white text-[#0A0A0A] hover:bg-gray-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
