# Cab booking service with NodeJS
This repo has the model implementation of cab booking service.

## Directory Structure

src has the source for the project
Env is meant for stroing env variables
./index.js exposes app inside src

### src structure
/api - definition of routes
/config - Configuring controls for the app, reading various keys from env
/entities - defining schema of various data level entities
/services - to enable CRUD and other methods for entities
/logger - for logging various activities
/data - Store of data. This project uses a dynamically generated data.json as the source.
/utils - General helper functions that may be required all around the application