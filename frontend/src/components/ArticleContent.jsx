import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock, Facebook, Twitter, Linkedin, Share2, Bookmark } from "lucide-react";

const ArticleContent = ({ article }) => {
  const { title, subtitle, date, readTime, author, authorBio, image, content } = article

  return (
    <content>
      <div className="px-4 lg:px-[200px] py-[25px]">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white font-inter text-sm font-medium leading-5 hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.67} />
          Back
        </Link>
      </div>

      <div className="px-4 lg:px-[200px] flex flex-col gap-[25px] bg-white">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#1F2B6C] font-inter text-[32px] font-medium leading-6">
              {title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#4A5565]" strokeWidth={1.67} />
                <span className="text-[#4A5565] font-inter text-base leading-6">
                  {author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#4A5565]" strokeWidth={1.67} />
                <span className="text-[#4A5565] font-inter text-base leading-6">
                  {date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#4A5565]" strokeWidth={1.67} />
                <span className="text-[#4A5565] font-inter text-base leading-6">{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4A5565] font-inter text-base leading-6">
                  Share this article:
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Facebook className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.33} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Twitter className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.33} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Linkedin className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.33} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.33} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Bookmark className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.33} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 py-[50px]">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={image}
                alt={title}
                className="w-full md:w-[326px] h-[319px] object-cover flex-shrink-0"
              />
              <p className="flex-1 text-[#364153] font-inter text-xl leading-[50px]">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="article-content font-inter text-[#4A5565] leading-relaxed" dangerouslySetInnerHTML={{ __html: content }}></div>

              <div className="flex items-start gap-6 p-8 rounded-[14px] border border-[#DBEAFE] bg-[#EFF6FF]">
                <div className="w-16 h-16 rounded-full bg-[#159EEC] flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" strokeWidth={2.67} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h4 className="text-[#101828] font-inter text-base font-medium leading-6">
                    About {author}
                  </h4>
                  <p className="text-[#4A5565] font-inter text-base leading-6">
                    {authorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </content>
  );
}

export default ArticleContent;