import { comment, Post } from "../../../typing"
import { urlFor } from "../../../utils/sanity"
import PortableText from "react-portable-text"
import Image from "next/image"
import dynamic from "next/dynamic"
import Posts from ".."
import Link from "next/link"
import brush2 from "../../../public/brush2.png"
import Comments from "./comments/Comments"
import CommentSubmitForm from "./comments/CommentSubmitForm"
import { useState } from "react"
const MarkdownMarkdown = dynamic(
	() =>
		import("@uiw/react-md-editor").then((mod) => {
			return mod.default.Markdown
		}),
	{ ssr: false }
)

interface PostPreviewProps {
	post: Post
}

const PostPreview = ({ post }: PostPreviewProps) => {
	const [postData, setPostData] = useState<Post>(post)
	const [commentsData, setCommentsData] = useState<comment[]>(post.comments)

	const authorBlogs = postData.author.posts.filter(
		(blog) => post._id !== blog._id
	)
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
						priority
						className="absolute -top-10 -left-3 opacity-10 hidden lg:block"
					/>
					<div className="lg:w-[56%] relative">
						<p className=" text-orange-300 font-medium text-lg">
							{postData.category.title}
						</p>
						<h1 className="text-[26px] lg:text-3xl mb-2 capitalize text-white font-medium leading-10">
							{postData.title}
						</h1>
						<div className="flex w-20 h-[5px] gap-1">
							<div className="w-[80%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
							<div className="w-[20%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
						</div>
					</div>
					<div className="relative">
						<Link href={`/users/${postData.author.slug?.current}`}>
							<div className="flex w-fit items-center gap-3 mt-5 bg-gray-50 bg-opacity-20 p-3 px-4 rounded-xl">
								<Image
									src={
										postData.author.imglink
											? postData.author.imglink
											: urlFor(postData.author.image).url()
									}
									alt="author image"
									width={48}
									height={48}
									className="w-14 h-14 rounded-full object-cover min-w-[3rem]"
								/>
								<div>
									<p className="text-white font-medium text-xl">
										{postData.author.name}
									</p>
									<p className="text-gray-200">
										{new Date(postData._createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						</Link>
						<div className="mt-3 flex lg:justify-center text-center text-orange-300 font-medium text-xl">
							<p className="bg-gray-50 bg-opacity-20 px-3 py-1 rounded-xl">
								comments:{" "}
								<span className=" text-fuchsia-500">
									{postData.comments.length}
								</span>
							</p>
						</div>
					</div>
				</div>
				<Image
					alt={postData.title}
					width={900}
					height={600}
					className="w-full h-[260px] sm:h-[450px] lg:h-[600px] rounded-3xl object-cover"
					src={urlFor(postData.mainImage).url()}
				/>
				<article className="px-3">
					<div className="mt-10 text-lg px-3">
						{postData.body ? (
							<PortableText
								dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
								projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
								content={postData.body}
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
								<MarkdownMarkdown source={postData.mdbody} />
							</div>
						)}
					</div>
				</article>
				{postData.author.posts.length && (
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
				<CommentSubmitForm
					post={postData}
					setPostData={setPostData}
					setCommentsData={setCommentsData}
				/>
				<Comments
					comments={postData.comments}
					postId={postData._id}
					//postData={postData}
					setPostData={setPostData}
					commentsData={commentsData}
					setCommentsData={setCommentsData}
				/>
			</div>
		</div>
	)
}

export default PostPreview
