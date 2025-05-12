import { useRef } from "react";
import FeatureComponent from "../HomeComponents/FeatureComponent";
import home_image_01 from "./assets/qna_01.png";
import home_image_02 from "./assets/image_02.png";
import home_image_03 from "./assets/home_image_03.jpg";
import { ReactTyped } from "react-typed";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Icon from lucide-react (or use react-icons/fa with FaGithub)
import ClickSpark from "../Effects/ClickSpark";

function About() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const developers = [
    {
      name: "B Lalith Prabhasith",
      role: "Fullstack Developer & AI Integrator",
      github: "https://github.com/LalithPrabhasith",
      linkedin: "https://www.linkedin.com/in/JohnPrabhasith",
    },
    {
      name: "Vamshi Krishna",
      role: "Fullstack Developer & Frontend Lead",
      github: "https://github.com/VamshiKrishna",
      linkedin: "https://www.linkedin.com/in/MRVamshiKrishna",
    },
  ];
  const features = [
    {
      title: "Smart Answering",
      description: `
        Use advanced LLMs like OpenAI's GPT to extract accurate, context-aware answers from any website. 
        These models understand natural language and provide precise responses tailored to your query.
      `,
      image: home_image_01,
    },
    {
      title: "Secure and Private",
      description: `
        Your data stays safe with AES encryption, HTTPS, and zero-knowledge architecture. 
        We ensure full confidentiality and never store sensitive information.
      `,
      image: home_image_02,
    },
    {
      title: "Easy to Use",
      description: `
        Just paste a URL, ask your question, and get answers instantly. 
        Powered by LangChain, Flask, and an intuitive interface for everyone.
      `,
      image: home_image_03,
    },
  ];
  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="max-w-screen mr-">
        <div className="pt-30 mb-0 pb-0  md:px-12 bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800 space-y-16">
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto space-y-6 mb-30">
            <h1 className=" max-w-3xl font-extrabold mx-auto space-y-6">
              <ReactTyped
                strings={["Empowering Exploration with AI"]}
                typeSpeed={70}
                loop
                backSpeed={20}
                cursorChar="|"
                showCursor={true}
              />
            </h1>
            <p className="text-lg text-gray-700">
              We harness the power of large language models to simplify how you
              interact with digital content. Whether you're scanning a document,
              browsing a site, or crafting an article — we help you do more,
              faster.
            </p>
          </section>

          {/* Feature Cards */}
          <h2
            ref={featuresRef}
            className="text-4xl font-extrabold leading-tight text-center bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent mb-12"
          >
            What You'll Enjoy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-12">
            {features.map((feature, i) => (
              <FeatureComponent
                key={i}
                image={feature.image}
                description={feature.description}
                title={feature.title}
              />
            ))}
          </div>

          {/* Vision */}
          <section className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-sky-900 to-yellow-300 bg-clip-text text-transparent ">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg">
              We envision a world where information is instantly actionable. Our
              platform bridges the gap between content and comprehension,
              enabling smarter learning and faster decision-making.
            </p>
            <div className="text-blue-900 font-semibold text-lg">
              "Build once, learn forever."
            </div>
          </section>

          {/* Technology Section */}
          <section className="py-12 bg-white px-6 md:px-20">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent ">
                Technologies We Use
              </h3>
              <p className="text-gray-700">
                We bring together the best of AI and Web technologies to deliver
                reliable answers.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {[
                  "ReactJS",
                  "TypeScript",
                  "TailwindCSS",
                  "SupaBase",
                  "Clerk",
                  "ShadCN UI",
                  "JWT",
                  "LangChain",
                  "CrewAI MultiAgent",
                  "Llama-3.3",
                  "SerperAPI",
                  "GroqAPI",
                  "Flask",
                  "FAISS",
                  "Hugging Face",
                  "Embeddings",
                ].map((tech, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-100 text-blue-800 hover:text-black hover:font-bold hover:scale-103 font-semibold py-3 rounded shadow text-center"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-blue-50 py-12 px-6 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-extrabold text-blue-800 mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To create an intuitive, AI-powered interface that redefines
                  how users access information across the web.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-blue-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  To democratize knowledge by providing instant, secure, and
                  intelligent answers from any online source.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-blue-50 px-6 md:px-20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent ">
                Meet the Makers
              </h3>
              <p className="text-gray-700">
                Crafted by passionate developers and AI engineers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {developers.map((person, i) => (
                <div key={i} className="bg-white p-6 rounded shadow relative">
                  {/* Social Icons in top-right corner */}
                  <div className="absolute top-4 right-4 flex gap-3 text-gray-500 hover:text-black ">
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name}'s GitHub`}
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name}'s LinkedIn`}
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>

                  <h4 className="text-xl font-extrabold text-blue-800">
                    {person.name}
                  </h4>
                  <p className="text-gray-600">{person.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-100 py-10 text-center rounded-lg shadow-inner mt-10 mb-10">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent  mb-2">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 mb-4">
              Dive into your first document, URL, or article prompt — and let AI
              handle the rest.
            </p>
            <p className="font-medium text-blue-800">
              Explore. Summarize. Create.
            </p>
          </section>
        </div>
      </div>
    </ClickSpark>
  );
}

export default About;
