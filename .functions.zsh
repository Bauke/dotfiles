extract-clip () {
  ffmpeg -i "$1" -ss "$2" -to "$3" -c copy "$4"
}

gtag () {
  git tag -s -a "$1" -m "Version $1"
}

get-feed-url () {
  for input_url in "$@"; do
    html=$(curl -fsLS "$input_url")
    echo $(echo $html | select-html '[property="og:title"]' -a "content")
    echo $(echo $html | select-html '[rel="alternate"][type]' -a "href")
    echo
  done
}

to-opus () {
  for input_file in "$@"; do
    output_file="${input_file%.*}.opus"
    ffmpeg -i "$input_file" -c:a libopus -b:a 128K "$output_file"
  done
}
