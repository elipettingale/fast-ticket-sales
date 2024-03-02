# Fast Ticket Sales

A very light-weight and simple ticket sales platform, designed and built as a low cost solution for a specific event where the client's main website would crash due to the drastic increase in traffic.

This is a live project but all references to the client have been removed to create an anonymous portfolio piece.

## The Purpose

The client has a bespoke ticket sales system on their main website which they are happy with. However, every year they have one particular event that is drastically more popular than every other event to the point that the traffic would take down the website.

They did not wish to pay the costs associated with changing their hosting (which was only scalable to a certain point). So instead this system was built as a standalone app that could handle the increased traffic but could still run on their current hosting.

A number of simulations and tests using bots were run to stress both systems. The main website was able to handle 300 concurrent bots before crashing. This new lightweight system was able to handle 5000 concurrent bots.

## The Structure

The application consists of:

- React Frontend App (Client)
- Express.js API (Server)
- MongoDB (Database)

## Local Setup

1. Update .envs (see .env.example in client and server), make sure to add Stripe keys if you want the payment gateway to work.
2. The entire application is dockerised, just run `docker compose up`
3. Seed the database, import members.json and events.json into mongodb
