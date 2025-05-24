import { formatDate } from "@/lib/utils";
import { format } from "path";
import React from "react";
import {EyeIcon} from 'lucide-react'
import Link from "next/link";
import Image from 'next/image'

export default function StartupCard({post} : {post: StartupTypeCard}){
    const { _createdAt, views, author: {_id: authorId,name}, title, category, _id, image, description } = post
    return (
        <li className="startup-card bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 group">
            <div className="flex justify-between items-center">
                <p className="startup_card_date font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary"/>
                    <span className="font-medium text-[16px] text-black">{views}</span>
                </div>
            </div>  

            <div className="flex justify-between items-center mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${authorId}`}>
                        <p className="font-medium text-[16px] text-black line-clamp-1">{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-2xl font-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>

                <Link href={`/user/${_id}`}>
                    <Image src="https://placehold.co/48x48" alt="placeholder"
                    width={48} height={48} className='rounded-full' />
                </Link>

            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">{description}</p>
            </Link>

            <img src={post.image} alt="placeholder" className="startup-card_img w-full h-[164px] rounded-[10px] object-cover" />

            <div className="flex-between flex justify-between items-center gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium font-medium text-[16px] text-black">{category}</p>
                </Link>
                <button className="startup-card_btn rounded-full bg-black font-medium text-[16px] text-white px-5 py-3 !important" >
                    <Link href={`/startup/${_id}`}>Details</Link>
                </button>
            </div>
        </li>
    )
}