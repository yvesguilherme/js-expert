# A partir da pasta raiz deste projeto
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# A partir da parta deste módulo

# Copiar pasta do projeto de teste para este projeto.
cp -r ../../m1-javascript-testing/05-tdd-bdd-project/part-3/ .

# XARGS = EXECUTA UM COMANDO PARA CADA ITEM QUE FOI RETORNADO A PARTIR DO FIND
# IPT   = iPipeTo CRIA UMA INTERFACE INTERATIVA PARA PODER SELECIONAR UM ELEMENTO
CONTENT="'use strict';\n"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i {file} -e '1s/^/\'"$CONTENT"'\n/g'
#| xargs -I '{file}' echo 'ae' {file}

# MUDA TODOS OS ARQUIVOS!
CONTENT="'use strict';\n"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i {file} -e '1s/^/\'"$CONTENT"'\n/g'