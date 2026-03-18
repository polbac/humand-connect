export const config = {
  apiKey: process.env.API_KEY || '',
  redashApiKey: process.env.REDASH_API_KEY || '',
  baseUrl: process.env.HUMAND_API_BASE_URL || 'https://api.dev.humand.co/public/api/v1',
};

if (!config.apiKey) {
  console.error('API_KEY environment variable is required');
  process.exit(1);
}
