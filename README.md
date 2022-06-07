API criada por Hudson Oliveira Pereira, desenvolvedor JavaScript em desenvolvimento, para avaliaçao en teste técnico para Ubistart.

Link trello com demais informações sobre organização e planejamento: https://trello.com/b/FN7bBROj/testes

Dados para .env em .env.example

Ferramentas utilizadas:
    - Typescript
    - Nestjs
    - Prisma
    - Postgres
    - Docker
    - Class-validator/class-transformer
    - Passport
    - JWT
    - Bcrypt
    - ThunderClient

Para iniciar a aplicação, deve-se utilizar os seguintes comandos:
    - docker-compose up, para iniciar o container do banco de dados.
    - npm run start:dev, para iniciar o servidor em modo de desenvolvimento e startar a aplicação.
    Acessar a url http://localhost:3000 e verificar se a mensagem "API funcionando" aparece.

Descrição da API:
Essa API possui os seguintes endpoints:

    - POST /auth: Endponint utilizado para autenticar um usuário. Deve-se inserir os seguintes dados: EMAIL, sendo validado campo vazio ou informação não cadsatrada, e SENHA, sendo validado campo vazio ou informação incorreta. Deverá retornar um TOKEN de acesso do usuário, bem como a informação do tempo de autorização. Deve-se inserir o TOKEN no campo BEARER de autenticação.
    - GET /auth: Endpoint utilizado para verificar se autenticação funcionou corretamente, devendo retornar a frase "Usuário logado".

    - GET /user - Endponint utilizado para buscar todos os usuários cadastrados no sistema. Deverá retornar as informações gerais dos usuários, como: email, nível de permissão e data de criação.
    - POST /user - Endpoint utilizado para cadastrar novos usuários, não possui autorização nem permissão, sendo livre para criar usuários por qualquer pessoa. Deverão ser inseridos as seguintes informações: EMAIL, do tipo string, sendo validado o formato de email e informação vazia. SENHA, do tipo string, sendo salva em banco de dados criptografada, sendo item obrigatório. Ao cadastrar um novo usuário, deixar campo ROLE sem preenchimento para usuário comum, para cadastrar usuário ADMIN, deve-se inserir o campo ROLE com informação TRUE.

    - GET /todo - Endpoint utilizado para para listar todas as listas cadastradas em banco de dados, exibindo todas as informações cadastradas, incluindo data de criação e data de alteração. Neste endpoint deverá ser validado o nível de permissão, liberando todas as listas para usuários ADMIN, e apenas as listas do usuário, quando usuário COMUM.
    - GET /todo/id/:id - Endpoint utilizado para listar uma lista específica, sendo validado o usuário e liberando acesso apenas para o dono da lista, mesmo sendo usuário ADMIN. Deverá retornar as seguintes informações: EMAIL DO CRIADOR, DESCRIÇÃO e SITUAÇÃO do item, se está concluído, atrasado ou dentro do prazo.
    - GET /todo/late - Endpoint utilizado para buscar todos os itens atrasados que estão cadastrados no sistema. Endpoint liberado apenas para user ADMIN. Deverá retornar todos os itens marcados como atrasados apenas.
    - POST /todo - Endpoint utilizado para criar novo item. Deverão ser inseridos os seguintes itens: DESCRIPTION, do tipo string, sendo validada informação vazia e tipo. DAYDEADLINE, MONTHDEADLINE, YEARDEADLINE, do tipo number, sendo validada informação vazia e tipo. Foi utilizada dessa maneira pois ainda nao aprendi a trabalhar com formato DATE no schema prisma. CONCLUTED, do tipo number, sendo validado tipo. Item não obrigatório, pois por padrão deverá ser 0, que significa que o item ainda está em aberto. LATE. do tipo number, sendo validado tipo. Item não obrigatório, pois por padrão deverá ser 0, que significa que o item não está atrasado. UserId, do tipo number, sendo validada informação vazia e tipo. Esse item fará o link com o user cadastrado, para demais funcionalidades que precisam usar esse item funcionar corretamente. 
    - PATCH /id/:id - Endpoint utilizado para alterar informações da lista. Pode-se alterar todos os itens, com também de maneira individual. Para marcar um item como concluído, altera-se o item CONCLUTED para 1, sendo o único número aceito, ao fazer isso, não será mais possível realizar alteraçoes no item e a data de alteração salva será usada para verificar a data de conclusão. Para marcar o item como atrasado, deve-se alterar o item LATE para 1, sendo o único número aceito, ao fazer isso, o item será dado como atrasado, aparecendo também nas buscas por item atrasado.

Todos os endpoints possuem tratativa de erro de requisição, retornando erro 400 quando algo não ocorre como esperado.

Todos os endpoint deverão retornar mensagem personalizada quando vazios, foi feito throw new HttpException para cada uma delas, mas o erro acaba caindo junto em .catch, retornando a mesma mensagem para todos, mas no console mostra a mensagem para a tratativa.

Todas informações inseridas nas rotas POST estão com validações por decorators.

Os campos de dealine(day, month, year), quando números menores que 10, deverão ser inseridos com apenas 1 caracter, pois o ECMA5 não aceita o 0 a esquerda.

dados do user ADMIN: 
    email: admin@seed.com
    senha: "segredo"

Existem dois tipos de usuários desta API, COMUM e ADMIN, sendo o último inserido via seed.

Foi feita paginacao listando apenas 2 itens para user COMUM no endpoint /todo, nao consegui implementar mudança de paginas, por isso deixei o ADMIN com lista geral, para mostrar que a paginacao está funcionando.

Necessario alterar manualmente o item atrasado, inserindo o valor 1 (0 por padrao ao criar nova lista), assim ele passará a retornar também no endpoint GET /todo/late.