# CDK Queue Datadog Monitor Construct

AWS CodeBuild Step that can be added into a CodePipline workflow which will build a DataDog Monitor

## Installation

```bash
npm i cdk-queue-dd-construct"
```

## Usage

Use this Construct as a CodeBuildStep in a CodePipeline

```typescript
let stageDeployment = pipeline.addStage(stage);
const queueConstruct = new CdkQueueDdConstruct(this, `QueueStage`, {
	queueName: "alarm-queue-name",
	readableQueueName: "Sample Alarm Queue",
	slackChannel: "@slack-operational-issues",
});
stageDeployment.addPost(queueConstruct.monitorStep);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
