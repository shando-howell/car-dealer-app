import type { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

import { ClassfiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";

const getInventory = async (searchParams: AwaitedPageProps['searchParams']) => {
    return prisma.classified.findMany({
        include: { images: true },
    });
}

const InventoryPage = async (props: PageProps) => {
    const searchParams = await props.searchParams;
    const classifieds = await getInventory(searchParams);
    const count = await prisma.classified.count();

    // const favourites = await

    return (
        <>
            <ClassifiedsList classifieds={classifieds}/>
        </>
    )
}

export default InventoryPage