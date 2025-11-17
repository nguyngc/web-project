function IntroSectionCard({ section }) {
  return (
    <section className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] gap-[20px] w-full max-w-[1440px] mx-auto">
      {/* Title + description */}
      <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
        {section.title && (
          <h2 className="text-[#1C398E] text-[36px] leading-[39px] font-inter tracking-[3.6px] font-weight: 500 font-style: normal">
            {section.title}
          </h2>
        )}
        <p className="text-[#364153] text-[20px] leading-[36px] font-inter font-normal max-w-[916px] whitespace-pre-line">
          {section.description}
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-[30px] w-full max-w-[1040px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {section.card.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-[10px] gap-[15px] w-full lg:w-[313px] bg-[#ffffff] border  border-[rgba(191,210,248,0.2)] rounded-[20px]"
            >
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1C398E] text-[16px] leading-[24px] font-inter font-medium text-center">
                {item.title}
              </h3>
              <p className="text-[#102C56] text-[16px] leading-[24px] font-inter font-normal text-center whitespace-pre-line">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default IntroSectionCard;
