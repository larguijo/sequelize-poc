# sequelize-poc
POC project to test Sequelize basic functionality.

## About DB configuration
It's important that you have an installed Postgres instance to run this project (Instructions to do that are not in this README file).<br>
After you set it up, you must change the connection information in /config/dev.js<br>
Note that sequelize is being configured to sync up with the DB, so YOU DON'T HAVE TO CREATE YOUR TABLES YOUR OWN.

## Steps to install project.
After cloning the repo, go to the root folder and execute npm install.<br>
Then go to client folder and execute npm install.<br>

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs React App and Backend Express server with a single command using "concurrently"
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Database design
You can find the attached draw.io diagram <a href="https://drive.google.com/file/d/1B9LDw2P5IHVOSWs88rHBs1do45OBM1d7/view?usp=sharing"> here </a> <br>

## System Flow
Please follow the following steps to understand this POC.

## Welcome Page
Once the project is up and running (npm run dev) Go to http://localhost;3000 <br>
It'll show the list of available products if any. On the lower right corner, you'll see the plus (+) sign to create a new product. <br>
Notice that the information provided per each Product card, contains the product itself plus the stock by store. Which is stored in a different table.

<img src="https://drive.google.com/uc?export=view&id=1_bNfizIdHtBEVKw-pfrad4STNb65seUM">

## Click on New Product
Create a new Product. After filling up all the fields click on "Submit" and the Welcome Page will be refreshed with the new Item.
<img src="https://drive.google.com/uc?export=view&id=1aRftVByzT22xHKMnw12pQmHfO-vdKBvo">

## Updating stock by Transaction
Whenever we create a NEW PRODUCT the backend service creates stock entries per each existing store. So that you don't have to manually define that each store starts with zero stock.<br>
To modify the stock for a given product click on "Modify Stock", it will allow you to define a value per store.<br>
Note that this action, in the backend will iterate over all the existing stores to update quantity. Since those are different operation if any of them fails, the whole transaction is rolled back. To make it fail, define a NEGATIVE quantity in any for any of the Stores and you'll see the transaction failing; otherwise it'll take you back to the welcome screen and reload the data.

<img src="https://drive.google.com/uc?export=view&id=1S1wvPkIz_hDoBYT-25lhnTU3bEkWGSAT">

## Stores
This POC doesn't provide CRUD to create new stores, so you can manually create them on the DB, or you can collaborate in this project and create it yourself. :)

## Disclaimer
The aim of this POC is to test React/Node/Sequelize/Postgres integration; hence, there are a lot of things that could have been done in a more fancy way (as using Redux or structuring the project in a different manner).


