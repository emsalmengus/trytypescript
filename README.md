# trytypescript

This is a playwright automation project using typescript for the website saucedemo.com.

# How to setup
Prerequisites are nodeJS, playwright and and editor e.g. VSCode
1. First, clone the repository and initialise the playwright project 
### npm init playwright@latest"
2. Type in the required information and get the tests running over the commandline via
### npx playwright test --reporter=html

# How to generate HTML report

to create an HTML report after the test run:
### npx playwright show-report

# Testcases
These are the testcases identified in order to test the website saucedemo.com

## login.spec.ts
### Login with standard_user
### No login with locked out user
### No login with wrong credentials
### No login with empty credentials (both)
#### Empty username
#### Empty password
### Login with problem_user
### Login with performance_glitch_user
### Login with error_user
### Login with visual_user

## inventory.spec.ts
### Inventory can be sorted with standard_user
### Inventory cannot be sorted with problem_user
### Open inventory item
### back to products

## inventory-item.spec.ts
### open item details
### back to products

## cart.spec.ts 
### open cart
### Add to cart
### Remove from cart
### continue shopping
### checkout

## menu.spec.ts
### all items
### about
### logout
### reset
### close menu

## checkout.spec.ts
### complete checkout and return to home
### incomplete checkout 
### cancel checkout

## footer.spec.ts
### footer twitter
### footer facebook
### footer linkedin

