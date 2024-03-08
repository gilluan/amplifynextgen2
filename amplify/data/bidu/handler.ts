import type { AppSyncResolverHandler } from "aws-lambda"; // types imported from @types/aws-lambda

type ResolveArgs = { text: string };

type ResolverResult = { text: string; bidu: string };

export const handler: AppSyncResolverHandler<
  ResolveArgs,
  ResolverResult
> = async (event, context) => {
  return {
    text: "hello working bidu",
    bidu: "it is time",
  };
};
