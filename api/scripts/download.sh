# Download captions from the specified channel/playlist/video
python3 ../tools/yt_dlp/__main__.py --skip-download --write-info-json --write-auto-sub --force-write-archive --download-archive /home/tiger/pigpiggo/api/scripts/archive.txt -i -o "%(id)s" $1
