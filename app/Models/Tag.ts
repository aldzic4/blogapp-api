import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Post, {
    pivotTable: "post_tag",
    localKey: "id",
    pivotForeignKey: "tag_id",
    relatedKey: "slug",
    pivotRelatedForeignKey: "post_slug"  })
  public posts: ManyToMany<typeof Post>
} 
