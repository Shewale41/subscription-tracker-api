import {Client as WorkflowClient } from "@upstash/workflow";

import {QSTASH_URL,QSTASH_TOKEN} from "./env.js";

export const workflowClient = new WorkflowClientk({
    baseUrl:QSTASH_TOKEN,
    token:QSTASH_TOKEN,
});