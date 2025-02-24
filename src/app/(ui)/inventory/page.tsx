import type { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

import { ClassfiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { Pagination } from "@/components/ui/pagination";

const getInventory = async (searchParams: AwaitedPageProps['searchParams']) => {
    return prisma.classified.findMany({
        include: { images: true },
    });
}

const InventoryPage = async (props: PageProps) => {
    const searchParams = await props.searchParams;
    const classifieds = await getInventory(searchParams);
    const count = await prisma.classified.count();

    const sourceId = await getSourceId()
    const favourites = await redis.get<Favourites>(sourceId ?? "");

    return (
        <>
            <div className="flex">
            {/* <Sidebar /> */}

                <div className="flex p-4 bg-white">
                    <div className="flex space-y-2 flex-col items-center justify-center
                    pb-4 -mt-1">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
                                We have found {count} classifieds...
                            </h2>
                            {/* <DialogFilters /> */}
                        </div>
                        <Pagination/>
                        <ClassifiedsList 
                            classifieds={classifieds} 
                            favourites={favourites ? favourites.ids : []}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventoryPage