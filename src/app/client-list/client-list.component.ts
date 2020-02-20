import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"]
})
export class ClientListComponent implements OnInit {
  @Input()
  clients = [];
  @Output()
  sendMessageClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  sendClick(clientId: string) {
    this.sendMessageClick.emit(clientId);
  }
}
