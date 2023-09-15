// import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CdkQueueDdConstructProps } from "./props";
import {
	BuildEnvironmentVariableType,
	LinuxBuildImage,
} from "aws-cdk-lib/aws-codebuild";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkQueueDdConstruct extends Construct {
	private readonly _codeBuildStep: CodeBuildStep;

	constructor(scope: Construct, id: string, props: CdkQueueDdConstructProps) {
		super(scope, id);

		this._codeBuildStep = new CodeBuildStep("AddDatadogSqsMonitor", {
			commands: this.buildCommands(props),
			buildEnvironment: {
				buildImage: LinuxBuildImage.STANDARD_7_0,
				environmentVariables: {
					DD_API_KEY: {
						value: props.datadogApiKeySecret,
						type: BuildEnvironmentVariableType.SECRETS_MANAGER,
					},
					DD_APP_KEY: {
						value: props.datadogAppKeySecret,
						type: BuildEnvironmentVariableType.SECRETS_MANAGER,
					},
				},
			},
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
function BuildEnvironmentVariable(
	arg0: any,
	arg1: string,
): import("aws-cdk-lib/aws-codebuild").BuildEnvironmentVariable {
	throw new Error("Function not implemented.");
}
