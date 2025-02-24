import { ClassifiedWithImages, Favourites } from "@/config/types";
import { ClassfiedCard } from "./classified-card";

interface classifiedsListProps {
    classifieds: ClassifiedWithImages[];
    favourites: number[];
}

export const ClassifiedsList = (props: classifiedsListProps) => {
    const { classifieds, favourites } = props;

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {classifieds.map((classified) => {
                    return (
                        <ClassfiedCard 
                            key={classified.id} 
                            classified={classified} 
                            favourites={favourites}
                        />
                    )
                })}
            </div>
        </div>
    )
}