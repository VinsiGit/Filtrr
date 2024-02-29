docker login --username bazaaer --password [your_token] ghcr.io
docker build . -t ghcr.io/bazaaer/filtrr-frontend:latest
docker push ghcr.io/bazaaer/filtrr-frontend:latest