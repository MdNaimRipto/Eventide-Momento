"use client";
import Image from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import bg from "@/assets/images/auth/banner.webp";
import CommonButton from "@/components/common/CommonButton";
import { toast } from "sonner";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";

const AboutUsMain = () => {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    form.reset();
    toast.success("Message sent successfully!");
  };

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/naimur-rahman2001",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      link: "https://github.com/MdNaimRipto",
      label: "GitHub",
    },
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/mdnaimur.rahman.50309",
      label: "Instagram",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-primary text-secondary1 scroll-smooth mt-16">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image src={bg} alt="About Us" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/90" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1
            className={`${LocalFonts.anton.className} text-4xl md:text-6xl text-secondary1`}
          >
            <ShutterText text="About Us" />
          </h1>
          <p className="mt-4 text-secondary1/80 max-w-2xl text-sm md:text-base">
            A community-driven platform built to connect people through events,
            creativity, and memorable moments.
          </p>

          <Link
            href="#contact"
            className="mt-6 px-6 py-2 text-sm border border-secondary1/40 rounded-full hover:bg-secondary1/10 transition-all"
          >
            Contact Us
          </Link>
          <div className="flex items-center justify-center gap-6 mt-6">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary1 text-2xl hover:text-black/30 transition-colors duration-300"
                  aria-label={item.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className={`${LocalFonts.anton.className} text-3xl md:text-5xl text-secondary1 text-end`}
            >
              <ShutterText text="Our Story" />
            </h2>

            <p className="mt-6 text-secondary1/80 leading-relaxed text-base md:text-lg text-end">
              Eventide Momento was created with a simple idea: to make event
              discovery seamless, beautiful, and meaningful. We believe events
              are more than gatherings—they are stories, experiences, and shared
              memories.
            </p>

            <p className="mt-4 text-secondary1/80 leading-relaxed text-base md:text-lg text-end">
              Our mission is to empower creators, hosts, and communities with
              elegant tools while keeping the experience smooth and visually
              inspiring, just like the events themselves.
            </p>
          </div>

          <div className="w-full h-[350px] md:h-[450px] rounded-none overflow-hidden shadow-lg">
            <Image
              src={bg}
              alt="Our Vision"
              width={800}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2
            className={`${LocalFonts.anton.className} text-3xl md:text-5xl text-secondary1`}
          >
            <ShutterText text="Our Vision" />
          </h2>

          <p className="mt-6 text-secondary1/80 text-base md:text-lg leading-relaxed">
            To create a global space where events spark inspiration, people
            connect effortlessly, and memorable adventures become part of your
            everyday life.
          </p>
        </div>
      </div>

      <div
        id="contact"
        className="w-full bg-primary/40 border-t border-secondary1/10 py-20 scroll-mt-24"
      >
        <div className="container mx-auto px-4 md:px-12 lg:px-24">
          <h2
            className={`${LocalFonts.anton.className} text-3xl md:text-5xl text-secondary1 text-center`}
          >
            <ShutterText text="Contact Us" />
          </h2>

          <p className="text-center text-secondary1/70 mt-4">
            {`We'd love to hear from you.`}
          </p>

          <div className="flex items-center justify-center mt-12">
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col items-center gap-6 w-full md:w-[500px]"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 bg-primary/80 border border-secondary1/20 rounded-none outline-none focus:border-secondary1 w-full"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 bg-primary/80 border border-secondary1/20 rounded-none outline-none focus:border-secondary1 w-full"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="px-4 py-3 bg-primary/80 border border-secondary1/20 rounded-none outline-none focus:border-secondary1 w-full"
              />

              <CommonButton title="Send Message" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsMain;
