import { sanityClint } from "./sanity"

export default async function getComments(postId: string) {
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

	const comments = await sanityClint.fetch(query, {
		postId,
	})

	return comments
}