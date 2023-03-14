import { commentWithRef } from "../typing"

const editComment = async (comment: commentWithRef) => {
	try {
		await fetch("/api/edit-comment", {
			method: "PUT",
			body: JSON.stringify(comment),
		})
	} catch (error) {
		console.log(error)
	}
}
export default editComment
