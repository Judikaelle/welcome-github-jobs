import styled from 'styled-components'
import { paramsState } from '../atoms/jobs'
import { useRecoilState } from 'recoil'

// Welcome UI
import { InputText } from '@welcome-ui/input-text'
import { Label } from '@welcome-ui/label'
import { Checkbox } from '@welcome-ui/checkbox'

const JobSearch = () => {
  const [params, setParams] = useRecoilState(paramsState)

  function handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    setParams(prevParams => {
      return { ...prevParams, [name]: value }
    })
    console.log(params.full_time)
  }

  return (
    <div>
      <Form light>
        <Label>Full-time</Label>
        <Checkbox component={Checkbox} checked={params.full_time} name='full_time' label='Full-time' onChange={handleChange} />
        <WrappedInput
          component={InputText}
          isClearable
          label='Description'
          name='description'
          placeholder='Search for a job...'
          onChange={handleChange}
        />
        <WrappedInput
          component={InputText}
          isClearable
          label='Location'
          name='location'
          placeholder='Dream Location ?'
          onChange={handleChange}
        />
      </Form>
    </div>
  )
}

const Form = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: .5rem;
width: 100%;
`

const WrappedInput = styled(InputText)`
margin: 1rem 2rem;
border-radius: .3rem;
border: 1px solid #111;
`

export default JobSearch
