import { z, ZodType } from 'zod'
import { del, get, patch, post, put } from '../instance'

type Method = typeof get | typeof post | typeof put | typeof patch | typeof del

/**
 * @description Create a safe API function that validates the response type
 * @example
 *```ts
 * const safeGet = safeFactory(get) ;
 * const user = await safeGet (userSchema) ('/user');
 * ```
 */

const safeFactory =
  <A extends Parameters<Method>>(method: (...args: A) => ReturnType<Method>) =>
  <Z extends ZodType>(zodSchema: Z) =>
  async (...args: A): Promise<z.infer<Z>> => {
    const response = await method(...args)

    const parsed = zodSchema.safeParse(response)

    if (parsed.error) throw new Error('API_TYPE_NOT_MATCH')

    return parsed.data
  }
export const safeGet = safeFactory(get)
export const safePost = safeFactory(post)
export const safePut = safeFactory(put)
export const safePatch = safeFactory(patch)
export const safeDel = safeFactory(del)
