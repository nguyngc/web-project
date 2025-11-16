import { Send } from "lucide-react";
import WebMap from "./WebMap";
function ContactFormMap() {
  return (

    <section className="py-12 lg:py-[50px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[50px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6">
              Send Us a Message
            </h2>
            <p className="text-vision-text font-inter text-base leading-6">
              Have a question or ready to schedule an appointment? Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="flex flex-col gap-6 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#364153] text-sm font-inter">First Name *</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#364153] text-sm font-inter">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#364153] text-sm font-inter">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#364153] text-sm font-inter">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#364153] text-sm font-inter">Subject *</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="h-9 px-3 py-1 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#364153] text-sm font-inter">Message *</label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows={3}
                  className="px-3 py-2 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] leading-5 focus:outline-none focus:ring-2 focus:ring-vision-blue-accent resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-[rgba(0,0,0,0.1)] bg-[#F3F3F5] text-vision-blue-accent focus:ring-vision-blue-accent"
                />
                <span className="text-vision-text text-sm leading-5">
                  I agree to the privacy policy and consent to be contacted by Vision Clinic regarding my inquiry.
                </span>
              </label>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full px-6 py-2.5 rounded-lg bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[#1C398E] font-inter text-xl font-medium leading-6">
              Visit Our Clinic
            </h2>
            <p className="text-vision-text font-inter text-base leading-[30px]">
              We're conveniently located in the heart of Medical City. Find us easily using the map below or your favorite navigation app.
            </p>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div className="w-full h-[500px] ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.3880217427356!2d25.079106099999994!3d60.223956400000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469208cc4a19d073%3A0xc8f8650d3fdd9f20!2sMyllypurontie%201%2C%2000920%20Helsinki!5e0!3m2!1sen!2sfi!4v1763303444512!5m2!1sen!2sfi" 
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowFullScreen=""
                  loading="lazy"
                  title="Vision Clinic Location"
              ></iframe>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactFormMap
