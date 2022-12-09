// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment"
import Post from "App/Models/Post"
import CreateCommentValidator from "App/Validators/Comments/CreateCommentValidator"

export default class CommentsController {
    public async show({ response, params }) {
        const { slug } = params

        const comments = await Comment.query().whereHas('post', query => query.where('posts.slug', slug))

        return response.status(200).json({
            comments
        })

    }

    public async create({ request, response, params }) {
        const { slug } = params
        const payload = await request.validate(CreateCommentValidator)

        const comment = await Comment.create({
            ...payload,
            postSlug: slug
        })
        return response.status(200).json({
            comment
        })
    }

    public async delete({ params, response }) {
        const { slug, id } = params
        const post = await Post.findBy('slug', slug)
        if (post) {
            const comment = await Comment.findBy('id', id)
            if (comment) {
                comment.delete()
                return response.status(200).json({
                    message: `Comment with an ID ${id} has been deleted.`
                })
            } else {
                return response.status(200).json({
                    message: `Cannot find comment with an ID ${id}.`
                })
            }
        } else {
            return response.status(200).json({
                message: `There is not a post with a ${slug} slug`
            })
        }
    }
}
