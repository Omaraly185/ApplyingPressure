import React from "react";
import Image from "next/image";

function AboutUs() {
  return (
    <main className="fullAbout">
      <section className="About-Us-Name">
        <div className="we-are-block">
          <section id="about-us-section">
            <div className="about-us-image">
              <Image
                src="/images/About5.jpg"
                alt="Interior Cleaning Applying Pressure Mobile Detailing"
                fill
                sizes="(max-width: 644px) 100vw, (max-width: 860px) 100vw, (max-width: 1200px) 50vw, 808px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            <div className="about-us-info">
              <header>
                <h2>We are Applying Pressure</h2>
              </header>

              <p className="letter-spacing">
                Applying Pressure Mobile Detailing is your go-to solution for
                professional mobile detailing and car detailing in NYC, Long
                Island, and New Jersey. Whether you’re searching for mobile car
                detailing NYC, car detailing in Brooklyn, or even Astoria mobile
                detailing, our team delivers top-notch auto detailing NYC
                residents trust. We specialize in complete interior detailing,
                advanced ceramic coating and ceramic coating detailing, using
                eco-friendly products and modern techniques to keep your vehicle
                looking its best. So when you’re typing “mobile detailing near
                me,” know that we’re ready to bring a showroom shine straight to
                your driveway. Call us today at{" "}
                <a href="tel:+19295285191" className="PhonenumberLink">
                  (929) 528-5191
                </a>
              </p>
            </div>
          </section>

          <section id="history-section">
            <div className="history-image">
              <Image
                src="/images/About9.jpg"
                alt="Ceramic Coating job Applying Pressure Mobile Detailing"
                fill
                sizes="(max-width: 644px) 100vw, (max-width: 860px) 100vw, (max-width: 1200px) 50vw, 820px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </div>

            <div className="history-info">
              <header>
                <h2>Why Choose AP Mobile Detailing</h2>
              </header>

              <p className="letter-spacing">
                At Applying Pressure Mobile Detailing, we bring professional
                detailing right to your doorstep — whether you’re in Brooklyn,
                Queens, Manhattan, the Bronx, or Staten Island. Our team
                carefully evaluates your vehicle’s condition, recommends the
                best solutions, and customizes services to fit your schedule.
                With flexible appointments, competitive pricing, and unmatched
                attention to detail, we consistently exceed expectations. If
                you’re searching for trusted mobile detailing in New York City,
                Long Island, or New Jersey, contact us today —{" "}
                <strong>we come to you</strong>!
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
