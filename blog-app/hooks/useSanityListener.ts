import { SanityClient } from "next-sanity"
import { useEffect, useState } from "react"
import { comment } from "../typing"

const useSanityListener = (client: SanityClient, postId: string) => {
	const [comments, setComments] = useState<comment[]>([])

	//Listen for data changes in Sanity
	const query = `*[_type == "comment" && post._ref == $postId]{
    _id,
    _createdAt,
    comment,
    author-> {
      _id,
      name,
      imglink,
      slug
    }
  }`
	const params = { postId }

	fetchRecords()

	useEffect(() => {
		const subscription = client
			.listen(query, params)
			.subscribe((newComment) => {
				console.log(JSON.stringify(newComment, null, 4))

				let item = newComment

				let newComments = [...comments, item]
				setComments(newComments as comment[])
			})

		return () => {
			subscription.unsubscribe()
		}
	}, [client])

	function fetchRecords() {
		client.fetch(query, params).then((comments) => {
			console.log(comments)
			setComments(comments)
		})
	}

	return { comments, setComments }
}

export default useSanityListener
