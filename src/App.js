import React, { Component } from "react"
import styled from "styled-components"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import GlobalStyle from "./GlobalStyle"
import employeeList from "./employeeList"
import TeamCard from "./TeamCard"
import qs from "query-string"

//TODO: ADD slack bot token here
const authToken = "YOUR_SLACK_BOT_TOKEN"

const Wrapper = styled.div`
  margin: 24px auto 0;
  width: 1000px;
`

const currentDate = new Date()

const date = currentDate.getDate()
const month = currentDate.getMonth() + 1
const year = currentDate.getFullYear()

class App extends Component {
  constructor(props) {
    super(props)

    const stateObject = {}

    Object.keys(employeeList).forEach(teamName => {
      const employeeObject = {}
      employeeList[teamName].forEach(member => {
        employeeObject[member.id] = {
          yesterday: "",
          today: "",
        }
      })
      stateObject[teamName] = employeeObject
    })

    this.state = stateObject
  }

  handleTextChange = (teamName, id, inputField, text) => {
    const currenTeamState = this.state[teamName]
    this.setState({
      [teamName]: {
        ...currenTeamState,
        [id]: {
          ...currenTeamState[id],
          [inputField]: text,
        }
      }
    })
  }

  handleFormSubmit = () => {
    let messageString = ""
    Object.keys(employeeList).forEach((team) => {
      const teamMembers = employeeList[team]
      messageString = messageString + `=============${team}=============\n\n`
      teamMembers.forEach((member) => {
        const textYesterday = document.getElementById(`${member.id}_yesterday`).value
        const textToday = document.getElementById(`${member.id}_today`).value
        if (textYesterday || textToday) {
          messageString = messageString + `${member.displayName}\n`
          messageString = messageString + `Y: ${textYesterday || "(blank)"}\n`
          messageString = messageString + `T: ${textToday || "(blank)"}\n\n`
        }
      })
    })

    axios.post("https://slack.com/api/files.upload",
      qs.stringify({
        token: authToken,
        channels: "#scrum",
        content: messageString,
        title: `Scrum - ${date}/${month}/${year}`
      }),
      {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    console.log(messageString)
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <Typography component="h1" variant="h4" gutterBottom>
            Scrum - {date}/{month}/{year}
          </Typography>
        <Grid spacing={24}>
          {Object.keys(employeeList).map((team) => {
            return (
              <TeamCard
                key={team}
                teamName={team}
                teamMembers={employeeList[team]}
                handleTextChange={this.handleTextChange}
              />
            )
          })}
          <Button onClick={this.handleFormSubmit} variant="contained" color="primary" size="large">
            Post scrum
          </Button>
        </Grid>

      </Wrapper>
    )
  }
}

export default App