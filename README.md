# Degrees of Node

**Degrees of separation on various Node projects**

## Inspiration

The ways in which individuals and things are connected are closer than one can imagine. If two complete strangers were to encounter each other in any setting, it is extremely probable that they are connected to one another by a separation of less than six social connections. This is the intriguing idea known as [six degrees of separation](https://en.wikipedia.org/wiki/Six_degrees_of_separation). To put this in simpler terms, a chain of "a friend of a friend" statements can be made to connect _any_ two individuals in a maximum of six steps.

Our thought was this: why don't we develop an algorithm that determines how close any two Node packages are, with the computing power available from the DCP? Our web application does just that. 

## What it does

Our project analyzes a collection of the 100 most depended upon Node packages from their Github repositories. It bases separation on developers that have contributed to multiple Node packages. Our frontend allows a user to view the minimum degrees of separation between any of these repositories.

## How we built it

HTML, CSS, JS, and Python are the primary technologies through which we built the application. Our application collects repository data from GitHub and derives the shortest path — that is, the minimum degrees of separation — between any two repositories.

It does this by creating a dataset of each contributor, identified by their email, and stores what projects they work on. Then, a graph is created that represents edges between Node packages, as long as there is at least one mutual developer between the two. We run an exhaustive breadth-first search on this graph to determine the shortest path to every other repo, which represents the degrees of separation.

We distribute the breadth-first search of each Node project to DCP as its own slice. Our algorithm currently runs in O(n^2) time, however this could be optimized. DCP is an ideal technology for this project however, as if we were doing our search on the full NPM repository, there would be over 1 million unique jobs.

## The implications for this application

With further work, we could pull more important data from what we have. This could be useful in seeing what languages and frameworks have open-source developers contributing to a diverse range of projects. Further, "health" metrics of unmaintained repos could be collected to see what parts of an ecosystem need improvement. There are many different ways to graph the data we collected, however we did not have time to implement them.

## What we learned

- How to make a web application from with a developed front and back-end (three of our members have limited experience in web development)
- Workloads that are ideally distributed over a distributed protocol

### Prerequisites
node and npm installed 


### Getting started

```bash
cd /express
node express.js

```
