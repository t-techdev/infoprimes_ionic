# Infoprimes mobile application

Ionic/Angular based cross-platform mobile application

## Live Urls
- iOS: https://apps.apple.com/us/app/infoprimes/id1481258124
- Android: https://play.google.com/store/apps/details?id=com.InfoPrimes.InfoPrimes&hl=en_US&gl=US

## Requirements

- Node (10.x)
- npm (or yarn)
- Cordova (9.x)
- XCode (for building iOS)
- Android Studio (for building Android)
- Ionic CLI (5.4.x)

## Pre Setup instructions

- Install ionic cli 5

```sh
npm install -g ionic@5.2.x
```

## iOS/Android setup

- First setup the platforms if not already added using the command

```sh
ionic cordova platform add ios
ionic cordova platform add android
```

- OR if platform is already added then setup platform specific binaries as follows

```sh
ionic cordova prepare ios
ionic cordova prepare android
```
