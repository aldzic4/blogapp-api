import Tag from "App/Models/Tag";

export default class TagsController {
    public async show({ response }) {

        const allTags = await Tag.query()
        const tags: String[] = []
        allTags.map(tag => tags.push(tag.name))

        return response.status(200).json({
            tags
        })
    }
}
