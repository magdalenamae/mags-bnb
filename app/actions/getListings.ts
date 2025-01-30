import prisma from "@/app/libs/prismadb";

export default async function getListings(category?: str) {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: { category },
        });
        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
