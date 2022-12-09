import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public async run () {

    await Post.createMany([
      {
        slug: "dobra-partija-nurkica-u-sigurnom-trijumfu-portlanda",
        title: "Dobra partija Nurkica u sigurnom trijumfu Portlanda",
        description: "Jusuf Nurkic ubacio 19 poena",
        body: "Nurkić je na terenu proveo 27 minute u kojima je dao ogroman doprinos pobjedi. Ukupno je ubacio 19 poena (5/9 za dva, 2/3 za tri, 3/7 za jedan poen). Tome je dodao i šest skokova te četiri asistencije.",
      }
    ])
  }
}
