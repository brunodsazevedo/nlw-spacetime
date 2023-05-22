<h1 align="center">
  <img
    src=".github/images/nlw-spacetime-logo.svg"
    alt="NLW Spacetime Logo"
    title="NLW Spacetime"
    width="660px"
  />
</h1>

<p align="center">
  <img
    alt="License"
    src="https://img.shields.io/static/v1?label=license&message=MIT&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=NLW&message=SpaceTime&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=Rocketseat&message=Ignite&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=ReactNative&message=0.71.8&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=Expo&message=48.0.15&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=Nativewind&message=2.0.11&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=Expo-Router&message=1.5.3&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=Nativewind&message=2.0.11&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=prisma&message=4.14.0&color=#04d361&labelColor=#0A1033"
  />
  
  <img
    src="https://img.shields.io/static/v1?label=fastify&message=4.17&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=react&message=18.2.0&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=nextjs&message=13.4.2&color=#04d361&labelColor=#0A1033"
  />

  <img
    src="https://img.shields.io/static/v1?label=tailwindcss&message=3.3.2&color=#04d361&labelColor=#0A1033"
  />
</p>

<br><br>

## 💻 **Projeto**

<br>

NLW Space time é uma aplicação de Cápsula de tempo, com objetivo de registrar memórias e visualizar memórias, e permitir que o usuário veja sua progressão ao decorrer do tempo. Essa aplicação conta com desenvolvimento de aplicações Web, Mobile e API RESTfull e conta com um UX design e incrível no frontend, e uma API consistente com as melhores praticas para desenvolvimento backend com Nodejs. Essa aplicação foi criada dentro do evento da NLW (Next Level Week), promovida pela
<a href="https://www.rocketseat.com.br">Rocketseat</a> .

<br>

## ✨ **Tecnologias**

<br>

- [x] Typescript
- [x] NodeJS
- [x] React
- [x] React Native
- [x] Expo
- [x] NextJS
- [x] NativeWind
- [x] Tailwindcss
- [x] Tailwindcss
- [x] Axios
- [x] JWT
- [x] Fastify
- [x] Prisma

<br>

## 📄 **Pré-requisitos**

<br>

- [x] NodeJS >= 18.16.0
- [x] npm
- [x] Expo >= 48.0.0
- [x] Expo Go

<br>

## Configurando ambientes

<br>

### **Server**

Acesse a pasta **server** e e execute o comando no terminal para instalar as dependências

```cl
npm install
```

Dentro da pasta server, há um arquivo **.env.example**, com variáveis de ambientes necessários antes de iniciar o servidor. Crie um arquivo com o nome **.env** e copie o conteúdo de **.env.example** em **.env**

```cl
cp .env.example .env
```
**OBS**: A aplicação depende das variáveis de ambiente de **GITHUB_CLIENT_ID** e **GITHUB_CLIENT_SECRET** para efetuar sign in e/ou sign up com Oauth do Github. para isso, é preciso criar dois OAuth Apps no Github para coletar as chaves necessárias para preencher as variáveis de ambiente em seu arquivo **.env**.

<br>

Feito isso, basta executar o servidor

```cl
npm run dev
```
Para visualizar a documentação e rotas disponíveis da API, basta acessar o endereço http://localhost:3333/docs para acessar o Swagger da aplicação.
<br><br>

### **Mobile**

Acesse a pasta **mobile** e e execute o comando no terminal para instalar as dependências

```cl
npm install
```

Feito instalação de dependências, execute a aplicação mobile com o comando no terminal

```cl
npx expo start
```

Após executar o comando, abra a aplicação em seu device de sua preferencia.
Caso tenha um dispositivo físico, tenha o app **Expo Go** disponível na Play Store ou App Store, abra a camera do dispositivo e aponte a camera para o QR Code disponível no terminal ao executar comando.

Caso execute em um emulador Android, basta pressionar tecla **a** para abrir o emulador android.

Caso execute em um emulador iOS, certifique que possua um MacBook,e com isso, basta pressionar tecla **i** para abrir o emulador iOS.
<br><br>

### **Web**

Acesse a pasta **web** e e execute o comando no terminal para instalar as dependências

```cl
npm install
```

Dentro da pasta web, há um arquivo **.env.local.example**, com variáveis de ambientes necessários antes de iniciar a aplicação. Crie um arquivo com o nome **.env.local** e copie o conteúdo de **.env.example** em **.env**

```cl
cp .env.local.example .env.local
```

Preenchido as variáveis de ambiente devidamente conforme orientado nas observações acima, basta executar a aplicação com o comando no terminal

```cl
npm run dev
```
<br>