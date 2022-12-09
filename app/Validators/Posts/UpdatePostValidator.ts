import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    description: schema.string.optional(),
    body: schema.string.optional(),
    tags: schema.array().members( schema.object().members({
      id: schema.number([rules.exists({ table: "tags", column: "id" })]),
      name: schema.string()
    }))
  })

  public messages: CustomMessages = {}
}
