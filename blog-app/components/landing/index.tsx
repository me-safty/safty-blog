import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { category, Post } from "../../typing"
import Baner from "../baner"
import Catagories from "../catagories"
import RightArrow from "../RightArrow"
import Trends from "../trends"
export interface Props {
	catagories: category[]
	posts: Post[]
}

const Landing: NextPage<Props> = ({ catagories, posts }) => {
	const { data: session } = useSession()
	return (
		<div className="bg-gray-50 py-10">
			<div className="relative">
				<Baner />
				{session ? (
					<Link href="/post-blog">
						<button className="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] shadow-lg group hover:py-3 hover:px-7 active:py-1 active:px-4 bg-orange-300  hover:brightness-95 duration-150 rounded-full flex items-center px-6 py-2 text-white whitespace-nowrap text-lg sm:text-2xl font-medium">
							post a blog
							<RightArrow className="h-[23px] w-[23px] ml-2 group-hover:fill-green-600 fill-fuchsia-500 mt-[6px]" />
						</button>
					</Link>
				) : (
					<button
						onClick={() => signIn()}
						className="whitespace-nowrap absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] shadow-lg group hover:py-3 hover:px-7 active:py-1 active:px-4 bg-orange-300  hover:brightness-95 duration-150 rounded-full flex items-center px-6 py-2 text-white sm:text-2xl font-medium"
					>
						register and share your story
						<RightArrow className="h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] ml-2 group-hover:fill-green-600 fill-fuchsia-500 mt-[6px]" />
					</button>
				)}
			</div>
			<div className="pt-10">
				<div className="container flex flex-col-reverse lg:flex-row gap-10">
					<div className="h-[420px] lg:w-[65%] xl:w-[70%]">
						<Trends posts={posts} />
					</div>
					<div className="h-[380px] lg:h-[420px] lg:w-[35%] xl:w-[30%]">
						<Catagories catagories={catagories} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
