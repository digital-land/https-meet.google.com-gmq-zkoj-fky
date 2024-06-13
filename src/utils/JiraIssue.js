/*
    This is a class that represents a ticket in jira, it should make use of the jira api to get the ticket information
    It can also be manually populated, and used to create a ticket in jira
*/

const axios = require('axios')
const { JIRA_API_URL, JIRA_API_USER, JIRA_API_TOKEN } = process.env

export class JiraIssue {
  constructor (issue) {
    this.issue = issue
  }

  static async getFromJira (issueKey) {
    const issue = await this.makeGetRequest(issueKey)
    return new JiraIssue(issue)
  }

  async makeGetRequest (issueKey) {
    try {
      const response = await axios.get(
              `${JIRA_API_URL}/rest/api/3/issue/${issueKey}`,
              {
                auth: {
                  username: JIRA_API_USER,
                  password: JIRA_API_TOKEN
                },
                headers: {
                  Accept: 'application/json'
                }
              }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching issue:', error.response ? error.response.data : error.message)
    }
  }

  async saveToJira () {
    if (this.issue.id) {
      return this.updateJira(this.issue.key)
    } else {
      return this.createNewTicket()
    }
  }

  async createNewTicket () {
    try {
      const response = await axios.post(
              `${JIRA_API_URL}/rest/api/3/issue`,
              {
                fields: {
                  project: {
                    key: 'TEST'
                  },
                  summary: 'Test issue',
                  description: 'Creating of an issue using project keys and issue type names using the REST API',
                  issuetype: {
                    name: 'Task'
                  }
                }
              },
              {
                auth: {
                  username: JIRA_API_USER,
                  password: JIRA_API_TOKEN
                },
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
      )

      return response.data
    } catch (error) {
      console.error('Error creating issue:', error.response ? error.response.data : error.message)
    }
  }

  async updateJira (issueKey) {
    try {
      const response = await axios.put(
              `${JIRA_API_URL}/rest/api/3/issue/${issueKey}`,
              {
                fields: this.issue.fields
              },
              {
                auth: {
                  username: JIRA_API_USER,
                  password: JIRA_API_TOKEN
                },
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
      )

      return response.data
    } catch (error) {
      console.error('Error updating issue:', error.response ? error.response.data : error.message)
    }
  }
}
