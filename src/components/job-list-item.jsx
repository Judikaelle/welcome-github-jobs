import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

// Welcome UI
import { Text } from '@welcome-ui/text'
import { Badge } from '@welcome-ui/badge'

const JobListItem = ({ job }) => {
	const { type, location, created_at, description, company, company_logo } = job

	return (
		<Content>
			<WrappedCompany>
				<Text variant="h3">{company}</Text>
				<img src={company_logo} alt={company} width={150} />
			</WrappedCompany>
			<WrappedDate>{new Date(created_at).toLocaleDateString()}</WrappedDate>
			<BadgeContainer>
				<WrappedBadge variant="info">{type}</WrappedBadge>
				<WrappedBadge variant="info">{location}</WrappedBadge>
			</BadgeContainer>
			<WrappedMarkdown children={description} />
		</Content>
	)
}

const Content = styled.div`
	display: flex;
	flex-direction: column;
`

const WrappedDate = styled.p`
	font-size: 16px;
	color: #ccc;
	font-weight: lighter;
`

const WrappedCompany = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 1rem 0;
`

const BadgeContainer = styled.div`
	display: flex;
	gap: .2rem;
`

const WrappedBadge = styled(Badge)`
	padding: .5rem;
	margin-top: .5rem;
`

const WrappedMarkdown = styled(ReactMarkdown)`
	margin: 2rem 0;
`

export default JobListItem
