import { sanityClint } from "./sanity"

//export default async function getComment(commentId: string) {
//	const query = `*[_type == "comment" && _id == $commentId][0]{
//    _id,
//    _createdAt,
//    comment,
//    author-> {
//      _id,
//      name,
//      imglink,
//      slug
//    }
//	}`

//	const comment = await sanityClint.fetch(query, {
//		commentId,
//	})

//  return comment
//}
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
//export default async function getPost(postId: string) {
//	const query = `*[_type == "post" && _id == $postId][0]{
//		_id,
//		_createdAt,
//		title,
//		description,
//		mainImage,
//		author-> {
//			name,
//			email,
//			image,
//			imglink,
//			slug,
//			'posts': *[
//				_type == "post" && 
//				author._ref == ^._id
//			]{
//				_id,
//				_createdAt,
//				title,
//				description,
//				mainImage,
//				author-> {
//					name,
//					email,
//					image,
//					imglink,
//					slug
//				},
//				slug,
//				category-> {
//					title
//				}
//			},
//		},
//		slug,
//		body,
//		mdbody,
//	  'comments': *[
//	    _type == "comment" &&
//	    post._ref == ^._id
//	  ]{
//			_id,
//			_createdAt,
//			comment,
//			author-> {
//				_id,
//				name,
//				imglink,
//				slug
//			}
//		},
//		category-> {
//			title
//		}
//	}`
//	const post = await sanityClint.fetch(query, {
//		postId,
//	})

//	return post
//}
