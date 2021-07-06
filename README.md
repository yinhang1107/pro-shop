# Pro-Shop

> A simple e-commerce website built with MERN stack & Redux

> Live demo [_here_](https://pro-shop.netlify.app).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Technologies Used

- React
- Redux
- Bootstrap
- Node.js
- Express
- MongoDB

## Features

### - Product pagination, search feature, reviews and rating
![Main-page](https://i.im.ge/2021/07/06/FX86X.png)

### - Fully featured shopping cart
![Cart](https://i.im.ge/2021/07/06/FXRK8.png)

### - Checkout process, PayPal/credit card integration
![Order details](https://i.im.ge/2021/07/06/FXZlh.png)

### - User signing in as admin is allowed to manage the products, users and orders by editing their data. 
![Management](https://i.im.ge/2021/07/06/FXK0M.png)

## Setup

1. Open 2 separate terminals
2. In terminal 1,
```
git clone https://github.com/yinhang1107/pro-shop.git
cd pro-shop/frontend
npm i
```
3. In terminal 2,
```
cd pro-shop
npm i
cd backend
npm run data:import
cd..
```
4. Open the project via VS code and navigate to /pro-shop/.env enter your MONGO_URI, jwtPrivateKey and PAYPAL_CLIENT_ID.
5. Steps of getting the PAYPAL_CLIENT_ID - click [here](https://developer.paypal.com/docs/api/overview/#get-credentials).
6. On terminal 2, run - npm run dev.

## Acknowledgements
- This project was based on [Brad Traversy - MERN eCommerece From Scratch](https://www.udemy.com/course/mern-ecommerce/).

## Contact

Created by [@yinhang](https://yinhang.netlify.app/) - feel free to contact me!
