import { atom } from 'recoil'

export const jobsState = atom({
	key: 'jobs-state',
	default: []
})

export const paramsState = atom({
	key: 'params-state',
	default: {}
})

export const pageState = atom({
	key: 'page-state',
	default: 1
})

export const hasNextPageState = atom({
	key: 'hasNextPage-state',
	default: false
})
