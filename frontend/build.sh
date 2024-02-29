docker login --username bazaaer --password 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 ghcr.io
docker build . -t ghcr.io/bazaaer/filtrr-frontend:latest
docker push ghcr.io/bazaaer/filtrr-frontend:latest