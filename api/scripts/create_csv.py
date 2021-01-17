import os, re, json, csv

out_info_filename = 'info.csv'
out_sub_filename = 'sub.csv'

out_info_file = open(out_info_filename, 'w', encoding='utf-8')
out_sub_file = open(out_sub_filename, 'w', encoding='utf-8')

try:
  info_writer = csv.writer(out_info_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  sub_writer = csv.writer(out_sub_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  info_writer.writerow(['Id','Title','Length','Thumbnail','Uploaded'])
  sub_writer.writerow(['Id','Text','Time'])

  for file in os.listdir('.'):
    filename = os.fsdecode(str(file))
    if filename.endswith('.en.txt'):
      sub_file = filename
      info_file = filename.replace('.en.txt', '.info.json')
      # print(filename)

      # meta
      with open(info_file, encoding='utf-8') as info:
        data = json.load(info)
        id = data['id']
        uploaded = data['upload_date']
        thumbnail = data['thumbnail'].replace('maxresdefault.jpg', 'sddefault.jpg')
        title = data['fulltitle']
        length = int(data['duration'])
        info_writer.writerow([id,title,length,thumbnail,uploaded])
      # captions
      
        with open(sub_file, 'r', encoding='utf-8') as sub:
          for line in sub:
            match = re.match('^([0-9:]{8}) (.*)$', line)
            if match:
              time = match.group(1)
              timeArr = time.split(':')
              hours = int(timeArr[0])
              minutes = int(timeArr[1])
              seconds = int(timeArr[2])
              timestamp = hours * 60 * 60 + minutes * 60 + seconds
              text = match.group(2)
              sub_writer.writerow([id,text,timestamp])
except:
  print("Unexpected error:", sys.exc_info()[0])

finally:
  out_info_file.close()        
  out_sub_file.close()






