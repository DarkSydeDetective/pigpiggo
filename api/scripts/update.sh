#Download new video captions
./download_kohvlogs.sh
./download_dspgaming.sh
#!/bin/bash

#Transform contenet and onvert VTT files to TXT
for filename in *.vtt; do
	[ -e "$filename" ] && echo "Updating videos" || exit 0
	sed '1,/^$/d' -- "$filename" | sed 's/<[^>]*>//g' | awk -F. 'NR%8==1{printf"%s ",$1}NR%8==3' > ${filename%.*}.txt
done

#Convert TXT files to CSV for import into DB
python3 create_csv.py

#Import video metadata
psql -d pigpiggo -c "\copy video from 'info.csv' delimiter ',' csv header;"

#Import captions
psql -d pigpiggo -c "\copy caption(video_id,text,time) from 'sub.csv' delimiter ',' csv header;"

#Move processed files out of directory, remove temp files
mv archive.txt archive.tmp
mv -- *.json *.txt *.vtt done/
mv archive.tmp archive.txt
rm info.csv
rm sub.csv