import { routes } from "@/config/route"
import { ClassifiedWithImages } from "@/config/types";
import { Classified, Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"



interface ClassifiedCardProps {
    classified: ClassifiedWithImages;
}

export const ClassfiedCard = (props: ClassifiedCardProps) => {
    const { classified } = props;

    return (
        <div className="bg-white relative rounded-md shadow-md overflow-hidden flex flex-col">
            <div className="aspect-3/2 relative">
                <Link href={routes.singleClassified(classified.slug)}>
                    <img 
                        // placeholder="blur" 
                        // blurDataURL={classified.images[0]?.blurhash}
                        src={classified.images[0]?.src}
                        alt={classified.images[0]?.alt}
                        className="object-cover"
                        // fill={true}
                        // quality={25}
                    />
                </Link>
                <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
                    <p className="text-xs lg:text-base xl:text-lg font-semibold">
                        {classified.price}
                    </p>
                </div>
            </div>
            <div className="p-4 flex flex-col space-y-3">
                <div>
                    <Link 
                        href={routes.singleClassified(classified.slug)}
                        className="text-sm md:text-base lg:text-lg font-semibold 
                        line-clamp-1 transition-colors hover:text-primary"
                    >
                        {classified.title}
                    </Link>
                    {classified?.description && (
                        <div className="text-xs md:text-sm xl:text-base text-gray-500 
                        line-clamp-2">
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}