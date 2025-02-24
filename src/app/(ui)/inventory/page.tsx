import type { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

import { ClassfiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

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
            <ClassifiedsList 
                classifieds={classifieds} 
                favourites={favourites ? favourites.ids : []}
            />
        </>
    )
}

export default InventoryPage