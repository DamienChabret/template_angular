import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InAppNotification } from '@models/InterfaceNotificationInApp';
import { NotificationService } from '@utils/NotificationManager';

@Component({
  standalone: true,
  selector: 'app-notification',
  template: `
    <div class="notification" [ngClass]="notification.type">
      <p>{{ notification.type | uppercase }}</p>
      <span>{{ notification.message }}</span>
      <button (click)="close()">×</button>
    </div>
  `,
  styles: [
    `
      .notification {
        padding: 1em;
        margin: 0.5em;
        border-radius: 5px;
        color: white;
        position: relative;
      }
      .notification.Success {
        background: #1b8534ff;
      }
      .notification.Error {
        background: #7c1f28ff;
      }
      .notification.Info {
        background: #c6c6c6ff;
      }
      .notification.Warning {
        background: #ac881dff;
        color: black;
      }
      button {
        position: absolute;
        top: 0.2em;
        right: 0.5em;
        background: transparent;
        border: none;
        color: inherit;
        font-size: 1.2em;

        &:hover {
          cursor: pointer;
        }
      }
    `,
  ],
  imports: [CommonModule],
})
export class NotificationComponent {
  @Input() notification!: InAppNotification;

  constructor(private notificationService: NotificationService) {}

  close() {
    this.notificationService.remove(this.notification.id);
  }
}
