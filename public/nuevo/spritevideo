#!/bin/bash
#
# A very simple BASH script to take an input video and generate sprite JPG image
# from video thumbs in equal sequence of time periods.
#
#

######################################################################################
#
# Copyright (c) 2018, Nuevolab.com
# All rights reserved.
# 
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided for everyone without restrictions

function print_usage(){

cat << EOM
Video Sprite Generator
Version 1
Copyright (C) 2018 Nuevolab.com

Usage: spritevideo -i [inputfile] -o [outputdir] -p [outputfile]
	-i	Input video file
	-o	Output directory
	-p	Output jpg file
EOM
exit
}


if hash ffmpeg 2> /dev/null
then
  # FFMpeg exists
  echo "ffmpeg command found.... continuing"
else
  # FFMPeg doesn't exist, uh-oh!
  echo "Error: FFmpeg doesn't appear to exist in your PATH. Please addresss and try again"
  exit 1
fi

command -v convert >/dev/null 2>&1 || { echo >&2 "Imagemagick not installed.  Aborting."; exit 1; }

INPUTFILE=""
OUTPUT_DIRECTORY=""
OUTPUT_FILENAME=""
SPRITE_WIDTH=192
SPRITE_HEIGHT=108


while getopts ":i:o:p:w:h:" optname
  do
    case "$optname" in
      "i")
        INPUTFILE=$OPTARG
        ;;
      "o")
        OUTPUT_DIRECTORY=$OPTARG
        ;;
      "p")
        OUTPUTFILE=$OPTARG
        ;;
      "e")
        OUTPUTFILE2=$OPTARG
        ;;
      "w")
        SPRITE_WIDTH=$OPTARG
	;;
      "h")
	SPRITE_HEIGHT=$OPTARG
	;;
    esac
  done



if [ ! -f "$INPUTFILE" ]
then 
	INPUTFILE=""
	echo "Input video file does not exist. Exiting ..."
	exit 1
fi
if [ ! -d "$OUTPUT_DIRECTORY" ]
then 
	OUTPUT_DIRECTORY="" 
	echo "Output directory does not exist. Exiting ..."
	exit 1
fi

if [ OUTPUTFILE =="" ]
then
	echo "Output file not define. Exiting ..."
	exit 1
fi



# get video duration, v1
fulltime=`ffmpeg -i "$INPUTFILE" 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//`;

seconds=0;
hour=`echo $fulltime | cut -d ':' -f 1`;
minute=`echo $fulltime | cut -d ':' -f 2`;
second=`echo $fulltime | cut -d ':' -f 3 | cut -d '.' -f 1`;
duration=`expr 3600 \* $hour + 60 \* $minute + $second`;

if [ $duration -gt 0 ] 
then

	


	frequency=$((($duration / 80) + ($duration % 80 > 0)))
	echo "Video Duration: $duration seconds";
	echo "Frequency: $frequency";
	


	if [ $frequency -lt 1 ] 
	then 
	frequency=1;
	fi

	echo "Frequency: $frequency";
	
	i=0;
	j=0;

	rm -rf "$OUTPUT_DIRECTORY/tmp"
	
	mkdir "$OUTPUT_DIRECTORY/tmp"
	chmod 777 "$OUTPUT_DIRECTORY/tmp"
	
	total=0
	
	while [ $i -lt $duration ]
	do
		if [ $j -lt 10 ] ; 
		then
		echo "versions1"
		thumb="$OUTPUT_DIRECTORY/tmp/0$j.jpg"
		else
		echo "versions2"
		thumb="$OUTPUT_DIRECTORY/tmp/09$j.jpg"
		fi
		ffmpeg -hide_banner -loglevel panic -ss "$i" -i "$INPUTFILE" -vframes 1 -f image2 -s "$SPRITE_WIDTH"x"$SPRITE_HEIGHT" "$thumb"
		
		i=`expr $i + $frequency`
		j=`expr $j + 1`
		total=`expr $total + 1`
		

	done

	if [ -f $OUTPUTFILE ] ; then
		rm -f $OUTPUTFILE
	fi

	ffmpeg -pattern_type glob -i "$OUTPUT_DIRECTORY/tmp/*.jpg" -filter_complex tile=1x$total -y "$OUTPUTFILE"


	rm -rf "$OUTPUT_DIRECTORY/tmp"

	if [ -f "$OUTPUTFILE" ] 
	then
	echo ""
	echo "SUCCESS!"
	echo ""
	fi
else
	echo "Video duration = 0. Exiting..."
	exit 1

fi




