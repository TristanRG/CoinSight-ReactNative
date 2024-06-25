class CryptoCurrency {
    constructor(id, name, symbol, quote) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.quote = quote;
    }
}

class Quote {
    constructor(usd) {
        this.usd = usd;
    }
}

class Usd {
    constructor(price, percentChange1h, percentChange24h, percentChange7d) {
        this.price = price;
        this.percentChange1h = percentChange1h;
        this.percentChange24h = percentChange24h;
        this.percentChange7d = percentChange7d;
    }
}
