docker login --username bazaaer --password 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 ghcr.io
docker build . -t ghcr.io/bazaaer/filtrr-frontend:latest
docker push ghcr.io/bazaaer/filtrr-frontend:latest