# React + TypeScript + Vite
# Projeto Vite + React

Este é um projeto simples utilizando Vite e React para construir uma aplicação web moderna e de alta performance. Abaixo estão as instruções para rodar o projeto em seu ambiente local.

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

## Passos para executar o projeto

### 1. Clonar o repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/davidcs/teste-front-teddy


cd projeto-vite-react
npm install


npm run dev


http://localhost:5173/


# Sistema de Gerenciamento de Clientes

## 📋 Estimativa do Projeto

### 1. Tempo de Desenvolvimento
**Estimativa total: 6-8 semanas**

Detalhamento:
- Configuração inicial do projeto: 1 semana
- Desenvolvimento do back-end: 2-3 semanas
- Desenvolvimento do front-end: 2-3 semanas
- Testes e ajustes: 1 semana
- Documentação e preparação para deploy: 1 semana

### 2. Equipe de Desenvolvimento
**Total: 3 desenvolvedores**
- 1 Desenvolvedor Pleno/Sênior de Back-end
- 1 Desenvolvedor Pleno/Sênior de Front-end
- 1 Desenvolvedor Júnior para suporte e testes

### 3. Senioridade dos Desenvolvedores
- **Back-end**: Desenvolvedor Sênior (Nível III)
- **Front-end**: Desenvolvedor Pleno (Nível II)
- **DevOps ou Especialista AWS**: Desenvolvedor Júnior (Nível I)

## 🚀 Arquitetura Proposta

### Arquitetura de Tecnologias
- **Front-end**: React + Vite
- **Back-end**: NestJS
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Linguagem**: TypeScript
- **Conteinerização**: Docker e Docker Compose
- **Mensageria**: RabbitMQ
- **Cloud**: AWS (ECS, RDS, S3)

### Arquitetura de Infraestrutura AWS
1. **Computação**: 
   - ECS (Elastic Container Service) para containers
   - EC2 para instâncias adicionais, se necessário

2. **Banco de Dados**:
   - RDS PostgreSQL
   - Configurações de backup e alta disponibilidade

3. **Armazenamento**:
   - S3 para armazenamento de assets
   - Configuração de CDN com CloudFront

4. **Observabilidade**:
   - CloudWatch para logs
   - X-Ray para rastreamento de serviços
   - CloudTrail para auditoria

## 🔧 Configurações e Tecnologias

### Back-end
- Framework: NestJS
- ORM: TypeORM
- Banco de Dados: PostgreSQL
- Documentação: Swagger
- Testes: Jest
- Observabilidade: OpenTelemetry

### Front-end
- Framework: React + Vite
- Gerenciamento de Estado: Context API / Redux
- Testes: Cypress (E2E)
- Estilização: Tailwind CSS

### Infraestrutura
- Docker
- Docker Compose
- CI/CD: GitHub Actions
- Mensageria: RabbitMQ

## 🛠 Configuração do Projeto

### Pré-requisitos
- Node.js (v18+)
- Docker
- Docker Compose
- PostgreSQL

## 📝 Documentação
- Swagger disponível em: `/api/docs`
- Documentação técnica no diretório `/docs`

## 🔍 Melhorias Futuras
- Implementar autenticação JWT
- Adicionar more testes de integração
- Melhorar performance com caching
- Implementar monitoramento avançado

# Plano de Entregas por Sprints

## Sprint 1 (15 dias)

- Configuração do ambiente de desenvolvimento
- Definição da arquitetura e tecnologias
- Implementação do back-end com Nest.js
  - Definição dos modelos e entidades
  - Criação dos endpoints de CRUD de clientes
  - Integração com o banco de dados PostgreSQL usando TypeORM
- Configuração da infraestrutura com Docker e Docker Compose
- Configuração do pipeline de CI/CD com GitHub Actions

## Sprint 2 (15 dias)

- Desenvolvimento do front-end com React + Vite
  - Criação dos componentes para exibir a lista de clientes
  - Implementação das funcionalidades de cadastro, edição e exclusão de clientes
  - Integração com a API do back-end
- Implementação da paginação e filtros na listagem de clientes
- Configuração da infraestrutura na AWS
  - Implantação do back-end no AWS ECS
  - Configuração do banco de dados no RDS
  - Armazenamento de assets no S3

## Sprint 3 (15 dias)

- Implementação da tela de visualização de clientes selecionados
- Adição de observabilidade com OpenTelemetry
  - Integração com CloudWatch e X-Ray
- Documentação da API usando Swagger
- Escrita de testes unitários para o back-end

## Sprint 4 (15 dias)

- Implementação de testes end-to-end com Cypress
- Criação do vídeo demonstrativo da aplicação
- Finalização da documentação no README
- Ajustes finais e testes de homologação
- Implantação da aplicação no ambiente de produção


