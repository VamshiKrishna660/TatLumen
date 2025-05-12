import { ReactNode } from "react";

interface FeatureCardProps {
    title: string,
    description: string,
    icon: ReactNode
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <div className="text-blue-500 w-16 h-16 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

export default FeatureCard;