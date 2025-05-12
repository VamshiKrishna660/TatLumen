import { Card, CardContent } from '../ui/card';

interface FeatureComponentProps {
  image: string,
  title: string,
  description: string
}

const FeatureComponent: React.FC<FeatureComponentProps> = ({ image, title, description }) => {
  return (
    <Card className="rounded-2xl shadow-lg transition hover:scale-101 hover:shadow-xl">
      <CardContent className="p-6 space-y-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-xl"
        />
        <h3 className="text-xl font-semibold text-blue-700">
          {title}
        </h3>
        <p className="text-gray-600 whitespace-pre-line">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureComponent;
