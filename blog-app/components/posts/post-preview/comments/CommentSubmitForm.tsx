import { Post } from "../../../../typing"
import { signIn, useSession } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import LoadingSpinier from "../../../icons/LoadingSpinier"

interface ICommentSubmitForm {
	post: Post
}

interface IFormProps {
	_id: string
	userId: string
	name: string
	email: string
	comment: string
}

const CommentSubmitForm = ({ post }: ICommentSubmitForm) => {
	const { data: session } = useSession()
	const { register, handleSubmit } = useForm<IFormProps>()
	const [isClicked, setClick] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>("")
	const router = useRouter()

	function refreshData() {
		router.replace(router.asPath)
	}

	useEffect(() => {
		//comments.current?.scrollIntoView({ behavior: "smooth" })
		setClick(false)
		setInputValue("")
	}, [post])

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
		<div className="mx-auto max-w-5xl">
			<p className="text-orange-300">Enjoyed this article?</p>
			<h1 className="text-2xl sm:text-3xl font-bold">Leave a comment below!</h1>
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
						<Link href={`/users/${post.author.slug.current}`}>
							<Image
								src={session?.user?.image as string}
								alt="author image"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover min-w-[3rem]"
							/>
						</Link>
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
							{isClicked && (
								<div className="animate-spin">
									<LoadingSpinier className="scale-[.70]" />
								</div>
							)}
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
	)
}

export default CommentSubmitForm
