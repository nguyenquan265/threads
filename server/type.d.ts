import { AuthObject } from '@clerk/express'
import express from 'express'

declare module 'express' {
  interface Request {
    auth?: AuthObject
  }
}
