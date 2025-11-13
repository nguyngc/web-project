import BookButton from "./BookButton";
function ContactSection() {
    return (
        <section className="px-4 lg:px-[200px] py-8 md:py-[30px] bg-gradient-to-b from-[#6E85C3] to-[#1C398E] border-b border-vision-border-light">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-white text-base md:text-lg">Ready to Schedule Your Appointment?</h2>
        <p className="text-[#DBEAFE] text-base md:text-lg leading-7">
          Take the first step towards better vision. Our friendly team is ready to help you.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <BookButton className="bg-white text-[#1C398E] " />
          <button className="bg-white text-[#1C398E] px-6 py-2.5 rounded-[10px] text-sm font-poppins font-medium hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
          
        </div>
      </div>
    </section>
  );
}
export default ContactSection;