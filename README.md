# Financial Manager - Aplicação Web
Uma aplicação full-stack para gerenciamento financeiro pessoal construída com Spring Boot (Java) no backend e React (JavaScript) no frontend.
O objetivo do projeto é permitir que um usuário registre/visualize e controle suas finanças por meio de uma interface web moderna.<br><br>

## Estrutura do Projeto
O repositório está dividido em dois módulos principais:

### springboot-backend
Backend construído com Spring Boot, responsável por:
- API REST para operações financeiras
- Gerenciar dados de usuários, transações e categorias
- Validar e persistir dados em banco SQL

### react-frontend
Frontend construído com React, responsável por:
- Interface visual para o usuário interagir
- Listar transações, categorias, dashboards e formulários
- Consumir a API do backend e apresentar dados dinamicamente
- Fluxos de login, cadastro e CRUD de registros<br><br>


## Funcionalidades 
- Adicionar, editar e remover transação (receita ou despesa)
- Visualização de histórico de transações
- Filtragem por usuário (apenas administrador) e período (mês ou ano)
- Autenticação de usuário (pring Security e JWT)
- Consumo da API pelo frontend React<br><br>

### Cadastrar
![Cadastrar](https://raw.githubusercontent.com/xLeywin/Assets/main/financial-manager/Cadastrar.gif)<br><br>
### Editar
![Editar](https://raw.githubusercontent.com/xLeywin/Assets/main/financial-manager/Editar.gif)<br><br>
### Remover
![Remover](https://raw.githubusercontent.com/xLeywin/Assets/main/financial-manager/Remover.gif)<br><br>
### Filtros + Acesso Admin (Filtro por usuário e todos itens)
![FiltrosADM](https://raw.githubusercontent.com/xLeywin/Assets/main/financial-manager/FiltrosADM.gif)<br><br>

## Acesso à Aplicação
A aplicação pode ser acessada pelo link: https://wendellyv-fiancialmanager.netlify.app  
    
#### Observação: O projeto está hospedado no plano gratuito do Render. Por isso, caso o servidor esteja inativo, a requisição pode levar alguns segundos ou até mesmo não responder, neste caso será avisado pela aplicação.
