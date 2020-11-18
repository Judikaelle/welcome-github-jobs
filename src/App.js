import styled, { createGlobalStyle } from 'styled-components'
import JobList from './components/job-list'
import theme from './theme'
import JobSearch from './components/job-search'

// Welcome UI
import { WuiProvider } from '@welcome-ui/core'
import { Text } from '@welcome-ui/text'

const App = () => {
  return (
    <WuiProvider
      theme={theme}
      hasGlobalStyle
      useReset
      reactRootId='__next'
    >
      <CustomGlobalStyle />
      <Container>
        <WrappedText variant='h1'>Github Jobs</WrappedText>
        <JobSearch />
        <JobList />
      </Container>
    </WuiProvider>
  )
}

const CustomGlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    background: #eee;
    margin: 0;
  }
`

const Container = styled.div`
display: grid;
place-items: center;
padding: 10rem;
`
const WrappedText = styled(Text)`
margin-bottom: 3rem;
`

export default App
