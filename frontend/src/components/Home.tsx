import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import hero_image from "../assets/hero_image.png";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Globe, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FAQCarousel } from "./HomeComponents/FAQCarousel";
import ClickSpark from "./Effects/ClickSpark";
import { ReactTyped } from "react-typed";

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Subscribed successfully!");
        setEmail("");
      } else {
        setStatus(data.message || "Subscription failed.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen min-w-screen mt-0 w-full h-full bg-blue-50 flex flex-col top-0">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="flex flex-col md:flex-row items-center justify-between mx-0 px-4 md:px-10 py-25"
        >
          <div className="max-w-3xl space-y-6">
            <h1 className="text-lg mt-9 font-extrabold text-emerald-800 leading-tight">
              <span className="text-4xl">Get Wisdom From </span>
              <span className="bg-gradient-to-t from-neutral-900 to-yellow-200 text-transparent bg-clip-text text-5xl">
                <ReactTyped
                  strings={[" WebPages", " Documents", " Internet"]}
                  typeSpeed={70}
                  loop
                  backSpeed={40}
                  cursorChar="|"
                  showCursor={true}
                />
              </span>
              <div className="flex space-x-4 mt-4">
                <span className="text-4xl text-lime-700">Ask..</span>
                <span className="text-4xl text-lime-600">Scan..</span>
                <span className="text-4xl text-lime-500">Discover!</span>
              </div>
            </h1>
            <p className="text-lg text-slate-400 mr-60">
              Your AI-powered assistant for exploring website content
              intelligently. Just paste a link, ask a question, and get answers
              instantly.
            </p>
            <button
              onClick={() =>
                featuresRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-lime-600 transition duration-300"
            >
              Get Started →
            </button>
          </div>
          <motion.img
            src={hero_image}
            alt="Hero"
            className="w-full max-w-md mt-10 md:mt-0 rounded-3xl shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="px-8 md:px-20 py-0 bg-slate-100">
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent mb-12">
            Features You'll Love
          </h2>
          <section className="max-w-5xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-lg border border-blue-100 bg-slate-400 ">
                <CardHeader className="flex items-center gap-3">
                  <Globe className="text-blue-600" />
                  <CardTitle className="text-xl text-blue-800">
                    URL Chatbot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ask questions about any webpage. Our system parses and
                    processes website content in real-time using Groq and
                    LangChain for intelligent response generation.
                  </p>
                  <Button
                    variant="elegant"
                    className="mx-[34%] mt-3 text-white"
                  >
                    <Link to="/chat">Visit</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-lg border border-blue-100 bg-slate-300 ">
                <CardHeader className="flex items-center gap-3">
                  <Lightbulb className="text-blue-600" />
                  <CardTitle className="text-xl text-blue-800">
                    Article Generator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Input a prompt and generate well-structured, original
                    content in seconds — from blog posts to thought leadership
                    pieces.
                  </p>
                  <Button variant="elegant" className="mx-25 mt-7 text-white">
                    <Link to="/doc">Visit</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border border-blue-100 bg-slate-400 ">
                <CardHeader className="flex items-center gap-3">
                  <FileText className="text-blue-600" />
                  <CardTitle className="text-xl text-blue-800">
                    Document Summarizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Upload a file and get a digestible, AI-generated summary.
                    Ideal for quick reading and research, with support for DOCX,
                    PDF, and TXT formats.
                  </p>
                  <Button variant="elegant" className="mx-26 mt-8 text-white">
                    <Link to="/culprit">Visit</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* Testimonials */}
        <div className="bg-blue-50 px-8 md:px-20 py-16">
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {["BLJ Prabhasith", "Vamshi Krishna"].map((name, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl shadow-md bg-neutral-200`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-slate-700 mb-4">
                  {name === "BLJ Prabhasith"
                    ? "This tool revolutionized how I extract info from websites."
                    : "A must-have for researchers and pros. Super useful!"}
                </p>
                <p className="text-blue-800 font-semibold">- {name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <FAQCarousel />
        </div>

        {/* Newsletter */}
        <div className="bg-blue-50 px-8 md:px-20 py-16">
          <h2 className="text-3xl text-center font-extrabold bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent mb-6">
            Stay Updated
          </h2>
          <p className="text-center font-bold text-slate-700 mb-6">
            Subscribe to get the latest updates and insights.
          </p>
          <div className="flex justify-center items-center flex-col w-full">
            <div className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:flex-1 border-2 border-blue-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleSubscribe}
                className="hover:cursor-pointer w-full md:w-auto bg-blue-900 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md transition duration-300"
              >
                Subscribe
              </button>
            </div>
            {status && (
              <p className="text-center text-sm mt-4 text-blue-800">{status}</p>
            )}
          </div>
        </div>
      </div>
    </ClickSpark>
  );
};

export default LandingPage;
