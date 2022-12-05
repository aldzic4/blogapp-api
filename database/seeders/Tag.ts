import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from 'App/Models/Tag'

export default class extends BaseSeeder {
  public async run () {
    await Tag.createMany([
      {
       name: "sport"
      },
      {
        name: "music"
       },
       {
        name: "art"
       },
       {
        name: "business"
       },
       {
        name: "film"
       },
       {
        name: "lifestyle"
       },
       {
        name: "politics"
       }
    ])
  }
}
