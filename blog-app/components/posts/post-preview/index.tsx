import { FC } from "react"
import { Post } from "../../../typing"
import { SubmitHandler, useForm } from "react-hook-form"
import { urlFor } from "../../../sanity"
import PortableText from "react-portable-text"
import Image from "next/image"
import dynamic from "next/dynamic"
import { signIn, useSession } from "next-auth/react"
import Posts from ".."
import Link from "next/link"
const MarkdownMarkdown = dynamic(
	() =>
		import("@uiw/react-md-editor").then((mod) => {
			return mod.default.Markdown
		}),
	{ ssr: false }
)

interface IFormProps {
	_id: string
	userId: string
	name: string
	email: string
	comment: string
}

interface PostPreviewProps {
	post: Post
}

const PostPreview: FC<PostPreviewProps> = ({ post }) => {
	const { data: session } = useSession()
	const { register, handleSubmit } = useForm<IFormProps>()
	const authorBlogs = post.author.posts.filter((blog) => post._id !== blog._id)
	const onSubmit: SubmitHandler<IFormProps> = async (data) => {
		if (session) {
			try {
				//@ts-ignore
				data.userId = session?.user?.id as string
				data.name = session?.user?.name as string
				data.email = session?.user?.email as string
				await fetch("/api/create-comment", {
					method: "POST",
					body: JSON.stringify(data),
				})
				window.location.reload()
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<div className="relative">
			<div className=" absolute top-0 left-0 w-full h-[300px] bg-green-600" />
			<div className="container relative">
				<div className="flex items-center gap-32 py-12 px-5 group">
					<div className="w-[67%]">
						<p className=" text-orange-300 font-medium text-lg">
							{post.category.title}
						</p>
						<h1 className="text-3xl mb-2 capitalize text-white font-medium leading-10">
							{post.title}
						</h1>
						<div className="flex w-20 h-[5px] gap-1">
							<div className="w-[80%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
							<div className="w-[20%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
						</div>
					</div>
					<div>
						<Link href={`/users/${post.author.slug?.current}`}>
							<div className="flex items-center gap-3">
								<Image
									src={
										post.author.imglink
											? post.author.imglink
											: urlFor(post.author.image).url()
									}
									alt="author image"
									width={48}
									height={48}
									className="w-14 h-14 rounded-full object-cover min-w-[3rem]"
								/>
								<div>
									<p className="text-white font-medium text-xl">
										{post.author.name}
									</p>
									<p className="text-gray-200">
										{new Date(post._createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						</Link>
						<div className=" mt-2 text-center text-orange-300 font-medium text-xl">
							<p>
								comments:{" "}
								<span className=" text-fuchsia-500">
									{post.comments.length}
								</span>
							</p>
						</div>
					</div>
				</div>
				<Image
					alt={post.title}
					width={900}
					height={600}
					className="w-full h-[600px] rounded-3xl object-cover"
					src={urlFor(post.mainImage).url()}
				/>
				<article className="px-3">
					<div className="mt-10 text-lg px-3">
						{post.body ? (
							<PortableText
								dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
								projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
								content={post.body}
								serializers={{
									h1: (props: any) => <h1 {...props} />,
									h2: (props: any) => <h1 {...props} />,
									li: ({ children }: any) => <li>{children}</li>,
									link: ({ href, children }: any) => (
										<a href={href}>{children}</a>
									),
								}}
							/>
						) : (
							<div>
								<MarkdownMarkdown source={post.mdbody} />
							</div>
						)}
					</div>
				</article>
				{post.author.posts.length && (
					<>
						<hr className=" border border-orange-300 mx-auto max-w-5xl my-10" />
						<h1 className="text-3xl font-semibold px-6 mb-5">
							Blogs From the Author
						</h1>
						<div>
							<Posts
								posts={authorBlogs.slice(0, 3)}
								showDeferentFirstBlog={false}
							/>
						</div>
					</>
				)}
				<hr className=" border border-orange-300 mx-auto max-w-5xl mb-10 mt-5" />
				<div className="mx-auto max-w-5xl">
					<p className="text-orange-300">Enjoyed this article?</p>
					<h1 className="text-3xl font-bold">Leave a comment below!</h1>
					<hr className="mt-1" />
					{session ? (
						<form
							className="my-5"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="flex gap-3 items-center">
								<input
									{...register("_id")}
									type="hidden"
									name="_id"
									value={post._id}
								/>
								<Image
									src={session?.user?.image as string}
									alt="author image"
									width={48}
									height={48}
									className="w-12 h-12 rounded-full object-cover min-w-[3rem]"
								/>
								<div className="rounded-3xl w-full outline-none border border-gray-300 p-2 shadow focus:shadow-lg duration-300 flex">
									<input
										{...register("comment", { required: true })}
										type="text"
										name="comment"
										id="comment"
										required
										placeholder="write your comment."
										className="w-full outline-none p-1"
									/>
									<input
										type="submit"
										value="Submit"
										className="bg-orange-300 text-white py-1 px-5 rounded-3xl cursor-pointer shadow-md hover:bg-orange-400 duration-300"
									/>
								</div>
							</div>
						</form>
					) : (
						<div className="text-center p-5 rounded-xl text-xl mt-5 bg-green-600 text-white">
							you need to{" "}
							<span
								onClick={() => signIn()}
								className="underline cursor-pointer  font-medium"
							>
								sign in
							</span>{" "}
							first to comment
						</div>
					)}
				</div>
				<div className="p-10 rounded-xl shadow-md shadow-gray-300 mx-6 my-10 bg-orange-300">
					<h1 className="text-3xl font-semibold text-gray-800">Comments</h1>
					<hr className="mt-1 text-gray-800" />
					<div className="mt-5 space-y-4">
						{!post.comments.length && (
							<h1 className="text-xl text-gray-800 bg-zinc-50 bg-opacity-30 rounded-xl py-5 px-8">
								No comments yet!
							</h1>
						)}
						{post.comments.map((comment) => (
							<div
								className="flex items-center gap-3 bg-zinc-50 bg-opacity-30 rounded-xl py-3 px-5"
								key={comment._id}
							>
								<Image
									src={comment.author.imglink as string}
									alt="author image"
									width={48}
									height={48}
									className="w-12 h-12 rounded-full object-cover"
								/>
								<div>
									<h2 className="text-xl font-medium flex items-center gap-1">
										{comment.author.name}{" "}
										<span className="text-sm text-gray-700">
											{new Date(comment._createdAt).toLocaleString()}
										</span>
									</h2>
									<p className="text-lg text-gray-700">{comment.comment}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostPreview
