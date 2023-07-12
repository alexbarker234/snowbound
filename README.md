# Snowbound
## About
Simple clicker game

## Why the structure?
This project is deployed on my GitHub Pages website via submodules. 
- Jekyll ignores pages starting with underscores
- Webpack compiles to outside the _source 
- I don't want to upload the packed webpack code seperately - there is a custom GitHub action to run npm build during deployment at [alexbarker234.github.io](https://github.com/alexbarker234/alexbarker234.github.io)

There may be a better way to do this, but this is what I have right now :)