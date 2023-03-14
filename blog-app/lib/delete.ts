const deleteComment = async (_id: string) => {
	try {
		await fetch("/api/delete", {
			method: "DELETE",
			body: _id,
		})
	} catch (error) {
		console.log(error)
	}
}
export default deleteComment
