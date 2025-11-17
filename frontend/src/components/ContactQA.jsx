import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    question: "Do I need an appointment?",
    answer:
      "Yes, we recommend scheduling an appointment to ensure minimal wait time. However, we do accept walk-ins for urgent eye care needs based on availability.",
  },
  {
    question: "What insurance do you accept?",
    answer:
      "We accept most major insurance plans. Please contact our office to verify your specific coverage.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Please bring your insurance card, a valid ID, current eyewear, and a list of any medications you're taking.",
  },
  {
    question: "How long does an eye exam take?",
    answer:
      "A comprehensive eye exam typically takes 30-60 minutes, depending on your specific needs and any additional tests required.",
  },
];

function ContactQA() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[30px] mb-16">
      <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6 text-center mb-10 mt-10">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
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
                <p className="text-vision-text text-sm leading-6">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactQA;
