import { HttpResponse } from '@/presentation/protocols/http'

export const ok = (body: object): HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})