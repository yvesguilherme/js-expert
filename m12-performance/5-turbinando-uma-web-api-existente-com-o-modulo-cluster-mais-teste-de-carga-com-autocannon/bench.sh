URL=localhost:3000
npx autocannon $URL -m POST \
    --warmup [-c 1 -d 3] \
    --connections 500 \
    --pipeline 10 \
    --renderStatusCodes
    # --header o ContentType: application/json \
    # --body '{"usuario":"USUARIOTESTE","senha":"senha"}' \

# cat log.txt | grep 33119 | wc -l
# cat log.txt | grep 33106 | wc -l
# cat log.txt | grep 33107 | wc -l
# cat log.txt | grep 33113 | wc -l
# cat log.txt | grep 33139 | wc -l
# cat log.txt | grep 33137 | wc -l
# cat log.txt | grep 33131 | wc -l
# cat log.txt | grep 33125 | wc -l