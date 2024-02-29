docker login --username bazaaer --password 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 ghcr.io
docker build . -t ghcr.io/bazaaer/filtrr-frontend:latest
docker push ghcr.io/bazaaer/filtrr-frontend:latest