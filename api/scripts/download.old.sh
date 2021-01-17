# Download captions from the specified channel/playlist/video
python ../tools/youtube_dl/__main__.py --skip-download --write-info-json --write-auto-sub --download-archive archive.txt -i -o "%(id)s" $1
