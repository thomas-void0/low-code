import { createContext } from 'react'
import accessFactory from '@config/access'

export type AccessInstance = ReturnType<typeof accessFactory>
const AccessContext = createContext<AccessInstance>(null!)

export default AccessContext
