import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonFab,
  IonIcon,
  IonFabButton,
  IonButton,
  IonLabel,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonItem,
  IonAvatar,
  IonList,
  IonChip,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { Miniature } from 'src/app/models/miniature.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateMiniatureComponent } from 'src/app/shared/components/add-update-miniature/add-update-miniature.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonList,
    IonAvatar,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonFabButton,
    IonIcon,
    IonFab,
    HeaderComponent,
    IonContent,
    CommonModule,
  ],
})

export class HomePage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  miniatures: Miniature[] = [];
  constructor() {
    addIcons({ createOutline, trashOutline, add });
  }

  ngOnInit() {}

  getMiniatures() {
    const user: User = this.utilsService.getLocalStoredUser()!;
    const path: string = `users/${user.uid}/miniatures`;

    let sub = this.firebaseService.getCollectionData(path).subscribe({
      next: (res: any) => {
        sub.unsubscribe();

        this.miniatures = res;
      },
    });
  }

  addUpdateMiniature() {
    this.utilsService.presentModal({
      component: AddUpdateMiniatureComponent,
      cssClass: 'add-update-modal',
    });
  }

  ionViewWillEnter() {
    this.getMiniatures();
  }
}
