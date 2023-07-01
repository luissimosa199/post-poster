import Link from "next/link";
import { type FunctionComponent } from "react";

interface CardProps {
    data: {
        title: string;
        description: string;
        url: string;
    }
}

const ResponseCard: FunctionComponent<CardProps> = ({ data }) => {
    return (
        <div className="flex flex-col items-center mt-8 max-w-lg w-full bg-white border border-gray-300 shadow-sm rounded-md p-4 mx-auto md:w-96">
            <h2 className="text-2xl mb-4">Post publicado a las redes sociales</h2>

            <h3 className="text-lg font-bold mb-2">{data.title}</h3>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <Link
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                Ir al post
            </Link>
        </div>
    );
};

export default ResponseCard;