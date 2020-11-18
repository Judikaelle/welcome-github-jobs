import { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { jobsState, paramsState } from '../atoms/jobs'

// Welcome UI
import { Table } from '@welcome-ui/table'
import { Button } from '@welcome-ui/button'
import { EyeIcon } from '@welcome-ui/icons.eye'

const JobList = () => {
  const [jobs, setJobs] = useRecoilState(jobsState)
  const params = useRecoilValue(paramsState)

  useEffect(() => {
    axios.get('https://jobs.github.com/positions.json', {
      params: { ...params }
    })
      .then(res => {
        return res.data
      })
      .then(job => setJobs(job))
      .catch(err => {
        console.log(err)
      })
  }, [params, setJobs])

  return (
    <Container>
      <WrappedTable>
        <Table.Thead>
          <Table.Tr>
            <Table.Th width={100}>Title</Table.Th>
            <Table.Th width={50}>Company</Table.Th>
            <Table.Th width={50}>Location</Table.Th>
            <Table.Th width={50} textAlign='center'>
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {jobs && (
            jobs.map(job => (
              <Table.Tr key={job.id}>
                <Table.Td>{job.title}</Table.Td>
                <Table.Td>{job.company}</Table.Td>
                <Table.Td>{job.location}</Table.Td>
                <Table.Td textAlign='center'>
                  <Button shape='circle' size='sm' variant='secondary'>
                    <EyeIcon size='sm' />
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </WrappedTable>
    </Container>
  )
}

const Container = styled.div`
 width:80vw;
`

const WrappedTable = styled(Table)`
width: 100%;
table-layout: fixed;
`

export default JobList
