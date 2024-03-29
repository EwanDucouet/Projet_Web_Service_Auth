import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import StoreUserValidator from 'App/Validators/Auth/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator'

export default class AuthController {
    public async register({ request, response } : HttpContextContract) {

        const payload = await request.validate(StoreUserValidator)
      
        const user = await User.create(payload.user)
      
        return response.created(user) // 201 CREATED
    }

    public async login({ auth, request, response }: HttpContextContract) {

        const { email, password } = await request.validate(LoginValidator)
    
        const token = await auth.attempt(email, password)
        const user = auth.user!
    
        return response.ok({
          "token": token,
          ...user.serialize(),
        })
    }

    public async me({auth, response} : HttpContextContract) {

        return response.ok({ auth.user })
    }

    public async update({ auth, request, response } : HttpContextContract) {

        const payload = await request.validate(UpdateUserValidator)
      
        const user = await auth.user!.merge(payload).save()
      
        return response.ok(user) // 200 OK
    }
}
