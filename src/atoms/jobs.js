import { atom } from 'recoil'

export const jobsState = atom({
  key: 'jobs-state',
  default: []
})

export const paramsState = atom({
  key: 'params-state',
  default: {}
})
