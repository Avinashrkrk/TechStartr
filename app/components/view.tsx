import React from "react"
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"

export default async function View ({id}:{id: string}){
    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id})
    return (
        <div className="view-container flex justify-end items-center mt-5 fixed bottom-3 right-3">
            <div 
            className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
                <span className="font-black  text-[16px] bg-red-100 px-4 py-2 rounded-full">Views: {totalViews}</span>

            </p>
        </div>
    )
}