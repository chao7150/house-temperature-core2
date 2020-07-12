# house-temperature-core2

## develop

### run

```bash
yarn
yarn debug
```

### test request

```
# post
curl -X POST -d 'time=11:45&temperature=25.5&humidity=51.2&pressure=1145.14&password=chao' localhost:3000/api/temperature/2000/05/17

# get
curl localhost:3000/api/temperature/2000/05/17
```

## docker

```bash
sudo docker-compose -f docker-compose.local.yml up --build
```