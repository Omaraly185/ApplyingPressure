import React, { useState, useRef } from "react";
import "./testimonal.css";

const testimonials = [
  {
    description:
      "I recently had my car detailed and ceramic coated at APPLYING PRESSURE, and I couldn't be happier with the results. The team was professional and meticulous, paying close attention to every nook and cranny of my vehicle. The ceramic coating was applied flawlessly.",
    title: "Zaid",
    link: "https://g.co/kgs/EjRcxsy",
  },
  {
    description:
      "Great & wonderful workmanship A+ in my book & the car is amazing. Thank you guys can't waitvtil you start to wrap car. I'm ready.",
    title: "Felix",
    link: "https://g.co/kgs/Ye1a2Gj",
  },
  {
    description:
      "Applying Pressure is amazing! Found them on tiktok and trusted their work completely! My car interior was left brand new, and was very satisfied with their work. I wish I had a before and after to really show the difference. Communicating with them was fast and easy. They also travel to you which is a plus! Would 100% recommend to friends and family! ",
    title: "Mc",
    link: "https://g.co/kgs/TDgNmfz",
  },
  {
    description:
      "Amazing job on the ceramic coat! Car came out looking nice and shiny",
    title: "Eduardo",
    link: "https://g.co/kgs/gAHvfKB",
  },
  {
    description:
      "I was coming up on 100k miles and got the top interior option. Looks brand new. Thank you!",
    title: "Steve",
    link: "https://g.co/kgs/KaPNSnq",
  },
  {
    description:
      "You’ll be left with a spotless car! They did such an amazing job and you can tell they paid attention to the smallest details. Definitely booking again soon 👍🏼",
    title: "Haya",
    link: "https://g.co/kgs/L7woXnF",
  },
  {
    description:
      "Just an absolutely amazing job, I forgot how good my car look clean. Part of the reason why I called them to come and clean my car. I couldn’t get to my usual car wash so I called this company and nothing but professionalism from top to bottom. My car looks great inside smells great my rims are amazing. These gentlemen did their thing I’m happy I reach out price isn’t bad as well.",
    title: "Ace",
    link: "https://g.co/kgs/dBq9Skx",
  },
  {
    description:
      "This has been the cleanest my car has ever been. They got places I thought could never have been clean & even asked if I had any questions prior to starting. Very punctual, great communication & friendly. I will definitely recommend & they are affordable. Thank you once again!!",
    title: "Shinya",
    link: "https://g.co/kgs/z6y5zKd",
  },
  {
    description:
      "I wish I had taken before and after photos! We had them clean and detail the interior and exterior of a Toyota Sienna that hadn't been cleaned properly in years. The vehicle looks brand new both inside and out and it's almost 10 years old. They even left mints on the center console as a courtesy! Omar and Nader are true professionals in every sense of the word.",
    title: "Joe",
    link: "https://g.co/kgs/x6P3byz",
  },
  {
    description:
      "Really needed a car wash and the last time I went to the machine ones, it scratched my car so I went with the hand wash. Applying pressure did an amazing job! My car is spotless and I could tell it was clean with care. Highly recommend.",
    title: "Patricia",
    link: "https://g.co/kgs/3uqe6SR",
  },
  {
    description: "Did an amazing job! Worth the money",
    title: "Jamie",
    link: "https://g.co/kgs/NaCQT4r",
  },
  {
    description:
      "I love that they come to you! It’s so convenient! They came looked at the car, and started the job! It was so quick and easy. I get to relax in my home and come back out to a full CLEAN car! They get all those crumbs/dirt/dust out those hard to reach places! I would 100% recommend, I already told my family and friends",
    title: "Kiana",
    link: "https://g.co/kgs/qqp12jG",
  },
  {
    description:
      "The funk mobile is funky no more! Mostafa and his team diligently cleaned, detailed and sanitized my Honda CRV. I am beyond happy with the end results and would highly recommend them.",
    title: "Nellie",
    link: "https://g.co/kgs/2mP7o9X",
  },
];

const getLetterAvatar = (name) => {
  return name.charAt(0).toUpperCase();
};

const TestimonialSlider = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const drag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Adjust the scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const getCurrentCardIndex = () => {
    if (!sliderRef.current) return 0;

    const container = sliderRef.current;
    const cards = container.querySelectorAll('.testimonial');
    const containerScrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    // Find the card that's most visible in the current view
    let mostVisibleIndex = 0;
    let maxVisibleWidth = 0;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;
      const viewLeft = containerScrollLeft;
      const viewRight = containerScrollLeft + containerWidth;

      // Calculate how much of this card is visible
      const visibleLeft = Math.max(cardLeft, viewLeft);
      const visibleRight = Math.min(cardRight, viewRight);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);

      if (visibleWidth > maxVisibleWidth) {
        maxVisibleWidth = visibleWidth;
        mostVisibleIndex = index;
      }
    });

    return mostVisibleIndex;
  };

  const scrollToCard = (cardIndex) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const cards = container.querySelectorAll('.testimonial');

    if (cardIndex < 0 || cardIndex >= cards.length) return;

    const targetCard = cards[cardIndex];
    const cardLeft = targetCard.offsetLeft;

    // Scroll to the exact start of the card
    container.scrollTo({
      left: cardLeft,
      behavior: "smooth",
    });
  };

  const scrollLeftHandler = () => {
    const currentIndex = getCurrentCardIndex();
    const prevIndex = Math.max(0, currentIndex - 1);
    scrollToCard(prevIndex);
  };

  const scrollRightHandler = () => {
    const currentIndex = getCurrentCardIndex();
    const totalCards = testimonials.length;
    const nextIndex = Math.min(totalCards - 1, currentIndex + 1);
    scrollToCard(nextIndex);
  };

  return (
    <div className="testimonial-slider-container">
      <h2 className="testimonial-title">Testimonials</h2>
      <button className="arrow prev" onClick={scrollLeftHandler}>
        &#10094;
      </button>
      <div
        className="testimonial-slide"
        ref={sliderRef}
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={drag}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <div className="triangle-corner top-left"></div>
            <div className="triangle-corner bottom-left"></div>
            <span className="testimonial-name">{testimonial.title}</span>
            <br /> <br />
            <div className="star-rating">★★★★★</div>
            <p className="description">{testimonial.description}</p>
            <small className="post">
              {/* <span className="testimonial-name">{testimonial.title}</span> */}
              <br />
              <a
                href={testimonial.link}
                target="_blank"
                className="testimonial-link"
                rel="noopener noreferrer"
              >
                Read Full Review
              </a>
            </small>
          </div>
        ))}
      </div>
      <button className="arrow next" onClick={scrollRightHandler}>
        &#10095;
      </button>
    </div>
  );
};

export default TestimonialSlider;
