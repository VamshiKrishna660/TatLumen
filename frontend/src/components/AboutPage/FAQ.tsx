
interface FAQProps{
    question:String,
    answer:String
}

const FAQ:React.FC<FAQProps> = ({ question, answer }) => (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );

export default FAQ;