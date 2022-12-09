import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/Posts/CreatePostValidator";
import UpdatePostValidator from "App/Validators/Posts/UpdatePostValidator";

export default class PostsController {
    public async show({ response, request }) {

        const { tag = '' } = request.qs()
        const blogPosts = await Post.query()
            .if(tag, query => query.whereHas('tags', query => query.select('*').whereILike('name', `%${tag.toLowerCase()}%`)
            ).preload('tags'))
            .orderBy('createdAt', 'desc')

        return response.status(200).json({
            blogPosts
        })
    }

    public async showById({ params, response }) {
        const { slug } = params

        const blogPost = await Post.query().where('slug', slug).preload('tags')

        return response.status(200).json({
            blogPost
        })
    }

    public async create({ request, response }) {
        const { tags, ...payload } = await request.validate(CreatePostValidator)

        function convertToSlug(title) {
            return title.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
        }
        const blogPost = await Post.create({
            ...payload,
            slug: convertToSlug(payload.title)
        })
        tags?.forEach(tag => {
            blogPost.related('tags').attach([tag])
        });

        return response.status(200).json({
            blogPost
        })
    }

    public async update({ request, response, params }) {
        const { slug } = params
        const { tags, ...payload } = await request.validate(UpdatePostValidator)

        const post = await Post.findByOrFail('slug', slug)

        post.merge(payload)
        
        post.related('tags').detach()
        tags?.forEach(tag => {
            post.related('tags').attach([tag])
        });

        await post.save()

        return response.status(200).json({
            post
        })
    }

    public async delete({ params, response }) {
        const { slug } = params

        const post = await Post.findByOrFail('slug', slug)

        await post.delete()

        return response.status(200).json({
            message: `Post ${slug} has been deleted`
        })
    }
}
