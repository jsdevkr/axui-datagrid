#!/usr/bin/env bash
export LC_CTYPE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

FILES=`find ./src -name "*.js" -type f`

for file in $FILES
do
    startTime=`perl -MTime::HiRes -e 'printf("%.0f\n",Time::HiRes::time()*1000)' 2>&1 /dev/null`;

    filename="${file%.*}"
    mdName="${filename/src/md}.md"

    parent=`dirname $mdName`
    mkdir -p $parent

    jsdoc2md $file > $mdName
    endTime=`perl -MTime::HiRes -e 'printf("%.0f\n",Time::HiRes::time()*1000)'`;
    echo "$file $mdName : "$(expr $endTime - $startTime) "Millis"
done