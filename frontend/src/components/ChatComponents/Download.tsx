import { Button } from "../ui/button";
import { FaDownload } from "react-icons/fa6";


interface DownloadButtonProps {
    content: string;
}

export default function Download({ content }: DownloadButtonProps) {
    const handleDownload = () => {
        const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "generated_article.md");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <Button
                variant="elegant"
                onClick={handleDownload}
                className="w-55 h-10 py-3 bg-gradient-to-r from-blue-900 via-sky-500 to-cyan-300 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                <FaDownload />
                Download Markdown
            </Button>
        </>
    );
}
