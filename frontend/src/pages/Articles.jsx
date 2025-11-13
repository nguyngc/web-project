import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ArticleItem from "../components/ArticleItem";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { categories, featuredArticle, recentArticles } from "../data/articles";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Combine featured article with recent articles for searching
  const allArticles = [featuredArticle, ...recentArticles];

  // Filter articles based on search query and category
  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch = searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "All Articles" || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(searchQuery.length > 0);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (searchQuery) {
      setIsSearching(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setActiveCategory("All Articles");
  };

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  return (
    <div>
      <Hero page="news" />

      <div className="px-4 lg:px-[200px] py-[25px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-[50px]">
        <div className="flex items-center gap-2.5 flex-1 w-full md:w-auto bg-[#F3F3F5] rounded-lg px-2 py-1 h-9">
          <form onSubmit={handleSearch} className="relative w-full md:w-70">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" strokeWidth={1.33} />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent text-sm font-inter text-[#717182] outline-none pl-9 w-full "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`h-8 px-3 rounded-lg font-inter text-sm font-medium leading-5 transition-colors ${activeCategory === category
                ? "bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white"
                : "bg-white border border-black/10 text-[#0A0A0A] hover:border-vision-secondary"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results or Featured Article */}
      {isSearching || activeCategory !== "All Articles" ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-blue-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
                <span className="text-gray-600 ml-3">({filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'})</span>
              </h2>
              <button onClick={handleClearSearch} className="h-8 px-3 rounded-lg font-inter text-sm font-medium leading-5 transition-colors bg-white border border-black/10 text-[#0A0A0A] hover:border-vision-secondary">
                Clear Filters
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No Articles Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => {
                  return <ArticleItem key={article.id} article={article} />;
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
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

      {!isSearching && activeCategory === "All Articles" && (
        <div className="px-4 lg:px-[200px] pb-[50px] flex flex-col gap-8 bg-[#F9FAFB] py-[50px]">
          <h2 className="text-[#1C398E] font-inter text-2xl font-medium leading-6">
            Recent Articles
          </h2>

          {/* Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => {
              return <ArticleItem key={article.id} article={article} />;
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-8 px-3 rounded-lg border border-black/10 bg-white font-inter text-sm font-medium leading-5 text-[#0A0A0A] hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
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
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-3 rounded-lg border border-black/10 bg-white font-inter text-sm font-medium leading-5 text-[#0A0A0A] hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Articles;