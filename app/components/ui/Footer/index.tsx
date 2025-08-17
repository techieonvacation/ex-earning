"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowUp } from "react-icons/io";
import { Mail, Phone } from "lucide-react";
import { IoLocation } from "react-icons/io5";
import { useTheme } from "@/app/lib/theme-provider";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  // Animation variants for subtle fade-in effects
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const quickLinks = [
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Careers",
      href: "/careers",
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
    {
      name: "Support",
      href: "/support",
    },
  ];

  const services = [
    {
      name: "Web Development",
      href: "/services/web-development",
    },
    {
      name: "Mobile Development",
      href: "/services/mobile-development",
    },
    {
      name: "UI/UX Design",
      href: "/services/ui-ux-design",
    },
    {
      name: "Digital Marketing",
      href: "/services/digital-marketing",
    },
    {
      name: "Graphic Design",
      href: "/services/graphic-design",
    },
    {
      name: "SEO",
      href: "/services/seo",
    },
    {
      name: "Content Writing",
      href: "/services/content-writing",
    },
  ];

  return (
    <footer className="relative overflow-hidden text-foreground bg-background border-t border-border">
      <div className="py-12 lg:py-16 xl:py-20 ">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary))] from-primary/10 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] ">
          <Image
            src="/images/footer-shape-1.png"
            alt="eleservsoftech"
            width={360}
            height={370}
          />
        </div>
        <div className="absolute bottom-0 right-[-3%] ">
          <Image
            src="/images/footer-shape-2.png"
            alt="eleservsoftech"
            width={288}
            height={383}
          />
        </div>
        {/* Main Footer Container */}
        <div className="container relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Info Section */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="inline-block text-2xl xl:text-3xl mb-3 w-full h-auto max-w-[140px] sm:max-w-[180px] xl:max-w-[180px]"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-primary font-dm-sans">
                Ex-Earning
              </h2>
              {/* <Image
                src="/images/light-logo.webp"
                alt="eleservsoftech"
                width={100}
                height={100}
                className={`w-full h-full transition-all duration-300 ${
                  theme === "dark" ? "hidden" : "block"
                }`}
              />
              <Image
                src="/images/dark-logo.webp"
                alt="eleservsoftech"
                width={100}
                height={100}
                className={`w-full h-full transition-all duration-300 ${
                  theme === "dark" ? "block" : "hidden"
                }`}
              /> */}
            </Link>
            <p className="text-sm text-muted-foreground sub-title text-left leading-relaxed mb-4 lg:mb-6 xl:mb-8 font-inter font-normal max-w-md">
              Empowering businesses with cutting-edge IT solutions, fostering
              innovation, and paving the way for a transformative digital
              future.
            </p>
            <div className="flex space-x-2">
              {[
                {
                  href: "https://www.facebook.com/eleservsoftech",
                  Icon: FaFacebook,
                },
                {
                  href: "https://www.instagram.com/eleservsoftech",
                  Icon: FaInstagram,
                },
                { href: "https://www.x.com/eleservsoftech", Icon: FaXTwitter },
                {
                  href: "https://www.linkedin.com/company/eleservsoftech",
                  Icon: FaLinkedin,
                },
                {
                  href: "https://www.github.com/eleservsoftech",
                  Icon: FaGithub,
                },
              ].map(({ href, Icon }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  className="group text-muted-foreground transition-all duration-300 hover:text-primary border border-muted-foreground rounded-full p-2 md:p-1"
                >
                  <Icon className="h-6 w-6 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground transform transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h4 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-foreground transition-colors hover:text-primary text-base font-dm-sans  font-normal"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h4 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-foreground transition-colors hover:text-primary text-base font-dm-sans  font-normal"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup Section */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h4 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Contact Us
            </h4>
            <p className="text-sm text-muted-foreground font-inter font-normal">
              Get in touch with us for any inquiries or support.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 mb-3">
                <Link
                  href="tel:+918851967714"
                  className="text-sm font-normal flex items-center gap-2 lg:gap-4"
                >
                  <Phone className="size-4 md:size-5" />
                  <span className="text-sm lg:text-base text-foreground font-dm-sans font-normal">
                    +91 8851967714
                  </span>
                </Link>
                <Link
                  href="mailto:info@eleservsoft.com"
                  className="text-sm font-normal flex items-center gap-2 lg:gap-4"
                >
                  <Mail className="size-4 md:size-5" />
                  <span className="text-sm lg:text-base text-foreground font-dm-sans  font-normal">
                    info@eleservsoft.com
                  </span>
                </Link>
                <Link
                  href="#"
                  className="text-sm font-normal flex items-center gap-2 lg:gap-4"
                >
                  <IoLocation className="size-5 lg:size-7 xl:size-8" />
                  <span className="text-sm lg:text-base text-foreground font-dm-sans  font-normal">
                    C-29, UG Floor LIC Building, Naraina, Delhi-110028
                  </span>
                </Link>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
              <textarea
                placeholder="Your message"
                className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
              >
                Send Message
              </button>
            </form>
            {subscribed && (
              <motion.p
                className="text-sm text-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Subscription successful!
              </motion.p>
            )}
          </motion.div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/20 blur-3xl md:h-64 md:w-64" />
        <div className="absolute top-0 left-0 h-32 w-32 -translate-x-1/4 -translate-y-1/4 rounded-full bg-highlight/20 blur-3xl md:h-48 md:w-48" />
      </div>
      <div className="bg-primary py-10 sm:py-6">
        {/* Bottom Bar */}
        <div className="container text-sm text-muted-foreground flex flex-col sm:flex-row gap-y-4 md:flex-row justify-between items-center relative">
          <div
            onClick={scrollToTop}
            className="absolute left-1/2 top-[-80px] sm:top-[-60px] -translate-x-1/2 w-[70px] h-[70px] rounded-full bg-primary border-4 border-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <IoMdArrowUp className="text-primary-foreground size-6" />
          </div>
          <p className="text-sm lg:text-base font-normal text-primary-foreground">
            &copy; {currentYear} Eleservsoftech. All rights reserved.
          </p>
          <div className="flex space-x-2 xl:space-x-3">
            <Link
              href="/privacy"
              className=" text-primary-foreground hover:text-accent transition-colors text-sm lg:text-base"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary-foreground hover:text-accent transition-colors text-sm lg:text-base"
            >
              Terms of Service
            </Link>
            <Link
              href="/terms"
              className=" text-primary-foreground hover:text-accent transition-colors text-sm lg:text-base"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
