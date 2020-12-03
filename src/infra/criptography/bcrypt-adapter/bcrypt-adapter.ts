import { Hasher } from "@/data/protocols/cryptography/hasher"
import { HashCompare } from "@/data/protocols/cryptography/hash-compare"
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor (private readonly salt: number) {}

  async  hash (value: string): Promise<string> {
    const hashValue = await bcrypt.hash(value, this.salt)
    return hashValue
  }

  async compare (value: string, hash: string ): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return null
  }

}