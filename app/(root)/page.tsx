import Image from "next/image";
import SearchForm from "@/app/components/SearchForm";
import StartupCard, { StartupTypeCard } from "../components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live"
import { auth } from "@/auth";

export default async function Home({ searchParams} : {
  searchParams: Promise<{query?: string}>
}) {

  const query = (await searchParams).query
  const params = {search: query || null}

  const session = await auth()

  console.log(session?.user?.id);


  const {data : posts} = await sanityFetch({query: STARTUPS_QUERY, params})

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
        {query ? `Search results for "${query}"` : 'All Startups'}
      </p>

      <ul className="mt-7 card_grid grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {posts?.length >  0 ?(
          posts.map((post: StartupTypeCard
          ) => (
              <StartupCard key={post._id} post={post} />
            ))
        ): (
          <p className="no-results text-black-100 text-sm font-normal">No startups found</p>
        )}

      </ul>

    </section>

    <SanityLive />
    </>
  );
}
