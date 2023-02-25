import { FC, useEffect, useRef, useState } from "react"
import { Post } from "../../../typing"
import { SubmitHandler, useForm } from "react-hook-form"
import { urlFor } from "../../../utils/sanity"
import PortableText from "react-portable-text"
import Image from "next/image"
import dynamic from "next/dynamic"
import { signIn, useSession } from "next-auth/react"
import Posts from ".."
import Link from "next/link"
import brush2 from "../../../public/brush2.png"
import { useRouter } from "next/router"
import deleteComment from "../../../utils/delete"
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
	const [isClicked, setClick] = useState<boolean>(false)
	const [view, setView] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>("")
	const router = useRouter()
	const comments = useRef<null | HTMLDivElement>(null)

	function refreshData() {
		router.replace(router.asPath)
	}

	useEffect(() => {
		comments.current?.scrollIntoView({ behavior: "smooth" })
		setClick(false)
		setInputValue("")
	}, [post])

	const authorBlogs = post.author.posts.filter((blog) => post._id !== blog._id)
	const onSubmit: SubmitHandler<IFormProps> = async (data) => {
		if (session && isClicked === false) {
			try {
				setClick(true)
				//@ts-ignore
				data.userId = session?.user?.id as string
				data.name = session?.user?.name as string
				data.email = session?.user?.email as string
				await fetch("/api/create-comment", {
					method: "POST",
					body: JSON.stringify(data),
				})
				refreshData()
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<div className="relative">
			<div className=" absolute top-0 left-0 w-full h-[420px] lg:h-[300px] bg-green-700" />
			<div className="container relative">
				<div className="flex lg:items-center flex-col lg:flex-row lg:gap-32 py-8 lg:py-12 px-5 group relative overflow-hidden">
					<Image
						src={brush2.src}
						width={brush2.width}
						height={brush2.height}
						alt="bg image"
						className="absolute -top-10 -left-3 opacity-10 hidden lg:block"
					/>
					<div className="lg:w-[56%] relative">
						<p className=" text-orange-300 font-medium text-lg">
							{post.category.title}
						</p>
						<h1 className="text-[26px] lg:text-3xl mb-2 capitalize text-white font-medium leading-10">
							{post.title}
						</h1>
						<div className="flex w-20 h-[5px] gap-1">
							<div className="w-[80%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
							<div className="w-[20%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
						</div>
					</div>
					<div className="relative">
						<Link href={`/users/${post.author.slug?.current}`}>
							<div className="flex w-fit items-center gap-3 mt-5 bg-gray-50 bg-opacity-20 p-3 px-4 rounded-xl">
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
						<div className="mt-3 flex lg:justify-center text-center text-orange-300 font-medium text-xl">
							<p className="bg-gray-50 bg-opacity-20 px-3 py-1 rounded-xl">
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
					className="w-full h-[260px] sm:h-[450px] lg:h-[600px] rounded-3xl object-cover"
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
						<h1 className="text-2xl sm:text-3xl font-semibold px-6 mb-5">
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
					<h1 className="text-2xl sm:text-3xl font-bold">
						Leave a comment below!
					</h1>
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
								<div className="rounded-3xl w-full outline-none border border-gray-300 p-2 shadow focus:shadow-lg duration-300 flex flex-col sm:flex-row">
									<input
										{...register("comment", { required: true })}
										type="text"
										name="comment"
										id="comment"
										required
										placeholder="write your comment."
										className="w-full outline-none p-1 h-10 sm:h-fit"
										onChange={(e) => setInputValue(e.target.value)}
										value={inputValue}
									/>
									<input
										type="submit"
										value="Submit"
										className={`bg-orange-300 text-white py-1 px-5 rounded-3xl shadow-md ${
											isClicked ? "" : "hover:bg-orange-400 cursor-pointer"
										}  duration-300`}
										style={{
											opacity: isClicked ? 0.5 : 1,
										}}
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
				<div
					ref={comments}
					className="p-3 py-5 sm:p-10 rounded-xl shadow-md shadow-gray-300 sm:mx-6 my-10 bg-orange-300"
				>
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
								className="flex gap-3 bg-zinc-50 bg-opacity-30 rounded-xl px-3 py-3 sm:px-5"
								key={comment._id}
							>
								<Link href={`/users/${comment.author.slug.current}`}>
									<Image
										src={comment.author.imglink as string}
										alt="author image"
										width={48}
										height={48}
										className="min-w-[48px] h-12 rounded-full object-cover"
									/>
								</Link>
								<div>
									<h2 className="text-lg sm:text-xl font-medium flex sm:items-center sm:gap-1 flex-col sm:flex-row">
										<Link href={`/users/${comment.author.slug.current}`}>
											{comment.author.name}{" "}
										</Link>
										<span className="text-xs sm:text-sm text-gray-700">
											{new Date(comment._createdAt).toLocaleString()}
										</span>
										{
											//@ts-ignore
											session?.user.id === comment.author._id && (
												<button
													onClick={() => {
														deleteComment(comment._id)
														refreshData()
													}}
													className="flex items-center justify-center px-1 bg-gray-100 rounded-full w-6 h-6 bg-opacity-50 cursor-pointer duration-150 hover:bg-opacity-80 text-sm"
												>
													x
													{/*<span className="block mb-[10px]">.</span>
													<span className="block mb-[10px]">.</span>
													<span className="block mb-[10px]">.</span>
													{view && (
														<button onClick={() => deleteComment(comment._id)}>
															x
														</button>
													)}*/}
												</button>
											)
										}
									</h2>
									<p className="sm:text-lg mt-1 sm:mt-0">{comment.comment}</p>
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
