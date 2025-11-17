
const DoctorCard = ({ Image, name,specialty, bio, rate }) => {
  return (
    <article className="flex flex-col rounded-[14px] border border-black/10 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-[239px] overflow-hidden">
        <img src={Image} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-6">
        <h3 className="text-[#0f55e1] text-lg font-inter font-medium leading-[27px] text-center">
          {name}
        </h3>
        <p className="text-vision-text-light text-base leading-6">
          {specialty}
        </p>
        <p className="text-vision-text-light text-base leading-6">
          {bio}
        </p>
        <p className="text-vision-text-light text-base leading-6 self-end">
          Rating: {rate} / 5
        </p>  
      </div>
    </article>
  );
};

export default DoctorCard;
