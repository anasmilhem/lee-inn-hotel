import { Injectable, NgZone } from '@angular/core';
import { User } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Observable, last, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

// ...



export type FirebaseUser = auth.User | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userData: any //Save logged in user date
  user$: Observable<FirebaseUser>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.user$ = afAuth.authState as Observable<FirebaseUser>;
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        })
      })
      .catch((error) => {
        window.alert(error.message);
      })
  }


  SignUp(email: string, password: string, firstName: string, lastName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        console.log(result.user);
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: result.user?.email,
          uid: result.user?.uid,
          emailVerified: result.user?.emailVerified
        };
        console.log(user);
        this.SetUserData(user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, { merge: true });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }

  // Add this method inside the AuthService class
  bookRoom(bookingData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.user$.pipe(take(1)).subscribe((user: FirebaseUser) => {
        if (user) {
          this.afs.collection(`users/${user.uid}/bookings`).add(bookingData)
            .then(() => resolve())
            .catch((error) => reject(error));
        } else {
          reject(new Error('User is not logged in'));
        }
      });
    });
  }


  // Add this method inside the AuthService class
  getMyBookings(): Observable<any[]> {
    return this.user$.pipe(
      take(1),
      switchMap((user: FirebaseUser) => {
        if (user) {
          return this.afs.collection<any>(`users/${user.uid}/bookings`).valueChanges({ idField: 'id' }).pipe(
            switchMap((bookings) => {
              const roomObservables = bookings.map((booking) =>
                this.afs.doc(`hotelRooms/${booking.roomId}`).valueChanges()
              );
              return combineLatest(roomObservables).pipe(
                map((rooms) => {
                  return bookings.map((booking, index) => {
                    return {
                      ...booking,
                      room: rooms[index],
                    };
                  });
                })
              );
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }






}





