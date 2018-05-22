# French Passive Learning

## install dependencies
```
yarn install
```

## run a development server including watching your javascript and less files
```
yarn watch
```

## deploy to gcloud
```
yarn run deploy
```

# Raspberry Pi Setup

## Pre-setup

1. Setup a pi like you would normally

2. Install a keyboard accessory so keyboard floats on top

3. Connect to wifi

## Connecting to the pi if already on wifi

1. Open terminal and run `arp -a` to find wifi address of pi

2. Login to pi with `ssh pi@<IP>` and password `raspberry`

## Full screen browser

#### Running full screen on the pi

Edit this file on the pi:
`nano ~/.config/lxsession/LXDE-pi/autostart`

https://blog.gordonturner.com/2017/12/10/raspberry-pi-full-screen-browser-raspbian-december-2017/

#### Exit the full screen browser 

`shift control q`

# Sources

https://newsapi.org/sources
