import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const ArticleItem = ({ article }) => {
  const { id, title, subtitle, date, readTime, author, image } = article;

  return (
    <article className="flex flex-col rounded-[14px] border border-black/10 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-[192px] object-cover"
      />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#6A7282] font-inter text-sm leading-5">
            <Calendar className="w-4 h-4" strokeWidth={1.33} />
            <span>{date}</span>
          </div>
          <span className="text-[#6A7282] font-inter text-sm leading-5">
            {readTime}
          </span>
        </div>
        <h3 className="text-[#101828] font-inter text-base leading-6">
          {title}
        </h3>
        <p className="text-[#4A5565] font-inter text-sm leading-5">{subtitle}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 h-4">
            <User className="w-4 h-4 text-[#6A7282]" strokeWidth={1.33} />
            <span className="text-[#6A7282] font-inter text-xs leading-4">
              {author}
            </span>
          </div>
          <Link
            to={`/news/${id}`}
            className="flex items-center text-[#155DFC] font-inter text-base leading-6 hover:gap-1 transition-all"
          >
            Read More
            <ArrowRight className="w-4 h-4" strokeWidth={1.33} />
          </Link>
        </div>
      </div>
    </article>);
}

export default ArticleItem;