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
	post: Post
	author: Author
}
export interface commentWithRef {
	_type: string
	_id: string
	_createdAt?: string
	comment: string
	author: {
		_type: string
		_ref: string
	}
	post: {
		_ref: string
		_type: string
	}
}
export interface category {
	_id: string
	title: string
	posts: Post[]
}
