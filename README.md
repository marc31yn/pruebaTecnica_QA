# Prueba tecnica - Test Automation
Este proyecto de prueba técnica para el puesto de QA Automation utilizando Cypress


<h2><span class="emoji">💻</span> Instalacion Cypress </h2>

1. Crear folder donde estara el proyecto
2. Ir folder o carpeta
> cd /your/project/path
3. Crear package.json file
> npm init
4. Instalar Cypress via npm:
> npm install cypress --save-dev
5. En package.json agregar el siguiente scripts:
>{
  "scripts": {
    "cy:open": "cypress open"
  }
}
6. Ejecutar el siguiente comando
>npm run cypress:open 

<strong><g-emoji class="g-emoji" alias="bulb" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4a1.png">💡</g-emoji> For more information:</strong> go to [Cypress webpage](https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn)

![image](https://user-images.githubusercontent.com/23398107/195535737-e7c6d2d6-1270-426f-9ba5-5795655fb188.png)


<h2><span class="emoji">💻</span> Clonar y ejecutar el proyecto actual </h2>

Para poder ejecutar en tu PC el este proyecto debe seguir los siguientes pasos:

1. Crear un folter o carpeta donde almacenar el clone del proyecto
2. Utilizando una terminar de GIT ejecutar el siguiente comando:
   > git clone https://github.com/marc31yn/pruebaTecnica_QA.git
3. En una terminar ejecutar el siguiente comando para instalar las dependencias:
   > npm install
   > npm install cypress
4. Si desea solo ejeuctar todas la pruebas en chrome, debe ejecutar este comando:
    > npm run cy:chrome
5. Si desea solo ejeuctar todas la pruebas en edge, debe ejecutar este comando:
    > npm run cy:edge
6. Si desea solo ejeuctar las pruebas del reto 1, debe ejecutar este comando:
   > npm run cy:reto1:chrome
7. Si desea solo ejeuctar las pruebas del reto 2, debe ejecutar este comando:
   > npm run cy:reto1:edge
