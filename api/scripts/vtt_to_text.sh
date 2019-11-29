#!/bin/bash

for filename in *.vtt; do
	sed '1,/^$/d' -- "$filename" | sed 's/<[^>]*>//g' | awk -F. 'NR%8==1{printf"%s ",$1}NR%8==3' > ${filename%.*}.txt
done
