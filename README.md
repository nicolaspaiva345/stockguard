# StockGuard

Sistema de gerenciamento de estoque desenvolvido com **Spring Boot, Spring Security, JWT, PostgreSQL, React e TypeScript**.

O projeto possui uma área pública para consulta de produtos e um painel administrativo protegido por autenticação JWT para gerenciamento do estoque.

## Funcionalidades

### Área pública

* Visualização dos produtos disponíveis
* Busca por nome
* Indicação de disponibilidade em estoque
* Interface responsiva

### Autenticação

* Cadastro de usuário
* Login com JWT
* Senhas protegidas com BCrypt
* Rotas administrativas protegidas

### Painel administrativo

* Listagem de produtos
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Controle de nome, preço e quantidade
* Mensagens de erro e carregamento

## Tecnologias

### Backend

* Java 21
* Spring Boot 4.1
* Spring Security
* JWT / OAuth2 Resource Server
* Spring Data JPA
* Hibernate
* PostgreSQL
* Bean Validation
* Maven
* Docker

### Frontend

* React
* TypeScript
* Vite
* Axios
* React Router
* Tailwind CSS

## Arquitetura

```text
                   ┌─────────────────────┐
                   │     React / Vite    │
                   │    Frontend :5173   │
                   └──────────┬──────────┘
                              │
                         HTTP / JSON
                              │
                              ▼
                   ┌─────────────────────┐
                   │    Spring Boot      │
                   │      API :8080      │
                   ├─────────────────────┤
                   │ Spring Security     │
                   │ JWT                 │
                   │ Controllers         │
                   │ Services            │
                   │ Repositories        │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │      PostgreSQL     │
                   │    Database         │
                   └─────────────────────┘
```

## Estrutura do projeto

```text
stockguard/
├── back-end/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── compose.yaml
│
├── front-end/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## Como executar localmente

### Pré-requisitos

* Java 21
* Node.js
* Docker Desktop
* Git

### Backend

Entre na pasta:

```bash
cd back-end
```

Configure as variáveis de ambiente:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/stockguard
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta
```

Execute:

```bash
./mvnw spring-boot:run
```

No Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

A API estará disponível em:

```text
http://localhost:8080
```

### Frontend

Entre na pasta:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```

Execute:

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

## Docker

Na pasta `back-end`:

```bash
docker compose up -d
```

Isso inicia:

```text
StockGuard API
PostgreSQL
```

Para verificar:

```bash
docker compose ps
```

Para visualizar os logs:

```bash
docker compose logs app
```

Para parar os containers:

```bash
docker compose down
```

## Principais endpoints

### Autenticação

```http
POST /auth/register
POST /auth/login
```

### Produtos públicos

```http
GET /products
GET /products/{id}
```

### Produtos protegidos

Requer:

```http
Authorization: Bearer <JWT>
```

Endpoints:

```http
POST /products
PUT /products/{id}
DELETE /products/{id}
```

## Segurança

O projeto utiliza:

* Spring Security
* JWT para autenticação
* BCrypt para armazenamento seguro de senhas
* Autorização baseada em autenticação
* Variáveis de ambiente para credenciais
* CORS configurado para o frontend

Segredos e credenciais não devem ser armazenados no repositório.

## Próximos passos

* Deploy da API
* Deploy do frontend
* Banco PostgreSQL em produção
* Melhorias de observabilidade
* Testes automatizados adicionais
* CI/CD
