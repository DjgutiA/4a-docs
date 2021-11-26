# 4a-docs

Web app to rent cars.

Microservices architecture based app, built using 3 main languages. This app implements an APIRest Model.

First and second microservices are built in python using Django Rest Framework. First one is used to control
the accounts and authentication. The second one is used to manage the car-relationed funcionalities, such as create, update,
read and delete.

The third microservice is built in Java using Spring boot. It is used to control the booking system.

The API gateway controls every request. This component is built using Apollo GraphQL.

Frontend layer is built in vue.js to make the requests to the API gateway.
----------------------------------------------------------------------------------------------------------------------
Each microservice is packaged on a Docker container. 
Every container is finally deployed to heroku.

To get a visual example of the architecture, refer to the 'Diagrama de arquitectura' image on master branch.
