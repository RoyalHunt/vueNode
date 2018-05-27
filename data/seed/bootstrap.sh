#!/bin/bash

printf "\nImporting seed documents in a Clients collection\n"
printf "===================================================\n"
mongoimport --db clientsList --collection clients --type json --file data/seed/initClients.json --jsonArray

printf "\nImporting seed documents in a Providers collection\n"
printf "===================================================\n"
mongoimport --db clientsList --collection providers --type json --file data/seed/initProviders.json --jsonArray

printf "\nDONE!\n"
