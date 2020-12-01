import { Controller } from '@/presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}