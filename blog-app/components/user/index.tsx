import { urlFor } from "../../utils/sanity"
import { Author } from "../../typing"
import Image from "next/image"
import Baner from "../baner"
import Posts from "../posts"
import RightArrow from "../icons/RightArrow"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Button from "../button"

interface userProps {
	author: Author
}

const User = ({ author }: userProps) => {
	const { data: session } = useSession()
	const ownProfile = author.email === session?.user?.email
	return (
		<>
			<div className="w-full h-[180px] bg-green-600 relative">
				<Baner
					firstTitle={ownProfile ? "welcome" : "welcome to"}
					secondTitle={
						ownProfile
							? author.name.split(" ")[0]
							: `${author.name.split(" ")[0]}'s profile`
					}
				/>
				{ownProfile && (
					<Link href="/post-blog">
						<Button
							title="write a blog"
							onClick={() => undefined}
						/>
					</Link>
				)}
			</div>
			<div className="container">
				<div>
					<div className="flex gap-5 my-10 items-center">
						<Image
							src={author.imglink ? author.imglink : urlFor(author.image).url()}
							alt="profile image"
							width={140}
							height={140}
							className="rounded-full w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]"
						/>
						<div>
							<p className="text-2xl sm:text-3xl font-medium mb-1">
								{author.name}
							</p>
							{ownProfile && <p className="sm:text-lg">{author.email}</p>}
						</div>
					</div>
				</div>
				<p className="text-3xl font-medium text-green-600 ml-3">
					{ownProfile && "Your "}Posts
				</p>
				<div className="w-full h-[1px] bg-gray-300 ml-3 my-2"></div>
				<div>
					{!author.posts.length && (
						<p className="font-medium text-2xl ml-3 my-10 h-[40vh]">
							No Blogs yet!
						</p>
					)}
					{author.posts && (
						<Posts
							posts={author.posts}
							showDeferentFirstBlog={false}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default User
