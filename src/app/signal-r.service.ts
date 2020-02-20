import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { Observable, BehaviorSubject } from "rxjs";

export interface Notification {
  message: string;
  to: string;
  from: string;
}

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  private messages: Notification[] = [];

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/notificationsHub")
      .build();

    return new Observable(observer => {
      this.hubConnection
        .start()
        .then(() => observer.next(`Connection started.`))
        .catch(err =>
          observer.error("Error while starting connection: " + err)
        );
    });
  };

  public sendMessage(user, message) {
    this.hubConnection
      .invoke("SendMessage", user, message)
      .catch(function(err) {
        return console.error(err.toString());
      });
  }

  public receiveMessageListener(): Observable<Notification[]> {
    return new Observable(observer =>
      this.hubConnection.on("ReceiveMessage", data => {
        this.messages = [...this.messages, data];
        observer.next(this.messages);
      })
    );
  }
  public receiveClientsListener(): Observable<any> {
    return new Observable(observer =>
      this.hubConnection.on("ReceiveClients", data => {
        observer.next(data);
      })
    );
  }
}
