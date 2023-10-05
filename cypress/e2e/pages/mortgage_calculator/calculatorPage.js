class calculatorPage {

    elements = {
        homePrice_txt: () => cy.get('#purchasePrice'),
        homePrice_errormsg: () => cy.get('#purchasePrice-monetary-input-error > .phfc-b-ErrorText'),
        downPaymentAmount_btn: () => cy.get('button[id="buttonAmount"]'),
        downPaymentPercent_btn: () => cy.get('button[id="buttonPercent"]'),
        downPaymentAmount_txt: () => cy.get('input[id="downPayment"]'),
        downPaymentPercent_txt: () => cy.get('input[id="downPaymentPercent"]'),
        downPayment_errormsg: () => cy.get('#downPayment-monetary-input-error > .phfc-b-ErrorText'),
        loanTerm_sel: () => cy.get('select[id="term"]'),
        loanTerm_errormsg: () => cy.get('#term-number-input-error > .phfc-b-ErrorText'),
        interestRate_txt: () => cy.get('input[id="rate"]'),
        interestRate_errormsg: () => cy.get('#rate-text-input-error > .phfc-b-ErrorText'),
        calculate_btn: () => cy.get('button[id="calculateButton"]'),
        monthlyPayment_lbl: () => cy.get('[data-qa="monthlyPayment"]')
    };

}

module.exports = new calculatorPage();