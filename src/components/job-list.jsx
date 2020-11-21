import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { jobsState, paramsState, pageState, hasNextPageState } from '../atoms/jobs'
import JobListItem from './job-list-item'

// Welcome UI
import { Table } from '@welcome-ui/table'
import { Button } from '@welcome-ui/button'
import { EyeIcon } from '@welcome-ui/icons.eye'
import { Loader } from '@welcome-ui/loader'
import { Pagination } from '@welcome-ui/pagination'
import { Modal, useModalState } from '@welcome-ui/modal'

// CORS
const CORS_URL = 'https://cors-anywhere.herokuapp.com/'

const JobList = () => {
	const [jobs, setJobs] = useRecoilState(jobsState)
	const [selectedJob, setSelectedJob] = useState({})
	const [page, setPage] = useRecoilState(pageState)
	const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageState)
	const params = useRecoilValue(paramsState)
	const [isLoading, setIsLoading] = useState(true)
	const modal = useModalState()

	useEffect(() => {
		const fetchJobs = async () => {
			setIsLoading(true)
			const cancelToken = axios.CancelToken.source()
			const res = await axios.get(`${CORS_URL}https://jobs.github.com/positions.json?page=${page}&markdown=true`, {
				params,
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
						{(hasNextPage && page === 1) ? (
							<Pagination
								aria-label='Pagination'
								page={page}
								onChange={setPage}
								pageCount={hasNextPage ? page + 1 : page}
								rangeDisplay={50}
							/>

						) : (
								<div></div>
							)}
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
											<Modal.Trigger as={Button}{...modal} onClick={() => setSelectedJob(job)}>
												<EyeIcon size='md' />
											</Modal.Trigger>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</WrappedTable>
						{(hasNextPage && page === 1) ? (
							<Pagination
								aria-label='Pagination'
								page={page}
								onChange={setPage}
								pageCount={hasNextPage ? page + 1 : page}
								rangeDisplay={50}
							/>

						) : (
								<div></div>
							)}
					</div>
				) : (
						<h1>No Results</h1>
					)
			}
			<Modal {...modal} ariaLabel="example">
				<Modal.Title>
					{selectedJob.title}
				</Modal.Title>
				<Modal.Content>
					<JobListItem job={selectedJob} />
				</Modal.Content>
			</Modal>
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
