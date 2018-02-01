# sizing-analysis

## Reproducing Sizing Analysis Demo With Back-up Data

1. Deploy a cluster with analyzer, analyzer-ui and mongo
- `./deploy-gcp.sh <username>`

2. Restore the sizing analysis result data backup from GCP cloud storage
- `gsutil -m cp -r gs://hyperpilot-sizing-demo-backup/dump .`
- `mongorestore -h <mongo-serve-host> dump`

3. Reach the analysis-ui from your browser
- In the first page, you have to at least select MySQL as your analysis target
