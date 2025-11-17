const SocialLink = ({ item }) => {
  const { link, label, Icon } = item;
  return (
    <a
      href={link}
      aria-label={label}
      className="bg-[#193CB8] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1F4ED8] transition-colors"
    >
      <Icon className="w-4 h-4 text-white" strokeWidth={1.33} />
    </a>
  );
};

export default SocialLink;