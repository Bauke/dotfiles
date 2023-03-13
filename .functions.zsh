# Copies a section from a video using ffmpeg.
# extract-clip <input file> <start timestamp> <end timestamp> <output file>
extract-clip () {
  ffmpeg -ss "$2" -i "$1" -to "$3" -c copy "$4"
}

# Creates a new signed, annotated git tag.
# gtag <version number>
gtag () {
  git tag -s -a "$1" -m "Version $1"
}

# Tries to find a feed URL for any given URLs.
# get-feed-url <url ...>
get-feed-url () {
  for input_url in "$@"; do
    html=$(curl -fsLS "$input_url")
    echo $(echo $html | select-html '[property="og:title"]' -a "content")
    echo $(echo $html | select-html '[rel="alternate"][type]' -a "href")
    echo
  done
}

# Create a directory and cd into it.
# mc <directory>
mc () {
  mkdir -p "$1"
  cd "$1"
}

# Select a window and resize it to the specified resolution.
# resize-window [width (default: 1280)] [height (default: 720)]
resize-window () {
  xdotool selectwindow windowsize ${1-1280} ${2-720}
}

# Converts any given files to 128K Opus using ffmpeg.
# to-opus <file ...>
to-opus () {
  for input_file in "$@"; do
    output_file="${input_file%.*}.opus"
    ffmpeg -i "$input_file" -c:a libopus -b:a 128K "$output_file"
  done
}
