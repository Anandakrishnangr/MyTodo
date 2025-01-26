import bcryptjs from 'bcryptjs'

export const hashPassword = async (password:string) => bcryptjs.hash(password, await bcryptjs.genSalt(10))
export const comparePassword = async (password:string, hash:string) => bcryptjs.compare(password, hash)