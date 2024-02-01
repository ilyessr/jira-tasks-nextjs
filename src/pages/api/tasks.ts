import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await axios.get(
        `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/3/search?jql=assignee=currentUser()`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches Jira : ", error);
      res.status(500).send("Erreur interne du serveur");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
