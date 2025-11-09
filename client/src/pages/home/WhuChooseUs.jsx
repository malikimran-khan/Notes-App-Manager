import React from "react";

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#F0FDF4] py-24 px-6 md:px-16 overflow-hidden font-['Poppins']">
      {/* Heading and Description */}
      <div className="max-w-6xl mx-auto text-center md:text-left mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#065F46] leading-tight tracking-wide">
            Why <br className="md:hidden" /> Choose Notes Manager
          </h2>
          <p className="text-[#065F46]/90 md:w-2/3 leading-relaxed text-base md:text-lg font-medium">
            Notes Manager helps you organize your thoughts, ideas, and tasks efficiently. With a clean interface, image uploads, tags, and smart search, staying productive has never been easier.
          </p>
        </div>
      </div>

      {/* Curved Section */}
      <div className="relative max-w-7xl mx-auto">
        {/* Top curved line */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[90%] h-16 border-t-2 border-dashed border-[#10B981] rounded-t-full"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-20 md:gap-28">
          {/* Left Side */}
          <div className="flex flex-col items-end text-right gap-20 w-full md:w-1/3">
            <div className="max-w-[250px]">
              <h3 className="text-xl md:text-2xl font-bold text-[#065F46] mb-3">
                Organize Easily
              </h3>
              <p className="text-[#10B981]/90 text-sm md:text-base leading-relaxed">
                Categorize notes with tags and titles, keeping your ideas structured and easy to find.
              </p>
            </div>

            <div className="max-w-[250px]">
              <h3 className="text-xl md:text-2xl font-bold text-[#065F46] mb-3">
                Secure & Private
              </h3>
              <p className="text-[#10B981]/90 text-sm md:text-base leading-relaxed">
                Your notes are safe with secure storage, so your thoughts remain private and protected.
              </p>
            </div>
          </div>

          {/* Center Image (Modern Hexagon Shape) */}
          <div className="w-full md:w-1/3 flex justify-center relative">
            <div
              className="relative w-[260px] sm:w-[320px] md:w-[380px] h-[400px] overflow-hidden shadow-2xl"
              style={{
                clipPath:
                  "polygon(50% 0%, 95% 20%, 95% 80%, 50% 100%, 5% 80%, 5% 20%)",
              }}
            >
              <img
                src={'/choose-us.webp'} // Replace with your app image
                alt="Notes Manager Features"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start text-left gap-20 w-full md:w-1/3">
            <div className="max-w-[250px]">
              <h3 className="text-xl md:text-2xl font-bold text-[#065F46] mb-3">
                Smart Search
              </h3>
              <p className="text-[#10B981]/90 text-sm md:text-base leading-relaxed">
                Quickly find notes by title or tag. Never lose track of important information.
              </p>
            </div>

            <div className="max-w-[250px]">
              <h3 className="text-xl md:text-2xl font-bold text-[#065F46] mb-3">
                Attach Images
              </h3>
              <p className="text-[#10B981]/90 text-sm md:text-base leading-relaxed">
                Enhance your notes by attaching images for visual reference and better organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
