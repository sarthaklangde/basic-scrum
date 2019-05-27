import React from "react"
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

const EmployeeInput = (props) => {
  const { member, handleFieldChange } = props
  return (
    <React.Fragment>
      <Typography>
        {member.displayName}
      </Typography>
      <TextField
        id={`${member.id}_yesterday`}
        label="Yesterday"
        margin="normal"
        //onChange={(e) => handleFieldChange(member.id, "yesterday", e)}
        fullWidth
      />
      <TextField
        id={`${member.id}_today`}
        label="Today"
        margin="normal"
        //onChange={(e) => handleFieldChange(member.id, "today", e)}
        fullWidth
      />
    </React.Fragment>
  )

}

export default EmployeeInput
