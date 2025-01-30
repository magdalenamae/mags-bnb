import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "./components/Listings/ListingCard";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
}

export default async function Home({ searchParams }: Props) {
  const category = (await searchParams).category;
  const listings = await getListings(category);

  console.log(listings);
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <EmptyState showReset/>
        </Container>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24 
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-6 
          gap-8
          ">
          {listings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
              />
            )
            })}
        </div>
      </Container>
    </ClientOnly>
  );
}
