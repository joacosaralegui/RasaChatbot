# RasaChatbot

## Installation

1. Clone the repo
2. Fetch latest pip and python-dev <br/>
`sudo apt update`<br/>
`sudo apt install python3-dev python3-pip`
2. Move to Chatbot folder and run <br/>
`python3 -m venv ./venv`<br/>
`source ./venv/bin/activate`<br/>
`pip install -r requirements.txt`
3. Test by running `rasa train` and `rasa shell`

More info: https://rasa.com/docs/rasa/user-guide/installation/#step-by-step-installation-guide

## Usage

### Train and shell
1. Move to chatbot folder and run <br/>
`source ./venv/bin/activate`
2. To train <br/>
`rasa train`
3. To use shell<br/>
`rasa shell`

### Run api
1. Move to chatbot folder and run <br/>
`source ./venv/bin/activate`
2. Run API<br/>
`rasa n -m models --enable-api --cors "*" --debug`

