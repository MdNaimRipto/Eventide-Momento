"use client";

import Image from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import bg from "@/assets/images/auth/banner.webp";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By using our service you agree to these Terms & Conditions. If you do not agree, please do not use the site.",
  },
  {
    title: "Use of Service",
    body: "You may use the platform for lawful purposes only. Hosts and attendees must comply with local laws and any event rules.",
  },
  {
    title: "User Content",
    body: "Users who post content are responsible for it. We reserve the right to remove content that violates these terms or our policies.",
  },
  {
    title: "Payments & Refunds",
    body: "Payments for events are processed by the host or a third-party gateway. Refunds are subject to the host's refund policy unless otherwise stated.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, the platform is not liable for indirect or consequential losses arising from the use of our service.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the applicable jurisdiction for the service.",
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

const TermsMain = () => {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary1 scroll-smooth mt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={bg}
          alt="Terms & Conditions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/90" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1
            className={`${LocalFonts.anton.className} text-4xl md:text-6xl text-secondary1`}
          >
            <ShutterText text="Terms & Conditions" />
          </h1>
          <p className="mt-4 text-secondary1/80 max-w-2xl text-sm md:text-base">
            Please read these terms carefully before using our service.
          </p>

          <Link
            href="/help-support"
            className="mt-6 px-6 py-2 text-sm border border-secondary1/40 rounded-full hover:bg-secondary1/10 transition-all"
          >
            Help & Support
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

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-16">
        <div className="prose prose-invert max-w-none">
          {sections.map((s, i) => (
            <section key={i} className="mb-8">
              <h2
                className={`${LocalFonts.anton.className} text-2xl md:text-3xl text-secondary1 mb-3`}
              >
                {s.title}
              </h2>
              <p className="text-secondary1/70 leading-relaxed">{s.body}</p>
            </section>
          ))}

          <p className="text-secondary1/70 mt-6">
            These Terms & Conditions may be updated from time to time. Continued
            use of the service after changes constitutes acceptance of the
            revised terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsMain;
