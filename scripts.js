$(document).ready(function () {
    const currencyData = [
        { "code": "USD", "name": "Dólar Americano", "country": "Estados Unidos", "flag": "us", "symbol": "$" },
        { "code": "EUR", "name": "Euro", "country": "União Europeia", "flag": "eu", "symbol": "€" },
        { "code": "GBP", "name": "Libra Esterlina", "country": "Reino Unido", "flag": "gb", "symbol": "£" },
        { "code": "JPY", "name": "Iene Japonês", "country": "Japão", "flag": "jp", "symbol": "¥" },
        { "code": "AUD", "name": "Dólar Australiano", "country": "Austrália", "flag": "au", "symbol": "A$" },
        { "code": "CAD", "name": "Dólar Canadense", "country": "Canadá", "flag": "ca", "symbol": "C$" },
        { "code": "CHF", "name": "Franco Suíço", "country": "Suíça", "flag": "ch", "symbol": "CHF" },
        { "code": "CNY", "name": "Yuan Chinês", "country": "China", "flag": "cn", "symbol": "¥" },
        { "code": "INR", "name": "Rupia Indiana", "country": "Índia", "flag": "in", "symbol": "₹" },
        { "code": "RUB", "name": "Rublo Russo", "country": "Rússia", "flag": "ru", "symbol": "₽" },
        { "code": "ZAR", "name": "Rand Sul-Africano", "country": "África do Sul", "flag": "za", "symbol": "R" },
        { "code": "MXN", "name": "Peso Mexicano", "country": "México", "flag": "mx", "symbol": "Mex$" },
        { "code": "KRW", "name": "Won Sul-Coreano", "country": "Coreia do Sul", "flag": "kr", "symbol": "₩" },
        { "code": "SGD", "name": "Dólar de Cingapura", "country": "Cingapura", "flag": "sg", "symbol": "S$" },
        { "code": "NZD", "name": "Dólar Neozelandês", "country": "Nova Zelândia", "flag": "nz", "symbol": "NZ$" },
        { "code": "HKD", "name": "Dólar de Hong Kong", "country": "Hong Kong", "flag": "hk", "symbol": "HK$" },
        { "code": "SEK", "name": "Coroa Sueca", "country": "Suécia", "flag": "se", "symbol": "kr" },
        { "code": "NOK", "name": "Coroa Norueguesa", "country": "Noruega", "flag": "no", "symbol": "kr" },
        { "code": "TRY", "name": "Lira Turca", "country": "Turquia", "flag": "tr", "symbol": "₺" },
        { "code": "THB", "name": "Baht Tailandês", "country": "Tailândia", "flag": "th", "symbol": "฿" },
        { "code": "MYR", "name": "Ringgit Malaio", "country": "Malásia", "flag": "my", "symbol": "RM" },
        { "code": "PHP", "name": "Peso Filipino", "country": "Filipinas", "flag": "ph", "symbol": "₱" },
        { "code": "IDR", "name": "Rupia Indonésia", "country": "Indonésia", "flag": "id", "symbol": "Rp" },
        { "code": "VND", "name": "Dong Vietnamita", "country": "Vietnã", "flag": "vn", "symbol": "₫" },
        { "code": "PLN", "name": "Zloty Polonês", "country": "Polônia", "flag": "pl", "symbol": "zł" },
        { "code": "HUF", "name": "Forint Húngaro", "country": "Hungria", "flag": "hu", "symbol": "Ft" },
        { "code": "CZK", "name": "Coroa Tcheca", "country": "República Tcheca", "flag": "cz", "symbol": "Kč" },
        { "code": "RON", "name": "Leu Romeno", "country": "Romênia", "flag": "ro", "symbol": "lei" },
        { "code": "BGN", "name": "Lev Búlgaro", "country": "Bulgária", "flag": "bg", "symbol": "лв" },
        { "code": "ISK", "name": "Coroa Islandesa", "country": "Islândia", "flag": "is", "symbol": "kr" },
        { "code": "HRK", "name": "Kuna Croata", "country": "Croácia", "flag": "hr", "symbol": "kn" },
        { "code": "DKK", "name": "Coroa Dinamarquesa", "country": "Dinamarca", "flag": "dk", "symbol": "kr" },
        { "code": "ILS", "name": "Novo Shekel Israelense", "country": "Israel", "flag": "il", "symbol": "₪" },
        { "code": "AED", "name": "Dirham dos Emirados", "country": "Emirados Árabes Unidos", "flag": "ae", "symbol": "د.إ" },
        { "code": "SAR", "name": "Riyal Saudita", "country": "Arábia Saudita", "flag": "sa", "symbol": "ر.س" },
        { "code": "BRL", "name": "Real Brasileiro", "country": "Brasil", "flag": "br", "symbol": "R$" } // Adicionado BRL
    ];

    function populateSelects() {
        currencyData.forEach(currency => {
            const option = `<option value="${currency.code}" data-symbol="${currency.symbol}" data-icon="${currency.flag}">${currency.name}</option>`;
            $('.currency-from, .currency-to').append(option);
        });

        // Pre-selecionar a moeda USD na "currency-from" e BRL na "currency-to"
        $('.currency-from').val('USD').trigger('change');
        $('.currency-to').val('BRL').trigger('change');

        $('.currency-from, .currency-to').select2({
            templateResult: formatOption,
            templateSelection: formatOption
        });
    }

    function formatOption(option) {
        if (!option.id) {
            return option.text;
        }
        const $option = $(
            `<span><span class="flag-icon flag-icon-${$(option.element).data('icon')}"></span> ${option.text}</span>`
        );
        return $option;
    }

    populateSelects();

    const convertButton = document.querySelector(".convert");

    function convertValues() {
        const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);
        const currencyTo = document.querySelector(".currency-to").value;
        const currencyFrom = document.querySelector(".currency-from").value;
        const symbolTo = $('.currency-to').find(':selected').data('symbol');
        const symbolFrom = $('.currency-from').find(':selected').data('symbol');
        const nameTo = $('.currency-to').find(':selected').text();
        const nameFrom = $('.currency-from').find(':selected').text();
        const flagTo = $('.currency-to').find(':selected').data('icon');
        const flagFrom = $('.currency-from').find(':selected').data('icon');

        if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
            alert("Por favor, insira um valor válido para conversão.");
            return;
        }

        // API para taxas de câmbio
        const apiUrl = `https://open.er-api.com/v6/latest/${currencyFrom}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[currencyTo];
                if (rate) {
                    const convertedValue = inputCurrencyValue * rate;
                    const currencyToAmount = document.querySelector(".currency-to-amount");
                    const currencyToName = document.querySelector(".currency-to-name");
                    const currencyFromAmount = document.querySelector(".currency-from-amount");
                    const currencyFromName = document.querySelector(".currency-from-name");

                    currencyFromAmount.textContent = `${symbolFrom} ${inputCurrencyValue.toFixed(2)}`;
                    currencyToAmount.textContent = `${symbolTo} ${convertedValue.toFixed(2)}`;
                    currencyToName.textContent = nameTo;
                    currencyFromName.textContent = nameFrom;

                    document.querySelector(".currency-result.from .flag-icon").className = `flag-icon flag-icon-${flagFrom}`;
                    document.querySelector(".currency-result.to .flag-icon").className = `flag-icon flag-icon-${flagTo}`;
                } else {
                    alert("Conversão não disponível no momento.");
                }
            })
            .catch(error => {
                console.error("Erro ao obter taxas de câmbio:", error);
                alert("Erro ao obter taxas de câmbio.");
            });
    }

    convertButton.addEventListener("click", convertValues);

    // Animação de tremor na seta
    const setaElement = document.getElementById('seta-converter');
    setaElement.addEventListener('click', function () {
        setaElement.classList.add('shake');
        setTimeout(() => {
            setaElement.classList.remove('shake');
        }, 300);
    });

    // Função para buscar dados financeiros e atualizar o letreiro
    function fetchMarketData() {
        const apiKey = 'eoAD4htfS4GnrX7XYQdqLFwLpXnl7SIS'; // Sua chave da API Financial Modeling Prep
        const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']; // Exemplos de símbolos de ações
        const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(',')}?apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tickerContent = document.getElementById('ticker-content');
                let tickerText = '';

                // Verifique se data é um array e tem conteúdo
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(stock => {
                        const symbol = stock.symbol;
                        const price = stock.price;
                        if (price) {
                            tickerText += `${symbol}: $${parseFloat(price).toFixed(2)} | `;
                        } else {
                            console.error(`Dados não disponíveis para ${symbol}`);
                        }
                    });
                } else {
                    console.error('Nenhum dado financeiro recebido');
                }

                tickerContent.textContent = tickerText || 'Dados financeiros não disponíveis no momento';
            })
            .catch(error => {
                console.error('Erro ao buscar dados financeiros:', error);
            });
    }

    // Atualizar o letreiro a cada 30 segundos
    setInterval(fetchMarketData, 30000);
    fetchMarketData(); // Inicializar na carga da página

    // Lógica da Calculadora
    let currentOperation = '';
    const calcDisplay = document.getElementById('calc-display');
    
    function calculate(value) {
        if (value === '=') {
            try {
                currentOperation = eval(currentOperation).toString();
            } catch {
                currentOperation = 'Erro';
            }
        } else if (value === 'C') {
            currentOperation = '';
        } else if (value === 'sqrt') {
            currentOperation = Math.sqrt(eval(currentOperation)).toString();
        } else if (value === 'pow') {
            currentOperation = Math.pow(eval(currentOperation), 2).toString();
        } else if (value === '1/x') {
            currentOperation = (1 / eval(currentOperation)).toString();
        } else {
            currentOperation += value;
        }
        calcDisplay.value = currentOperation;
    }

    document.querySelectorAll('.calc-btn').forEach(button => {
        button.addEventListener('click', () => {
            calculate(button.getAttribute('data-value'));
        });
    });
});
