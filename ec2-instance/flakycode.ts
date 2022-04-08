declare const postAuthFn: lambda.Function;

const userpool = new cognito.UserPool(this, 'myuserpool', {
  lambdaTriggers: {
    postAuthentication: postAuthFn,
  },
});

// provide permissions to describe the user pool scoped to the ARN the user pool
postAuthFn.role?.attachInlinePolicy(new iam.Policy(this, 'userpool-policy', {
  statements: [new iam.PolicyStatement({
    actions: ['*'],
    resources: [userpool.userPoolArn],
  })],
}));