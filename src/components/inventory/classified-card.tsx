import { routes } from "@/config/route"
import { ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import { Classified, Colour, FuelType, Prisma, Transmission } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { HTMLParser } from "../shared/html-parser";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import { OdoUnit } from "@prisma/client";
import { Button } from "../ui/button";
import { FavouriteButton } from "./favourite-button";

interface ClassifiedCardProps {
    classified: ClassifiedWithImages;
}

function formatNumber(
    num: number | null,
    options?: Intl.NumberFormatOptions,
) {
    if (!num) return '0';

    return new Intl.NumberFormat("en-GB", options).format(num);
}

function formatOdometerUnit(unit: OdoUnit) {
    return unit === OdoUnit.MILES ? "mi" : "km";
}

function formatTransmission(transmission: Transmission) {
    return transmission === Transmission.AUTOMATIC ? "Automatic" : "Manual";
}

function formatFuelType(fuelType: FuelType) {
    switch(fuelType) {
        case FuelType.PETROL:
            return "Petrol"
        case FuelType.DIESEL:
            return "Diesel"
        case FuelType.ELECTRIC:
            return "Electric"
        case FuelType.HYBRID:
            return "Hybrid"
        default:
            return "Unknown";
    }
}

function formatColour(colour: Colour) {
    switch(colour) {
        case Colour.BLACK:
            return 'Black'
        case Colour.WHITE:
            return 'White'
        case Colour.SILVER:
            return 'Silver'
        case Colour.BLUE:
            return 'Blue'
        case Colour.BROWN:
            return 'Brown'
        case Colour.GOLD:
            return 'Gold'
        case Colour.GREEN:
            return 'Green'
        case Colour.GREY:
            return 'Grey'
        case Colour.ORANGE:
            return 'Orange'
        case Colour.PINK:
            return 'Pink'
        case Colour.PURPLE:
            return 'Purple'
        case Colour.YELLOW:
            return 'Yellow'
        default:
            return 'Unknown'
    }
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
    return [
        {
            id: "odoReading",
            icon: <GaugeCircle className="w-4 h-4" />,
            value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`
        },
        {
            id: "transmission",
            icon: <Cog className="w-4 h-4" />,
            value: classified?.transmission ? formatTransmission(classified?.transmission) : null,
        },
        {
            id: "fuelType",
            icon: <Fuel className="w-4 h-4" />,
            value: classified?.fuelType ? formatFuelType(classified?.fuelType) : null,
        },
        {
            id: "colour",
            icon: <Paintbrush2 className="w-4 h-4" />,
            value: classified?.colour ? formatColour(classified?.colour) : null,
        }
    ]
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
                <FavouriteButton />
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
                            <HTMLParser html={classified.description}/>
                            &nbsp;{/* Used for equal spacing across each card in the grid */}
                        </div>
                    )}

                    <ul className="text-xs md:text-sm text-gray-600 xl:flex grid 
                    grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center
                    justify-between w-full">
                        {getKeyClassifiedInfo(classified)
                            .filter((v) => v.value)
                            .map(({id, icon, value}) => (
                                <li
                                    key={id}
                                    className="font-semibold flex xl:flex-col items-center
                                    gap-x-1.5"
                                >
                                    {icon} {value}
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0
                lg:gap-x-2 w-full">
                    <Button className="flex-1 transition-colors hover:border-white 
                        hover:text-white py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                        asChild
                        variant="outline"   
                        size="sm"
                    >
                        <Link href={routes.reserve(classified.slug, MultiStepFormEnum.WELCOME)}>
                            Reserve
                        </Link>         
                    </Button>
                    <Button className="flex-1 py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                        asChild
                        size="sm"
                    >
                        <Link href={routes.singleClassified(classified.slug)}>
                            View Details
                        </Link>         
                    </Button>
                </div>
            </div>
        </div>
    )
}