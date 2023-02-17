export interface Post {
	_id: string
	_createdAt: Date
	title: string
	description: string
	mainImage: {
		asset: {
			_ref: string
		}
	}
	author: Author
	slug: {
		current: string
	}
	category: category
	body: object[]
	comments: comment[]
	mdbody: string
}
export interface Author {
	_id: string
	name: string
	email: string
	image: string
	imglink: string
	posts: post[]
	slug: {
		current: string
	}
}
export interface comment {
	_id: string
	_createdAt: string
	comment: string
	email: string
	name: string
	post: Post
}
export interface category {
	_id: string
	title: string
	posts: Post[]
}
