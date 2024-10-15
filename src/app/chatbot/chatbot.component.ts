import { Component, OnInit} from '@angular/core';
import stocksDataJSON from '../data/chatbot-stock-data.json';

interface StocksData {
  code: string,
  stockExchange: string,
  topStocks: TopStocks[]
}
interface TopStocks {
  code: string,
  stockName: string,
  price: Number
}
interface Options {
  code:string,
  name:string
}
interface Content {
  header:string,
  type:string,
  options:Options[]
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  messages: { content: Content | string, sender: 'bot' | 'user' }[] = [];
  stocksData:StocksData[] = stocksDataJSON;
  selectedStockExchange: string;

  // Triggers main menu
  ngOnInit(): void {
    this.onOptionClick('first','mainMenu');
  }

  // This populates the messages array
  addMessage(message: Content | string, sender: 'bot' | 'user') {
    this.messages.push({ content: message, sender });
  }

  //When the user clicks an option, this method loads the approprite options
  onOptionClick(type:string,option: string) {
    let content:Content;
    // When users selects a stock exchange, it shows the stocks within the stock exchange. Same options show when clicked Go Back.
    if(type === "stockExchange" || type === "goBack") {
      let stockExchange = this.stocksData.filter(el=>(el.code === option))[0];
      this.selectedStockExchange = option;
      let options:Options[] = [];
      stockExchange.topStocks.forEach(el=>{
        options.push({code:el.code,name:el.stockName});
      });
      content = {header:"Please select a stock",type:'stock',options:options};
      if(type === "stockExchange")
        this.addMessage(stockExchange.stockExchange, 'user');
    }
    // When users selects a stock, it shows the stock price and gives options of Main Menu and to Go Back.
    if(type === "stock") {
      let stockExchange = this.stocksData.filter(el=>(el.code === this.selectedStockExchange))[0]["topStocks"];
      let stock = stockExchange.filter(el=>(el.code === option))[0];
      let options = [{code:'mainMenu',name:'Main Menu'},{code:"back",name:"Go Back"}];
      let contentHeader = "Stock Price of " + stock.stockName + " is " + stock.price + ". Please select an option";
      content = {header:contentHeader,type:'menu',options:options};
      this.addMessage(stock.stockName, 'user');
    }
    // This defines what to show when user wants to click main menu or go back
    if(type === "menu" || type === "first") {
      if(option === "mainMenu") {
        let options = this.stocksData.map(el=>({code:el.code,name:el.stockExchange}));
        content = {header: "Please Select a Stock Exchange",type:'stockExchange',options:options};
        if(type === "menu")
         this.addMessage("Main Menu", 'user');
      }
      //this options calls back the same method to show the same options after selecting a stock exchange.
      if(option === "back") {
        this.addMessage("Go Back", 'user');
        this.onOptionClick("goBack",this.selectedStockExchange);
      }
    }
    //shows every bot message after 500ms delay
    if(content){
      setTimeout(() => {
        this.addMessage(content, 'bot');
      }, 500);
    }
    
  }


}
