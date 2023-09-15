// import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CdkQueueDdConstructProps } from "./props";
import { LinuxBuildImage } from "aws-cdk-lib/aws-codebuild";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkQueueDdConstruct extends Construct {
	private readonly _codeBuildStep: CodeBuildStep;

	constructor(scope: Construct, id: string, props: CdkQueueDdConstructProps) {
		super(scope, id);

		this._codeBuildStep = new CodeBuildStep("AddDatadogSqsMonitor", {
			commands: this.buildCommands(props),
			buildEnvironment: { buildImage: LinuxBuildImage.STANDARD_7_0 },
		});
	}

	public get monitorStep(): CodeBuildStep {
		return this._codeBuildStep;
	}

	private buildCommands(props: CdkQueueDdConstructProps): string[] {
		const installDeps = `npm install -g datadog-sqs-depth-monitor`;
		const command = `datadog-sqs-depth-monitor -q ${props.queueName} -r "${props.readableQueueName}" -s "${props.slackChannel}"`;
		return [
			"echo DEPLOYING the Datadog SQS Monitor",
			`${installDeps}`,
			`${command}`,
		];
	}
}
