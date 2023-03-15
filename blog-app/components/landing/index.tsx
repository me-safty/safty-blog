import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { category, Post } from "../../typing"
import Baner from "../baner"
import Button from "../button"
import Catagories from "./catagories"
import Trends from "./trends"
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
						<Button
							onClick={() => undefined}
							title="write a blog"
						/>
					</Link>
				) : (
					<Button
						title="register and share your story"
						onClick={() => signIn()}
					/>
				)}
			</div>
			<div className="pt-10">
				<div className="container flex flex-col-reverse lg:flex-row gap-10 overflow-hidden sm:overflow-visible">
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
