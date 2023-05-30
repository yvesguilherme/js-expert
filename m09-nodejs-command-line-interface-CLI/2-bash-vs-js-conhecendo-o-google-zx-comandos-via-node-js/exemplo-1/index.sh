FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do

# 1,2 -> bash01, bash02
# 3,4 -> shell01, shell02

folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)
mkdir -p $folder

cd $(pwd)/$folder
npm init -y --scope @yvesguilherme --silent > /dev/null
cat package.json | jq '{n: .name, v: .version}'
cd ..

# echo $folder

done

rm -rf bash* shell*