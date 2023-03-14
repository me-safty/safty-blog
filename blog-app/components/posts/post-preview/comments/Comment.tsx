import React, { useState } from "react"
import { comment } from "../../../../typing"
import { useSession } from "next-auth/react"
import LoadingSpinier from "../../../icons/LoadingSpinier"
import Link from "next/link"
import editComment from "../../../../lib/edit-comment"
import Image from "next/image"
import EditDeleteControl from "./EditDeleteControl"
import getComments from "../../../../lib/get-comments"

interface ICommentProps {
	comment: comment
	postId: string
	isClicked: boolean
	setClick: React.Dispatch<React.SetStateAction<boolean>>
	setCommentsData: React.Dispatch<React.SetStateAction<comment[]>>
}

const Comment = ({
	comment,
	postId,
	isClicked,
	setClick,
	setCommentsData,
}: ICommentProps) => {
	const { data: session } = useSession()
	const [loading, setLoading] = useState<boolean>(false)
	const [editLoading, setEditLoading] = useState<boolean>(false)
	const [edit, setEdit] = useState<boolean>(false)
	const [value, setValue] = useState<string>(comment.comment)

	async function refreshData() {
		setTimeout(async () => {
			const newComments = await getComments(postId)
			setCommentsData(newComments)
			setLoading(false)
			setEdit(false)
			setEditLoading(false)
			setClick(false)
		}, 2000)
	}
	
	function handleEditComment(commentText: string) {
		editComment({
			_type: "comment",
			_id: comment._id,
			author: {
				_type: "reference",
				_ref: comment.author?._id,
			},
			post: {
				_ref: postId,
				_type: "reference",
			},
			comment: commentText,
		})
	}

	return (
		<div
			className="flex gap-2 rounded-xl"
			key={comment._id}
		>
			<Link href={`/users/${comment.author?.slug.current}`}>
				<Image
					src={comment.author?.imglink as string}
					alt="author image"
					width={48}
					height={48}
					className="h-10 w-10 mt-3 min-w-[40px] sm:min-w-[48px] sm:h-12 rounded-full object-cover"
				/>
			</Link>
			<div className="flex-1 bg-zinc-50 bg-opacity-30 rounded-xl px-3 py-2 sm:px-5">
				<div className="flex items-center gap-1 sm:gap-2">
					<h2 className="sm:text-xl font-medium flex sm:items-center sm:gap-1 flex-col sm:flex-row">
						<Link href={`/users/${comment.author?.slug.current}`}>
							{comment.author?.name}{" "}
						</Link>
						<span className="text-[10px] sm:text-xs text-gray-700">
							{new Date(comment._createdAt).toLocaleString()}
						</span>
					</h2>
				</div>
				{edit ? (
					<div className="mt-1 bg-white rounded-3xl items-center w-full outline-none border border-gray-300 px-2 py-1 shadow focus:shadow-lg duration-300 flex flex-col sm:flex-row">
						<input
							type="text"
							placeholder="write your comment"
							value={value}
							onChange={(e) =>
								setValue(e.target.value)
							}
							className="w-full outline-none p-1 h-10 sm:h-fit"
							required
						/>
						{editLoading && (
							<div className="animate-spin">
								<LoadingSpinier className=" scale-[.60]" />
							</div>
						)}
						<button
							onClick={() => {
								if (isClicked === false && value) {
									handleEditComment(value)
									setClick(true)
									setEditLoading(true)
									refreshData()
								}
							}}
							className={`w-full sm:w-fit bg-orange-300 text-white py-[2px] px-5 rounded-3xl shadow-md ${
								isClicked
									? "cursor-default"
									: "hover:bg-orange-400 cursor-pointer"
							}  duration-300`}
							style={{
								opacity: isClicked ? 0.5 : 1,
							}}
						>
							send
						</button>
					</div>
				) : (
					<p className="text-sm sm:text-lg mt-1 sm:mt-0">{comment.comment}</p>
				)}
			</div>
			{
				//@ts-ignore
				session?.user.id === comment.author?._id && (
					<EditDeleteControl
						setEdit={setEdit}
						loading={loading}
						setLoading={setLoading}
						setClick={setClick}
						isClicked={isClicked}
						refreshData={refreshData}
						commentId={comment._id}
					/>
				)
			}
		</div>
	)
}

export default Comment
