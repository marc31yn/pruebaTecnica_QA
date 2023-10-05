/// <reference types="cypress" />

import calculatorPage from "../../pages/mortgage_calculator/calculatorPage";

// Test suit constants
// -- URLs 
const calculadora_url = 'https://www.rocketmortgage.com/calculators/mortgage-calculator?qlsource=RMTextLink';

// -- functions
function calcularCuotaHipotecaria(costoCasa, pagoInicial, tasaInteresMensual, plazoPrestamo) {
  const M = costoCasa - pagoInicial;
  const r = tasaInteresMensual;
  const n = plazoPrestamo;

  const cuota = M * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const cuotaUSD = parseFloat(cuota.toFixed(2)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return cuotaUSD; // Redondea a dos decimales
}

// ***********************************************
// Test suit
describe('Pruebas de Cálculo de Cuota Hipotecaria', () => {
  beforeEach(() => {
    // Ir al sitio web
    cy.visit(calculadora_url)

    // Alias para elementos comunes
    calculatorPage.elements.homePrice_txt().as('homePrice');
    calculatorPage.elements.downPaymentAmount_btn().as('downPaymentAmountBtn');
    calculatorPage.elements.downPaymentAmount_txt().as('downPaymentAmount');
    calculatorPage.elements.downPaymentPercent_btn().as('downPaymentPercentBtn');
    calculatorPage.elements.downPaymentPercent_txt().as('downPaymentPercent');
    calculatorPage.elements.loanTerm_sel().as('loanTerm');
    calculatorPage.elements.interestRate_txt().as('interestRate');
  })

  it('Validar campos obligatorios', () => {

    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    cy.get('@homePrice').clear();
    calculatorPage.elements.homePrice_errormsg().should('have.text', 'Please enter a home price.');

    cy.get('@downPaymentAmountBtn').click();
    cy.get('@downPaymentAmount').clear();
    calculatorPage.elements.downPayment_errormsg().should('have.text', 'Please enter a down payment.');

    cy.get('@loanTerm').select([]);
    calculatorPage.elements.loanTerm_errormsg().should('have.text', 'Please select your term');

    cy.get('@interestRate').clear();
    calculatorPage.elements.interestRate_errormsg().should('have.text', 'Please enter an interest rate.');

    calculatorPage.elements.calculate_btn().click();
  });

  it('Validar campos con valores no válidos', () => {

    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    // Enviar datos invalidos y verificar mensajes de error
    cy.get('@homePrice').clear().type('0');
    calculatorPage.elements.homePrice_errormsg().should('have.text', 'Please enter number greater than zero.');

    cy.get('@downPaymentAmountBtn').click();
    cy.get('@downPaymentAmount').clear().type('-1');
    calculatorPage.elements.downPayment_errormsg().should('have.text', 'Please enter a down payment.');

    cy.get('@loanTerm').select([]);
    calculatorPage.elements.loanTerm_errormsg().should('have.text', 'Please select your term');

    cy.get('@interestRate').clear().type('11');
    calculatorPage.elements.interestRate_errormsg().should('have.text', 'Please enter an interest rate of 10% or less.');

    calculatorPage.elements.calculate_btn().click();
  });

  it('Verificar calculo de cuota hipotecaria con datos validos', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000';// costo de hipoteca de 250,000
    const downPayment = '20'; // pago inicial del 20%
    const loanTerm = '360'; // 30 años equivalen a 360 meses
    const interestRate = '4'; // tasa de interes mensual de 4%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    cy.get('@downPaymentPercentBtn').click();
    cy.get('@downPaymentPercent').clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.2), (0.04 / 12), (30 * 12));

    // Verificar el resultado calculado
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

  it('Verificar calculo de cuota hipotecaria con tasa de interés mínimas', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000'; // costo de hipoteca de 250,000
    const downPayment = '20'; // pago inicial del 20%
    const loanTerm = '360'; // 30 años equivalen a 360 meses
    const interestRate = '1'; // tasa de interes mensual de 1%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    cy.get('@downPaymentPercentBtn').click();
    cy.get('@downPaymentPercent').clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.2), (0.01 / 12), (30 * 12));

    // Verificar el resultado calculados
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

  it('Verificar calculo de cuota hipotecaria con tasa de interés maxima', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000'; // costo de hipoteca de 250,000
    const downPayment = '20'; // pago inicial del 20%
    const loanTerm = '360'; // 30 años equivalen a 360 meses
    const interestRate = '10'; // tasa de interes mensual de 10%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    cy.get('@downPaymentPercentBtn').click();
    cy.get('@downPaymentPercent').clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.2), (0.10 / 12), (30 * 12));

    // Verificar el resultado calculados
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

  it('Verificar calculo de cuota hipotecaria con pago inicial mínimo', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000'; // costo de hipoteca de 250,000
    const downPayment = '3'; // pago inicial del 3%
    const loanTerm = '360'; // 30 años equivalen a 360 meses
    const interestRate = '4'; // tasa de interes mensual de 4%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    cy.get('@downPaymentPercentBtn').click();
    cy.get('@downPaymentPercent').clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.03), (0.04 / 12), (30 * 12));

    // Verificar el resultado calculados
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

  it('Verificar calculo de cuota hipotecaria con plazo del préstamo mínimo', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000'; // costo de hipoteca de 250,000
    const downPayment = '20'; // pago inicial del 20%
    const loanTerm = '120'; // 10 años equivalen a 120 meses
    const interestRate = '4'; // tasa de interes mensual de 4%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    cy.get('@downPaymentPercentBtn').click();
    cy.get('@downPaymentPercent').clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.2), (0.04 / 12), (10 * 12));

    // Verificar el resultado calculado
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

  it('Verificar calculo de cuota hipotecaria utilizando pago inicial en monto', () => {
    // Verificar que la URL sea la correcta
    cy.url().should('eq', calculadora_url);

    //Datos de prueba
    const homePrice = '250000'; // costo de hipoteca de 250,000
    const downPayment = '50000'; // 50000 es igual al 20% de 250000
    const loanTerm = '360'; // 30 años equivalen a 360 meses
    const interestRate = '4'; // tasa de interes mensual de 4%

    // Ingresar datos y calcular
    cy.get('@homePrice').clear().type(homePrice);

    calculatorPage.elements.downPaymentAmount_btn().click();
    calculatorPage.elements.downPaymentAmount_txt().clear().type(downPayment);

    cy.get('@loanTerm').select(loanTerm);

    cy.get('@interestRate').clear().type(interestRate);

    calculatorPage.elements.calculate_btn().click();

    // Esperar a que se calcule la cuota hipotecaria
    cy.wait(1000)
    const resultadoCalculado = calcularCuotaHipotecaria(250000, (250000 * 0.2), (0.04 / 12), (30 * 12));

    // Verificar el resultado calculado 
    calculatorPage.elements.monthlyPayment_lbl().should('contain', resultadoCalculado)

  });

})
