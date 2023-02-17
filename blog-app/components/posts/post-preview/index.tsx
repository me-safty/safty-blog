import { FC, useState } from "react"
import { Author, Post } from "../../../typing"
import { SubmitHandler, useForm } from "react-hook-form"
import { sanityClint, urlFor } from "../../../sanity"
import PortableText from "react-portable-text"
import Image from "next/image"
import dynamic from "next/dynamic"
import join from "../../../public/join.svg"
import { useSession } from "next-auth/react"
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
	const [submit, setSubmit] = useState<boolean>(false)
	const { data: session } = useSession()
	const { register, handleSubmit } = useForm<IFormProps>()
	const onSubmit: SubmitHandler<IFormProps> = async (data) => {
		if (session) {
			data.name = session?.user?.name as string
			data.email = session?.user?.email as string
			//@ts-ignore
			data.userId = session?.user?.id
			await fetch("/api/create-comment", {
				method: "POST",
				body: JSON.stringify(data),
			})
				.then(() => {
					setSubmit(true)
				})
				.catch((error) => {
					console.log(error)
					setSubmit(false)
				})
		}
	}
	console.log(post)
	console.log(session)
	return (
		<div className="relative">
			<div className=" absolute top-0 left-0 w-full h-[300px] bg-orange-300" />
			<div className="container relative">
				<div className="flex items-center gap-32 py-14 px-5">
					<div className="w-[67%]">
						<p className="text-green-600 font-medium text-lg">
							{post.category.title}
						</p>
						<h1 className="text-3xl capitalize text-white font-medium leading-10">
							{post.title}
						</h1>
					</div>
					<div className="">
						<div className="mb-5">comments : 10 likes: 100</div>
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
								className="w-12 h-12 rounded-full object-cover min-w-[3rem]"
							/>
							<div className="">
								<p className="text-white font-medium">{post.author.name}</p>
								<p className="text-gray-200 text-sm">
									{new Date(post._createdAt).toLocaleString()}
								</p>
							</div>
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
							<div className="">
								<MarkdownMarkdown
									source={post.mdbody}
									//style={{ whiteSpace: "pre-wrap" }}
								/>
							</div>
						)}
					</div>
				</article>
				<hr className=" border border-orange-300 mx-auto max-w-4xl my-10" />
				{submit ? (
					<div className="flex flex-col bg-green-600  mx-auto max-w-5xl text-white px-9 py-12">
						<h1 className="text-4xl font-bold mb-2">
							Thank you for submitting your comment!
						</h1>
						<p className="text-xl">
							Once it has been approved, it will appear below
						</p>
					</div>
				) : (
					<div className="mx-auto max-w-5xl">
						<p className="text-orange-300">Enjoyed this article?</p>
						<h1 className="text-3xl font-bold">Leave a comment below!</h1>
						<hr className="mt-1" />
						<div className="">
							<form
								className="my-5"
								onSubmit={handleSubmit(onSubmit)}
							>
								{/*<input
									{...register("_id")}
									type="hidden"
									name="_id"
									value={post._id}
								/>
								<label
									htmlFor="name"
									className="block mb-1"
								>
									Name
								</label>
								<input
									{...register("name", { required: true })}
									type="text"
									name="name"
									id="name"
									className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
									placeholder="Your name"
								/>
								<label
									htmlFor="email"
									className="block mb-1"
								>
									Email
								</label>
								<input
									{...register("email", { required: true })}
									type="email"
									name="email"
									id="email"
									placeholder="example@email.com"
									className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
								/>*/}
								{session ? (
									<div className="flex gap-3">
										<Image
											src={session?.user?.image as string}
											alt="author image"
											width={48}
											height={48}
											className="w-12 h-12 rounded-full object-cover min-w-[3rem]"
										/>
										<div className="rounded-3xl w-full outline-none border border-gray-300 p-2 mb-2 shadow focus:shadow-lg duration-300 flex">
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
								) : (
									"register"
								)}
							</form>
							{/*<div className="flex items-center justify-center w-[50%]">
								<Image
									width={400}
									height={400}
									src={join}
									alt="leave a comment"
								/>
							</div>*/}
						</div>
					</div>
				)}
				<div className="p-11 shadow-md shadow-gray-300 mx-auto max-w-5xl my-5">
					<h1 className="text-3xl font-semibold">Comments</h1>
					<hr className="mt-1" />
					<div className="mt-5 space-y-3">
						{!post.comments.length && (
							<h1 className="text-xl">No comments yet!</h1>
						)}
						{post.comments.map((comment) => (
							<div key={comment._id}>
								<p className="text-lg font-semibold">
									<span className="text-green-600">{comment.name}:</span>{" "}
									{comment.comment}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostPreview
