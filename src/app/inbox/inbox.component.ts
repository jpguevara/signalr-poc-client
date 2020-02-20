import { Component, OnInit, Input } from "@angular/core";
import { Notification } from "../signal-r.service";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.scss"]
})
export class InboxComponent implements OnInit {
  @Input()
  notification: Notification[] = [];

  constructor() {}

  ngOnInit() {}
}
