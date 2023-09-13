// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkQueueDdConstructProps {
  // Define construct properties here
}

export class CdkQueueDdConstruct extends Construct {

  constructor(scope: Construct, id: string, props: CdkQueueDdConstructProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueueDdConstructQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
