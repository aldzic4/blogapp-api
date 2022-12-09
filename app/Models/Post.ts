import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import Tag from './Tag'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public slug: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public body: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @manyToMany(() => Tag, {
    pivotTable: "post_tag",
    localKey: "slug",
    pivotForeignKey: "post_slug",
    relatedKey: "id",
    pivotRelatedForeignKey: "tag_id"
  })
  public tags: ManyToMany<typeof Tag>
}
