Atenção este projeto utiliza:
- Coffee Script (http://coffeescript.org/): para gerar os arquivos .js
- Stylus (http://learnboost.github.io/stylus/): para gerar os arquivos .css
- Jade (http://jade-lang.com/): para gerar os arquivos .html

Para testar o projeto você deve, primeiro instalar as dependências do mesmo. No diretório raiz faça:
$ npm install
$ bower install

após a completa instalação execute:
$ grunt distrib

E você terá os arquivos gerados em: ./frontend e copiados para ./www/

Para ver a aplicação rodando, use:
$ grunt run

Para os testes do sistema execute
$ cd $HOME_PROJETO
$ cd frontend
$ mkdir Test; cd Test; mkdir js;  cd js; mkdir jasmine; cd ../..
$ cp bower_components/jasmine/dist/jasmine-standalone-2.0.0.zip frontend/Test/js/jasmine
$ cd frontend/Test/js/jasmine
$ unzip jasmine-standalone-2.0.0.zip
$ cd $HOME_PROJETO
$ grunt test
