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
