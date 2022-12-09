import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'

export default class extends BaseSeeder {
  public async run () {
    await Comment.createMany([
      {
       postSlug: 'dobra-partija-nurkica-u-sigurnom-trijumfu-portlanda',
       body: 'bosnian beast'
      },

      {
        postSlug: 'dobra-partija-nurkica-u-sigurnom-trijumfu-portlanda',
        body: 'bosanska zvijer'
       },

       {
        postSlug: 'dobra-partija-nurkica-u-sigurnom-trijumfu-portlanda',
        body: 'ponos'
       },

       {
        postSlug: 'dzanan-musa-bez-promasene-trojke',
        body: 'musa>doncic'
       },

    ])

    }
}
