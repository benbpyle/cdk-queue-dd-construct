import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.MonitorsApi(configuration);

let params: v1.MonitorsApiGetMonitorRequest = {
  // number | The ID of the monitor
  monitorId: 131248986,
};

apiInstance
  .getMonitor(params)
  .then((data: v1.Monitor) => {
    console.log("API called successfully. Returned data: ");
    console.log(data);
  })
  .catch((error: any) => console.error(error));
