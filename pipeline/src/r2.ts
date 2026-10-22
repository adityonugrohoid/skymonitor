// Cloudflare R2 through its S3-compatible API. Credentials come from the
// environment (GitHub Actions secrets in CI, a local .env in development).

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

const REQUIRED = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"] as const;

export function r2ConfigFromEnv(env: NodeJS.ProcessEnv): R2Config {
  for (const name of REQUIRED) {
    if (!env[name]) {
      throw new Error(`${name} is not set`);
    }
  }
  return {
    accountId: env.R2_ACCOUNT_ID as string,
    accessKeyId: env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY as string,
    bucket: env.R2_BUCKET as string,
  };
}

export function r2Client(cfg: R2Config): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  });
}

export async function putJson(
  client: S3Client,
  bucket: string,
  key: string,
  body: unknown,
  cacheControl: string,
): Promise<void> {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(body),
      ContentType: "application/json",
      CacheControl: cacheControl,
    }),
  );
}
