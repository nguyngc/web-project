import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

function ContactQA() {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faq");
        if (!res.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[30px] mb-16">
        <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6 text-center mb-10 mt-10">
          Frequently Asked Questions
        </h2>
        <p>Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[30px] mb-16">
        <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6 text-center mb-10 mt-10">
          Frequently Asked Questions
        </h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[30px] mb-16">
      <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6 text-center mb-10 mt-10">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={faq._id || index}
            className={cn(
              "rounded-xl border border-[rgba(0,0,0,0.1)] bg-white transition-all",
              openFaq === index ? "p-6" : "px-6 py-0"
            )}
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="text-[#101828] text-sm font-medium">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#717182] transition-transform",
                  openFaq === index && "rotate-180"
                )}
              />
            </button>

            {openFaq === index && (
              <div className="pb-4 pt-1">
                <p className="text-vision-text text-sm leading-6">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactQA;