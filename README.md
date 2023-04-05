# Telephone search
A simple REST API for a search of telephone using Express.

## Requirements
- Node 16 or above (Download: [link](https://nodejs.org/en/download))

## Running the server

To run the server directy using NodeJS:
Clone the git directory and navigate to this directory.

```
git clone git@github.com:badaldesai/oxio-backend-challenge.git
cd oxio-backend-challenge
npm install
npm start
```

To run the dockerize app, there is additional requirement of installing docker in the machine. Once the docker is install, from the directory of the project execute following:

```
docker build -t  .
docker run -d -p 8080:8080 --name search search
```

## To run the test and lint

To run the test:

```
npm test
```

To run the lint:

```
npm run lint
```

## Test the endpoint
Once the server is started, you can use postman or curl from the commandline to test it. There is only one endpoint for the app:

### GET /v1/phone-numbers
It needs following query parameter: 

- phoneNumber - phone number wanted to result for (required)

Use curl method to get the specific settingId with the following command:
```
curl -i -X GET http://localhost:8080/v1/phone-numbers?phoneNumber=%2B12125690123
```

## Deployment
There are various ways to deploy this server. Can be deployed to AWS lambda functions, as standalone server with elasticbeanstalk to manage it. We can use Terraform to create those resources.