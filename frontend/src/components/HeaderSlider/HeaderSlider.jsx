import React, { useState, useEffect } from "react";
import banner1 from "../../assets/images/HeaderBanner/banner_01.jpg";
import banner2 from "../../assets/images/HeaderBanner/banner_02.jpg";

function HeaderSlider() {
  const banners = [banner1, banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup the interval
  }, [banners.length]);

  // Handle Next Slide (Optional)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Handle Previous Slide (Optional)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-100 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Render overlay content conditionally based on currentIndex */}
            {index === currentIndex && (
              <div className="absolute top-24 left-16 text-primary_text z-10 max-w-lg">
                {index === 0 && (
                  <>
                    <h1 className="text-2xl mr-8 mb-4">
                      IGE Masters: South Asia - Honor of Kings
                    </h1>
                    <p className="text-sm mr-8 mb-4">
                      Introducing the IGE Masters: South Asia - Honor of Kings
                      tournament! This exciting event features four regional
                      qualifiers, where teams from across South Asia will battle
                      it out for glory.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Read More
                    </button>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h1 className="text-2xl mr-8 mb-4">
                      Gamer.LK Community Series - MK 1
                    </h1>
                    <p className="text-sm mr-8 mb-4">
                      Gamer.LK presents the Gamer.LK Community Series, a
                      tournament series designed and launched by Sri Lanka to
                      provide a platform for up-and-coming gamers from the
                      country to compete and gain recognition. The Community
                      Series was conceived by Gamer.LK with the aim of
                      developing the grassroots, community-level Esports scene
                      across the country by offering new and exciting
                      opportunities for the next generation of gamers to
                      showcase their skills in a competitive setting. Gamer.LK
                      is excited to lead the drive to develop Esports in Sri
                      Lanka as it looks ahead to its larger flagship events
                      happening later in the year.{" "}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Register Now
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Optional) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-primary_text p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-primary_text p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
}

export default HeaderSlider;
