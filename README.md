trello: https://trello.com/b/FN7bBROj/testes

nestjs
prisma
postgres
docker - db
class-validator/class-transformer

user apenas com create e findall

email validando formato
validacao de retorno vazio
decorators nas rotas post
validacao erro de requisicao
deadline itens separados
ECSMA5 nao aceita 0 a esquerda
rota de autenticacao 'auth'
senha admin: "$2b$10$F3aIBwFskwcls6kcaleZl.WtdU3lhaHRCejDf0hb7DWXvRDQo/LyW"
dois tipos de user, admin ja no seed
para criar user admin, deve-se especificar no campo role, para usuario comum, pode deixar em branco que adiciona automatico
data de conclusao será utilizada na data de alteração, quando o item concluido, nao será permitido alterar o item novamente, fazendo com que a ultima alteração seja a conclusao.
as tratativas de erro estao retornando as informacoes no console, foi feito throw new HttpException para cada uma delas, mas o erro acaba caindo junto em .catch, retornando a mesma mensagem para todos, mas no console esta a mensagem para tratativa de erro individual, em caso e consumo com front, pode-se usar esse retorno.
paginacao feita apenas selecao de 2 itens para user comum, nao consegui implementar mudança de paginas, por isso deixei o admin com lista geral, para mostrar que a paginacao no user esta funcionando
necessario alterar manualmente o item atrasado, inserindo o valor 1 (0 por padrao ao criar nova lista), assim, na rota /todo/late retornará todos os itens atrasados