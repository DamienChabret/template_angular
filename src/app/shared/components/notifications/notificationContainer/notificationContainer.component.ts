import { Component } from '@angular/core';
import { InAppNotification } from '@models/InterfaceNotificationInApp';
import { NotificationService } from '@utils/NotificationManager';
import { NotificationComponent } from '../notificationComponent/notification.component';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-notification-container',
  template: `
    <div class="notification-container">
      <app-notification
        *ngFor="let notif of notifications"
        [notification]="notif"
      >
      </app-notification>
    </div>
  `,
  styles: [
    `
      .notification-container {
        position: fixed;
        top: 1em;
        right: 1em;
        z-index: 1000;
      }
    `,
  ],
  imports: [NotificationComponent, CommonModule],
})
export class NotificationContainerComponent {
  notifications: InAppNotification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(
      (n) => (this.notifications = n)
    );
  }
}
