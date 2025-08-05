import { Injectable } from '@angular/core';
import {
  AppNotificationType,
  InAppNotification,
} from '@models/InterfaceNotificationInApp';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: InAppNotification[] = [];
  private notificationsSubject = new BehaviorSubject<InAppNotification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  // --- Fonction générique ---
  private notify(
    type: InAppNotification['type'],
    message: string,
    duration = 3000
  ) {
    const id = crypto.randomUUID();
    const newNotification: InAppNotification = { id, type, message, duration };

    this.notifications.push(newNotification);
    this.notificationsSubject.next(this.notifications);

    if (duration && duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  // --- Fonctions raccourcies ---
  success(message: string, duration = 3000) {
    this.notify(AppNotificationType.SUCCESS, message, duration);
  }

  error(message: string, duration = 5000) {
    this.notify(AppNotificationType.ERROR, message, duration);
  }

  info(message: string, duration = 3000) {
    this.notify(AppNotificationType.INFO, message, duration);
  }

  warning(message: string, duration = 4000) {
    this.notify(AppNotificationType.WARNING, message, duration);
  }

  // --- Suppression ---
  remove(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notificationsSubject.next(this.notifications);
  }

  clear() {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }
}
