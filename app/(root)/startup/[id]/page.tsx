import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import markdownit from 'markdown-it'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/app/components/view"


const md = markdownit()

export const experimental_ppr = true

export default async function Page({params} : {
    params: Promise<{id: string}>
}){

    const id = (await params).id

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})

    if(!post) return notFound()

    const parsedContent = md.render(post?.pitch || '')

    return(
        <>
            <section className="pink_container w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]">
                <p className="tag bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">{formatDate(post?._createdAt)}</p>
                <h1 className="heading uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">{post.title}</h1>

                <p className="sub-heading !max-w-5xl font-medium text-[20px] text-white max-w-2xl text-center break-words">{post.description}</p>
            </section>

            <section className="section_container px-6 py-10 max-w-7xl mx-auto">
                <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl"/>

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between flex justify-between items-center gap-5">
                        <Link href={`/user/${post.author?._id}`}
                        className="flex-gap-2 items-center mb-3">
                            <Image src={post.author.image} alt="avatar" width={64} height={64}  className="rounded-full drop-shadow-lg"/>
                            <div>
                                <p className="text-20-medium font-medium text-[20px] text-black">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300 font-medium text-[16px] text-black">@{post.author.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag font-medium text-[16px] bg-red-100 px-4 py-2 rounded-full">{post.category}</p>
                    </div>

                    <h3 
                    className="text-30-bold text-[30px] font-bold text-black"
                    >Pitch Details</h3>

                    {parsedContent ? (
                        <article  
                            className="prose max-w-4xl font-sans break-all"
                            dangerouslySetInnerHTML={{__html: parsedContent}}
                        />
                    ): (
                        <p className="no-result text-black-100 text-sm font-normal"
                        >No Details Provided</p>
                    )}
                </div>

                <hr className="divider border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />
            </section>

            <Suspense fallback={<Skeleton className="view-skeleton bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
                    <View id={id}/>
            </Suspense>
            
        
        </>
    )
}