import { useEffect, useState } from "react"
import { comment } from "../../../../typing"
import Comment from "./Comment"

interface ICommentsProps {
	comments: comment[]
	postId: string
}

const Comments = ({ comments, postId }: ICommentsProps) => {
	const [isClicked, setClick] = useState<boolean>(false)

	useEffect(() => {
		setClick(false)
	}, [comments])

	return (
		<div className="p-3 py-5 sm:p-10 rounded-xl shadow-md shadow-gray-300 sm:mx-6 my-10 bg-orange-300">
			<h1 className="text-3xl font-semibold text-gray-800">Comments</h1>
			<hr className="mt-1 text-gray-800" />
			<div className="mt-5 space-y-4">
				{!comments.length && (
					<h1 className="text-xl text-gray-800 bg-zinc-50 bg-opacity-30 rounded-xl py-5 px-8">
						No comments yet!
					</h1>
				)}
				{comments
					.sort(
						(a, b) =>
							new Date(a._createdAt).getTime() -
							new Date(b._createdAt).getTime()
					)
					.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							postId={postId}
							isClicked={isClicked}
							setClick={setClick}
						/>
					))}
			</div>
		</div>
	)
}

export default Comments
