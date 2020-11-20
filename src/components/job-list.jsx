import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { jobsState, paramsState, pageState, hasNextPageState } from '../atoms/jobs'

// Welcome UI
import { Table } from '@welcome-ui/table'
import { Button } from '@welcome-ui/button'
import { EyeIcon } from '@welcome-ui/icons.eye'
import { Loader } from '@welcome-ui/loader'
import { Pagination } from '@welcome-ui/pagination'

// CORS
const CORS_URL = 'https://cors-anywhere.herokuapp.com/'

const JobList = () => {
	const [jobs, setJobs] = useRecoilState(jobsState)
	const [page, setPage] = useRecoilState(pageState)
	const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageState)
	const params = useRecoilValue(paramsState)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchJobs = async () => {
			setIsLoading(true)
			const cancelToken = axios.CancelToken.source()
			const res = await axios.get(`${CORS_URL}https://jobs.github.com/positions.json?page=${page}`, {
				params
			})
			setJobs(res.data)
			setIsLoading(false)
			return cancelToken.cancel()
		}

		fetchJobs()
	}, [params, page, setJobs])

	useEffect(() => {
		const hasNextPage = async () => {
			const cancelToken = axios.CancelToken.source()
			const res = await axios.get(`${CORS_URL}https://jobs.github.com/positions.json?page=${page + 1}`, {
				params
			})
			setHasNextPage(res.data.length > 0)
			return cancelToken.cancel()
		}

		hasNextPage()
	}, [page, params, setHasNextPage])

	return (
		<Container>
			{isLoading ? (
				<WrappedLoader color='primary.500' size='md' />
			) :
				jobs.length > 0 ? (
					<div style={{ width: '100%' }}>
						<Pagination
							aria-label='Pagination'
							page={page}
							onChange={setPage}
							pageCount={hasNextPage ? page + 1 : page}
							rangeDisplay={10}
						/>
						<WrappedTable>
							<Table.Thead>
								<Table.Tr>
									<Table.Th width={100}>Title</Table.Th>
									<Table.Th width={50}>Type</Table.Th>
									<Table.Th width={50}>Company</Table.Th>
									<Table.Th width={50}>Location</Table.Th>
									<Table.Th width={50} textAlign='center'>
										Action
                </Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{jobs.map(job => (
									<Table.Tr key={job.id}>
										<Table.Td>{job.title}</Table.Td>
										<Table.Td>{job.type}</Table.Td>
										<Table.Td>{job.company}</Table.Td>
										<Table.Td>{job.location}</Table.Td>
										<Table.Td textAlign='center'>
											<Button shape='circle' size='sm' variant='secondary'>
												<EyeIcon size='sm' />
											</Button>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</WrappedTable>
						<Pagination
							aria-label='Pagination'
							page={page}
							onChange={setPage}
							pageCount={hasNextPage ? page + 1 : page}
							rangeDisplay={50}
						/>
					</div>
				) : (
						<h1>No Results</h1>
					)}


		</Container>
	)
}

const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 width:80vw;
`

const WrappedTable = styled(Table)`
width: 100%;
table-layout: fixed;
`

const WrappedLoader = styled(Loader)`
margin-top: 5rem;
`

export default JobList
