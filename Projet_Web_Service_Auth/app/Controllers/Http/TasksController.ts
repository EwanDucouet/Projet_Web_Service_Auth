import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import StoreTaskValidator from 'App/Validators/Tasks/StoreTaskValidator'
import UpdateTaskValidator from 'App/Validators/Tasks/UpdateTaskValidator'

export default class TasksController {
  public async index ({response}: HttpContextContract) {
    const tasks = await Task.all()
    return response.ok(tasks)
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreTaskValidator)
    const task = await Task.create(payload)
    return response.created(task)
  }

  public async show ({ response, params }: HttpContextContract) {
    console.log(params)
    const task = await Task.findOrFail(params.id)
    return response.ok(task)
  }

  public async update ({ request, response, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    const payload = await request.validate(UpdateTaskValidator)
    task.merge(payload).save()
    return response.ok(task)
  }

  public async destroy ({ response, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    task.delete()
    return response.ok(task)
  }
}
