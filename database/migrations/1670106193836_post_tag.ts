import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'post_tag'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.integer('tag_id').references("tags.id").unsigned().onDelete('CASCADE')
      table.string('post_slug').references("posts.slug").unsigned().onDelete('CASCADE')

      table.unique(["tag_id", "post_slug"]);

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
