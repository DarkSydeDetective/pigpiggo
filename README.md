# PigPigGo.net

The most toxified search engine on the internet.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* PostgreSQL  
* Python3

### Installing

Install the required software listed under *Prerequisites* (if not already installed).  
For Linux/Ubuntu:
```
sudo apt update
sudo apt install postgres
sudo apt install python3
```

Setup the PostgreSQL database using the db_create.sql script in api/db/:
```
su postgres
psql -U postgres -a -f db_create.sql
```

Install npm modules and start up the api server (api folder):
```
npm install
cd api
npm run start
```

Install npm modules and start up the web client (client folder):
```
npm install
cd src
npm run start
```

## Populating the database with video captions/metadata

Run update.sh in the api/scripts folder.  
Note: You'll need to add whatever user you're logged in as as a user in postgresql with the ability to insert to the pigpiggo database.
```
./update.sh
```

**WARNING**
* DSPGaming has around 56,000 videos, it will take a LONG time to download all the captions and YouTube will temp ban you for too many requests long before then anyway.  
* youtube-dl also unfortunately eats up alot of memory and will bring your computer to a crawl eventually (probably after a couple thousand videos).
* Progress is however saved in archive.txt which will be generated when you run the update.sh or any of the download scripts so you can just Ctrl+C to force quit out and then run the download script again.
* Before you have all the videos it's probably safer to use the download_dspgaming script instead of update.sh as this will only download the captions and not update the db, wherease update has a risk of screwing your data up slightly.
  This will download all the video metadata and captions into the current directory, then when you next run update.sh it'll put all of the videos accumulated there into the database, then move them to the 'done' folder so they don't get processed again next time.
* After new videos appear on YT it seems to take a little bit of time for captions to be auto-generated. If you do a download during this window the video may get marked as downloaded but there won't be any captions and so it won't be searchable
  so you probably want to wait an extra hour or so to make sure captions are available before download.
* The pigpiggo database so far has about 30,000 videos in the database, currently working on the rest but it will take a little time. I'll make what I have so far available so you don't need to redownload that 30,000.
* If you get temp banned for too many requests it usually fixes itself in a day or so. You can try a VPN or changing IP addresses to get around it.

## Contributing

TODO

## Authors

* **DarkSydeDetective** - *Initial work* - [DarkSydeDetective](https://github.com/pigpiggo-net)

## License

This project is licensed under the MIT License

## Acknowledgments

Big ups to all the worthless humans out there that make the dark one's streams so entertaining. 
