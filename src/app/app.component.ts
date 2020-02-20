import { Component, OnInit } from "@angular/core";
import { SignalRService } from "./signal-r.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  clients$ = this.signalRService.receiveClientsListener();
  messages$ = this.signalRService.receiveMessageListener();

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.signalRService.startConnection().subscribe(res => {
      console.log(res);
    });
  }

  sendClick(clientId: string) {
    this.signalRService.sendMessage(clientId, `Bring my Tacos!!`);
  }
}
