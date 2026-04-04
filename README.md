# InvoiceGen - Sistema Gerador de Faturas

## Descrição
O **InvoiceGen** é uma aplicação moderna baseada em Angular idealizada para facilitar a criação e o gerenciamento de faturas (invoices). O sistema incorpora funcionalidades robustas para organizar Clientes e Consultores, e permite a geração dinâmica de arquivos de faturas em formato PDF com uma tipografia concisa e limpa.

## Funcionalidades
- **Geração de Faturas PDF**: Criação e exportação instantânea de faturas estruturadas profissionalmente em formato PDF (utilizando `html2canvas` e `jspdf`).
- **Gerenciamento de Clientes**: Cadastro, edição, listagem e persistência de clientes.
- **Gerenciamento de Consultores**: Controle de consultores e seus dados para emissões flexíveis.
- **Histórico de Faturas**: Armazenamento e consulta das faturas já criadas.
- **Persistência de Dados Local**: Utiliza a `LocalStorage API` por debaixo dos panos através de uma camada moderna e limpa chamada de `Repository Pattern`.
- **Padrão Brasileiro Regional (PT-BR)**: A aplicação encontra-se estruturada por padrão com formato monetário `BRL` e a formatação de números/datas atrelados ao Brasil.

## Estrutura Técnica do Projeto
A arquitetura do projeto promove escalabilidade e fácil manutenção com a separação dos seguintes módulos fundamentais dentro da pasta `src/app`:
- `/invoice`: Arquivos com foco na visão (preview) e formatação/criação direta da Fatura (`InvoiceGeneratorComponent`, `InvoicePreviewComponent`).
- `/management`: Comporta todo o pilar de operação: CRUD de Clientes, Consultores e tela do histórico do financeiro/faturas.
- `/services` & `repositories`: Classes injetáveis contendo a complexidade e interações na persistência com a store local do navegador (`LocalStorageClientRepository`, `LocalStorageConsultantRepository`).
- `/classes` & `/value-objects`: Modelagem conceitual da aplicação isolando regras de negócio e tipagens.
- `/data`: Arquivos utilizados para mockup ou alimentação de sementes (seeder) de informações na Inicialização.
- `/shared`: Componentes utilitários, diretivas ou utilitários para uso comum entre módulos.

## Tecnologias Abordadas
- **Angular** `17.3.3` (Stand-alone/NPM)
- **TypeScript** & **Vite**
- **SCSS**
- Modificadores e Plugins PDF: `html2canvas` `(^1.4.1)` e `jspdf` `(^2.5.1)`

## Requisitos e Execução
Você precisará ter instalado as instâncias mais recentes e compatíveis do Node.js (preferencialmente v18+) e NPM na sua máquina.

1. Instale as dependências com o gerenciador NPM:
```sh
npm install
```

2. Inicialize o servidor de visualização:
```sh
npm start
# Executando no Angular CLI: ng serve
```

3. Abra o navegador em `http://localhost:4200/`.

---

### Scripts Secundários
- **Build**: `npm run build` cria o pacote pronto e refatorado em diretório `dist/` focado na produção.
- **Teste**: `npm run test` incializa a bateria de rodadas do Karma voltados a testes unitários.
