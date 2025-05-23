import Image from "next/image";
import SearchForm from "@/app/components/SearchForm";
import StartupCard from "../components/StartupCard";

export default async function Home({ searchParams} : {
  searchParams: Promise<{query?: string}>
}) {

  const query = (await searchParams).query

  const posts = [{
    _createdAt: new Date(),
    _updatedAt: new Date(),
    views : 55,
    author: {_id: 1, name: "Adrian"},
    _id: 1,
    description: "This is a description",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Robots",
    title: "We Robots",
  }]
  return (
    <>
      <section className="w-full  bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
      <h1 className="uppercase bg-black px-6 py-3 font-worksans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 mx-auto">Pitch Your Startup, <br /> connect with <br /> Enterpreneurs</h1>
      <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-3xl">Submit Ideas, Vote on Pitches and Get Noticed in Virtual Compititions.

      </p>

      <SearchForm query={query} />
    </section>

    <section className="section_container px-6 py-10 max-w-7xl mx-auto">
      <p className="text-2xl font-semibold">
        {query ? `Search results for ${query}` : 'All Startups'}
      </p>

      <ul className="mt-7 card_grid grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {posts?.length >  0 ?(
          posts.map((post: StartupTypeCard, index=number
          ) => (
              <StartupCard key={post._id} post={post} />
            ))
        ): (
          <p className="no-results text-black-100 text-sm font-normal">No startups found</p>
        )}

      </ul>

    </section>
    </>
  );
}
