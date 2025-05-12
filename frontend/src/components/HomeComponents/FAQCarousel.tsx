import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const faqs = [
  {
    question: "How does it work?",
    answer: "We use powerful LLMs to answer based on website content.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes! Your queries are encrypted and secure.",
  },
  {
    question: "Who are the Developers of TatLumen?",
    answer: "BLJ Prabhasith and MR Vamshi Krishna are the developers of The TatLumen.",
  },
  {
    question: "Can I use any website?",
    answer: "You can analyze any publicly accessible website.",
  },
  {
    question: "What is Culprit?",
    answer:
      "Culprit is an AI-powered research tool that generates articles using multiple collaborating agents.",
  },
  {
    question: "How does Culprit generate content?",
    answer:
      "It uses a Multi-Agent Architecture with specialized agents to research, validate, and write high-quality articles.",
  },
  {
    question: "What is the Doc Scanner?",
    answer:
      "Doc Scanner allows you to upload and extract content and summarize with AI support.",
  },
  {
    question: "Can I ask questions on uploaded documents?",
    answer:
      "Yes, the Doc Scanner enables intelligent question answering based on your document content.",
  },
  {
    question: "What makes LinkSage different?",
    answer:
      "LinkSage lets you analyze any webpage and ask questions as if you're chatting with its content.",
  },
  {
    question: "Can I use all features for free?",
    answer:
      "Yes, At Present LinkSage offers all core features including Culprit and Doc Scanner at no cost.",
  },
];

export function FAQCarousel() {
  return (
    <div className="bg-blue-50 px-8 md:px-20 py-6">
      <div className="bg-blue-50 px-8 md:px-10 py-5 rounded-4xl ">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-sky-900 to-lime-300 bg-clip-text text-transparent mb-12">
          Frequently Asked Questions
        </h2>
        <Carousel className="rounded-4xl max-w-3xl mx-auto">
          <CarouselContent className="pr-0 pl-3">
            {faqs.map((faq, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="rounded-3xl bg-emerald-100 shadow-md">
                  {/* // bg-lime-100 */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-900">{faq.answer}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
