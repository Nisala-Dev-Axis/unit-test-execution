import axios from "axios";
import { timeout } from "../../utils";
import { IDbWorkRecord, Sprint, SprintState } from "./types/interface";

const JIRA_URL = "https://axis-tech.atlassian.net";
const JIRA_BASE_URL = `${JIRA_URL}/rest/api/3`;
const JIRA_EMAIL = "nisala@axis-tech.co";
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

export const getWorkRecord = async (
  workerId: string,
  dateString: string
): Promise<IDbWorkRecord> => {
  await timeout(1000);

  return {
    workerId,
    dateString,
    workHours: 40,
  };
};

const getAuthHeader = () =>
  Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");

export const createTicket = async () => {
  const url = `${JIRA_BASE_URL}/issue`;
  const authHeader = getAuthHeader();

  const payload = {
    fields: {
      project: {
        key: "MEET",
      },
      summary: "Test ticket - Nisala",
      description: {
        content: [
          {
            content: [
              {
                text: "This is a test ticket created by nisala to test jira API",
                type: "text"
              }
            ],
            type: "paragraph"
          }
        ],
        type: "doc",
        version: 1
      },
      issuetype: {
        name: "Task", // Or 'Bug', 'Story', etc., depending on your Jira setup
      },
    },
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Ticket created successfully:", response.data);
    return response.data as { key?: string, id?: string };
  } catch (error: any) {
    console.error("Error creating Jira ticket:", error.message);
    throw error;
  }
};

export const listProjects = async () => {
  const url = `${JIRA_BASE_URL}/project`;
  const authHeader = getAuthHeader();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Ticket created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating Jira ticket:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getASingleProject = async (projectKey: string) => {
  const url = `${JIRA_BASE_URL}/project/${projectKey}`;
  const authHeader = getAuthHeader();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Ticket created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating Jira ticket:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addToActiveSprint = async (sprintId: number, issueKey: string) => {
  const url = `${JIRA_URL}/rest/agile/1.0/sprint/${sprintId}/issue`;
  const authHeader = getAuthHeader();

  const payload = {
    issues: [issueKey],
  };

  try {
    await axios.post(url, payload, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Ticket ${issueKey} successfully added to sprint ${sprintId}`);
  } catch (error: any) {
    console.error("Error adding ticket to sprint:", error.message);
    throw error;
  }
};

const getSprints = async (boardId?: number) => {
  const url = `${JIRA_URL}/rest/agile/1.0/board/${boardId}/sprint?state=active,future`;
  const authHeader = getAuthHeader();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    });

    // Log the list of boards
    console.log("Boards:", response.data);
    return response.data.values as Sprint[]; // Returns an array of boards
  } catch (error: any) {
    console.error(
      "Error fetching boards:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createAndAddTicketToCurrentSprint = async () => {
    const sprints = await getSprints(30);
    const currentSprint = sprints.find((sprint) => sprint.state === SprintState.ACTIVE) ?? sprints[0];

    const ticket = await createTicket();
    if (!ticket.key) {
        console.log("Missing ticket key");
        return;
    }

    addToActiveSprint(currentSprint.id, ticket.key);
};
