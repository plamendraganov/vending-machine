# Vending Machine App

A simple Angular-based vending machine simulation that allows users to insert coins, purchase drinks, and view/administer inventory.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

---

## 🚀 Features

- 👥 **Role-Based Access**:

  | Role  | Username | Password | Access                                  |
  | ----- | -------- | -------- | --------------------------------------- |
  | Admin | admin    | admin    | Full access to Admin Panel and features |
  | User  | user     | user     | Can view and purchase products only     |

- 🛒 **User Panel**: Insert coins and purchase available products.
  The product price is in EURO and the accepted coin denominations are 1, 2, 5, 10, 20 and 50 cent, €1 and €2.
  The vending machine return changes and the user can also reset the inserted amount of money and receive it back without purchasing.
- 🔧 **Admin Panel**: Add, update, or delete products and can also insert coins and purchase available products

- 📦 **Backend**: Powered by `json-server` to simulate a RESTful API

- ✅ **Unit Tests**: Includes Karma-based unit testing for services and components

- 🎯 **Responsive UI** built with Angular Material and responsive flexbox

---

## 🖥️ Getting Started

## ✅ Prerequisites

Before running this project, make sure you have the following installed:

| Tool        | Version | Installation Link                                 |
|-------------|---------|---------------------------------------------------|
| Node.js     | >= 18.x | https://nodejs.org/en/download                    |
| Angular CLI | >= 17.x | https://www.npmjs.com/package/@angular/cli        |

To install Angular CLI globally, run:

```bash
npm install -g @angular/cli

### 1. 🛠️ 1. Clone the Repository

```bash
git clone https://github.com/plamendraganov/vending-machine.git
cd vending

```

### 2. 📦 Install Dependencies

```bash install node modules by running the command
npm install

```

### 3. 🗃️ Start the Mock JSON Server (for Product Data)

```bash install json server globally
npm install -g json-server

```

```bash run the mock API server
json-server --watch db.json --port 3000

```

### 4. 🚀 Start the Angular Development Server

```bash start the Angular development server
ng serve

```

### 5. 🌐 Open the App in Your Browser

```open your browser and navigate to:
http://localhost:4200

```

### 6. 🔐 Login Instructions

```After you are presented with the login screen, you can access the application by typing the provided username and password (see them in the beginning of the README). For example:
Username: admin
Password: admin

```

### 7. (OPTIONAL) 🧪 Running Unit Tests

```bash To execute unit tests (currently 36 unit tests are added) with the Karma test runner, use:
ng test

```

## 📂 Additional Information

- 🖼️ **Sample Product Images**:  
  For your convenience, you can find a collection of ready-to-use product images in the `public/assets/products` folder.  
  These images can be used by the admin when creating or updating products in the Admin Panel.

- ✍️ **How to Use**:
  When adding a new product, you need to add a product name, available quantity of the product (maximum 15 items of one product can be placed in the vending machine) and the price of the product. The product name, quantity and price fields are required. The price cannot be less than 0.01 cent and the quantity number cannot be negative. Field validation is added to guide you when adding product information. The product image is optional and can be ommited. In that case the application will insert a default product image informing the user that the product image is not available.

When using the vending machine, the user can buy a product after inserting the needed amount of money. If the amount of money inserted into the machine is not enough, the 'Buy' button is disabled for the certain products. The vending machine returns change if the inserted amount of money is bigger than the price of the purchased product. The user can also return his/her inserted amount of money without purchasing by clicking on the 'Reset' button.

The 'Manage' button is visible only for users logged as admin and it navigates to the admin panel where the administartor can add, update or delete products.
