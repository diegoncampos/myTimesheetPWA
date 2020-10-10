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
    return this.afs.collection('users').doc(userId).set(user)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }

  // Get user, read data just one time
  getUser(userID: string) {
    return this.afs.collection('users').doc(userID).get();
  }

  addTime(userId: string, times:Times) {
    return this.afs.collection('users').doc(userId).update({
      times: times
    })
  }
}