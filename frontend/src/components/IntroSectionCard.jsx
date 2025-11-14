function IntroSectionCard({ section }) {
  return (
    <section className="flex flex-col items-center px-4 lg:px-[200px] py-[50px] gap-[20px] w-full max-w-[1440px] h-[398px]">
      {/* Title + description */}
      <div className="flex flex-col items-center gap-4 max-w-[1040px] text-center">
        {section.title && (
          <h2 className="text-[#0b219c] text-[28px] leading-[39px] font-inter font-medium">
            {section.title}
          </h2>
        )}
        <p className="text-[#364153] text-[18px] leading-[36px] font-inter font-normal max-w-[1040px]">
          {section.description}
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-row items-start gap-[50px] w-full max-w-[1040px] h-[147px] drop-shadow-[0_12px_4px_rgba(0,0,0,0.25)]">
        {section.card.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-[10px] gap-[15px] w-[313px] h-[147px] bg-[#F2F2F7] border border-[rgba(191,210,248,0.2)] rounded-[20px]"
            >
              <Icon className="w-10 h-10 text-[#0b219c]" />
              <h3 className="text-[#102C56] text-[16px] leading-[24px] font-inter font-medium text-center">
                {item.title}
              </h3>
              <p className="text-[#102C56] text-[16px] leading-[24px] font-inter font-normal text-center">
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
