import React from "react"
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import EmployeeInput from "./EmployeeInput"

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: red;
  margin-bottom: 24px;
`

const TeamCard = (props) => {
  const { teamName, teamMembers, handleTextChange } = props

  const handleFieldChange = (id, inputField, e) => {
    handleTextChange(teamName, id, inputField, e.target.value)
  }
  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom>
        {teamName}
      </Typography>
      {teamMembers.map((member) => {
        return (
          <EmployeeInput
            key={member.id}
            member={member}
            handleFieldChange={handleFieldChange}
          />
        )
      })}
    </StyledPaper>
  )

}

export default TeamCard