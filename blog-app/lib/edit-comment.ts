interface Comment {
	commentId: string
	authorId: string
	postId: string
	comment: string
}

const editComment = async ({
	commentId,
	authorId,
	postId,
	comment,
}: Comment) => {
	try {
		await fetch("/api/edit-comment", {
			method: "PUT",
			body: JSON.stringify({
				commentId,
				authorId,
				postId,
				comment,
			}),
		})
	} catch (error) {
		console.log(error)
	}
}
export default editComment
