import 'dotenv/config'
import { Camunda8 } from '@camunda8/sdk'


const c8 = new Camunda8()
const zeebe = c8.getZeebeGrpcApiClient();

console.log("Starting worker...");
zeebe.createWorker({
  taskType: "worker-jsonify",
  taskHandler: (job) => {
    console.log(`[Zeebe Worker] handling job of type ${job.type}`);
      const responseAi = job.variables.responseAi;
      const responseObject = JSON.parse(responseAi);
    console.log(responseObject)
      return job.complete({
      serviceTaskOutcome: responseObject,
    });
  },
});