import { useState, useEffect } from "react";
import "./FeedBack.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";


const testimonials = [
  {
    rating: 4,
    text: "The food was fresh, flavorful, and arrived on time! I loved the variety on the menu and will definitely order again.",
    author: "Puvan M.",
  },
  {
    rating: 5,
    text: "Absolutely loved it! The service was fantastic, and the food exceeded my expectations. Will be coming back for more.",
    author: "Aisha K.",
  },
  {
    rating: 3,
    text: "Decent experience. The food was good, but delivery took a bit longer than expected. Might try again.",
    author: "Jason R.",
  },
];

const FeedBack = () => {
  const [index, setIndex] = useState(0);

  // Show next testimonial
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Show previous testimonial
  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Automatically cycle through testimonial
  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="feedBack">
     
      {/* Main heading */}
      <div>
        <h1 className="MainHeading">What Our Customers Say</h1>
      </div>

      {/* Feedback content*/}
      <div className="feedBack-area">
        
        {/* Left Arrow */}
        <div className="feedBack2-1 w-1/4">
          <button onClick={handlePrev} className="text-gray-600 hover:text-gray-900 mx-3 cursor-pointer">
            <FaChevronLeft size={24} />
          </button>
        </div>

        {/* Animated feedback display */}
        <motion.div key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          className="feedback-content w-2/4"
        >
          {/* Star rating */}
          <div className="flex justify-center my-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < testimonials[index].rating ? "text-yellow-500" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>

          <p className="text-xl">{testimonials[index].text}</p>

          {/* Author name */}
          <p className="text-orange-500 text-3xl font-semibold mt-3">– {testimonials[index].author} –</p>
        </motion.div>

        {/* Right Arrow */}
        <div className="feedBack2-2 w-1/4">
          <button onClick={handleNext} className="text-gray-600 hover:text-gray-900 mx-3 cursor-pointer">
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;