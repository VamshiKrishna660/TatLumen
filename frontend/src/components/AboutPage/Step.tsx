interface StepProps{
    number:String,
    title: String,
    description: String

}
const Step: React.FC<StepProps> = ({ number, title, description }) => (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

export default Step