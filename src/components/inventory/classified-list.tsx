import { ClassifiedWithImages } from "@/config/types";
import { ClassfiedCard } from "./classified-card";

interface classifiedsListProps {
    classifieds: ClassifiedWithImages[];
}

export const ClassifiedsList = (props: classifiedsListProps) => {
    const { classifieds } = props;

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {classifieds.map((classified) => {
                    return <ClassfiedCard key={classified.id} classified={classified} />;
                })}
            </div>
        </div>
    )
}