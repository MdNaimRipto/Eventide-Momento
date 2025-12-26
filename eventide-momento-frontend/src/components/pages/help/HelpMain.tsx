"use client";
import Image from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import bg from "@/assets/images/auth/banner.webp";
import CommonButton from "@/components/common/CommonButton";
import { toast } from "sonner";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";

const faqs = [
  {
    q: "How do I create an event?",
    a:
      "Go to the " +
      "Create Event" +
      " section in your dashboard, fill in the details and publish. You can add images, tickets and a description.",
  },
  {
    q: "How can I get a refund?",
    a: "Refunds are handled by the host. Contact the event organizer directly or reach out to our support team with your order details.",
  },
  {
    q: "How do I report inappropriate content?",
    a:
      "Use the " +
      "Report" +
      " button on the event page or contact support with a link to the content.",
  },
];

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

const HelpMain = () => {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.reset();
    toast.success("Support request sent. We'll get back shortly!");
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary1 scroll-smooth mt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={bg}
          alt="Help & Support"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/90" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1
            className={`${LocalFonts.anton.className} text-4xl md:text-6xl text-secondary1`}
          >
            <ShutterText text="Help & Support" />
          </h1>
          <p className="mt-4 text-secondary1/80 max-w-2xl text-sm md:text-base">
            Need help? Browse our FAQs or send us a message and our team will
            assist you.
          </p>

          <Link
            href="/terms"
            className="mt-6 px-6 py-2 text-sm border border-secondary1/40 rounded-full hover:bg-secondary1/10 transition-all"
          >
            Terms & Conditions
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

      {/* FAQ */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-16">
        <h2
          className={`${LocalFonts.anton.className} text-3xl md:text-4xl text-secondary1 mb-8`}
        >
          <ShutterText text="Frequently Asked Questions" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-primary/40 border border-secondary1/10"
            >
              <h3 className="text-lg md:text-xl text-secondary1 font-semibold">
                {item.q}
              </h3>
              <p className="mt-3 text-secondary1/70 text-sm md:text-base">
                {item.a}
              </p>
            </div>
          ))}

          {/* Contact Card */}
          <div className="p-6 bg-primary/40 border border-secondary1/10">
            <h3 className="text-lg md:text-xl text-secondary1 font-semibold">
              Contact Support
            </h3>
            <p className="mt-3 text-secondary1/70 text-sm md:text-base">
              If your question {`isn't`} listed, send us a message and {`we'll`}{" "}
              get back to you within 1-2 business days.
            </p>

            <form
              onSubmit={handleContactSubmit}
              className="mt-6 flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 bg-primary/80 border border-secondary1/20 outline-none w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 bg-primary/80 border border-secondary1/20 outline-none w-full"
              />
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="px-4 py-2 bg-primary/80 border border-secondary1/20 outline-none w-full"
              />
              <CommonButton title="Send" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpMain;
