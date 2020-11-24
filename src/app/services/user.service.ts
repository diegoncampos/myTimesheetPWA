import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { User } from '../models/user'
import * as firebase from 'firebase';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string;
  constructor(
    private afs: AngularFirestore
  ) {}

  newUser(userId: string, user: User) {
    // var userId = firebase.auth().currentUser.uid;
    return this.afs.collection('users').doc(userId).set(user);

  }

  // Get user, read data just one time
  getUser(userID: string) {
    return this.afs.collection('users').doc(userID).get();
  }

  addTime(userID: string, times:Times) {
    return this.afs.collection('users').doc(userID).update({
      times: times
    })
  }

  getSettings(userID: string) {
    this.afs.collection('users').doc(userID).get().subscribe(elem => {
      return elem.data().settings;
    });
  }

  setSettings(userID: string, settings: any) {
    return this.afs.collection('users').doc(userID).update({
      settings: settings
    })
  }

  updateOfflineMode(userID: string, _offlineMode: any) {
    // Use set and merge, will merge object with existing one not replace
    return this.afs.collection('users').doc(userID).set({
      settings: {
        offlineMode: _offlineMode
      }
    }, {merge: true})
  }
}
