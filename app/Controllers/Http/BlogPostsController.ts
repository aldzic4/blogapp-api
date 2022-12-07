import BlogPost from "App/Models/BlogPost";
import BlogPostTag from "App/Models/BlogPostTag";
import CreateBlogPostValidator from "App/Validators/BlogPosts/CreateBlogPostValidator";
import UpdateBlogPostValidator from "App/Validators/BlogPosts/UpdateBlogPostValidator";

export default class BlogPostsController {
    public async show({ response }) {
        const blogPosts = await BlogPost.query()

        return response.status(200).json({
            blogPosts
        })
    }

    public async showById({ params, response }) {
        const { slug } = params

        const blogPost = await BlogPost.query().where('slug', slug).first()

        return response.status(200).json({
            blogPost
        })
    }

    public async create({ request, response }) {
        const { tags, ...payload } = await request.validate(CreateBlogPostValidator)

        function convertToSlug(title) {
            return title.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
        }
        const blogPost = await BlogPost.create({
            ...payload,
            slug: convertToSlug(payload.title),
        })

        await BlogPostTag.createMany(
            tags.map((tag: BlogPostTag) => ({
                tagId: tag.id,
                blogPostSlug: blogPost.slug
            }))
        )

        return response.status(200).json({
            blogPost
        })
    }

    public async update({ request, response, params }) {
        const { slug } = params
        const { tags, ...payload } = await request.validate(UpdateBlogPostValidator)

        const post = await BlogPost.findByOrFail('slug', slug)

        post.merge(payload)
        await post.save()

        if (tags) {
            await BlogPostTag.query().where('blogPostSlug', post.slug).delete()

            await BlogPostTag.createMany(
                tags.map((tag: BlogPostTag) => ({
                    tagId: tag.id,
                    blogPostSlug: post.slug
                }))
            );

        }

        return response.status(200).json({
            post
        })
    }


    public async delete({params, response}){
        const{slug} = params

        const post = await BlogPost.findByOrFail('slug', slug)

       await post.delete()

       return response.status(200).json({
        message: `Post ${slug} has been deleted`
       })
    }
}
