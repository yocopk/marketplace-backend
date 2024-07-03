import { ModelAd } from "../models/Ad";
import { ModelAuth } from "../models/Auth";
import { ModelUser } from "../models/User";
import { ModelDevice } from "../models/Device";

export class ControllerAds {
    users: Array<ModelUser> = [];
    ads: Array<ModelAd> = [];
    auth: Array<ModelAuth> = [];
    devices: Array<ModelDevice> = [];
    register(email: string, password: string) {
        const userFound = this.users.find((user) => {
          return user.email === email;
        });
    
        if (userFound) {
          console.log("Utente già registrato!");
        } else {
          const newUser = new ModelUser(email, email, password);
          this.users = [...this.users, newUser];
          console.log("Registrazione effettuata con successo!");
        }
      }
    
      isTokenValid(token: ModelAuth["token"]) {
        const authFound = this.auth.find((auth) => auth.token === token);
        return authFound || false;
      }
    
      login(email: string, password: string) {
        const userFound = this.users.find(
          (user) => user.email === email && user.password === password
        );
    
        if (!userFound) {
          console.log("Utente non registrato!");
          return null;
        }
    
        const alreadyLogged = this.auth.some((auth) => {
          return auth.referenceKeyUser === userFound.primaryKey;
        });
    
        if (alreadyLogged) {
          console.log("Utente già loggato.");
          return null;
        }
    
        if (userFound) {
          const userDevices = this.devices.filter((device) => {
            return device.referenceKeyUser === userFound.primaryKey;
          });
    
          if (userDevices.length >= 2) {
            console.log(
              "Hai superato il limite di dispositivi registrati al tuo account."
            );
            return null;
          }
    
          const newAuth = new ModelAuth(userFound.primaryKey);
          const newDevice = new ModelDevice(userFound.primaryKey);
          const deviceFound = this.devices.find((device) => {
            return device.referenceKeyUser === newDevice.referenceKeyUser;
          });
    
          if (!deviceFound) {
            this.devices = [...this.devices, newDevice];
          }
    
          this.auth = [...this.auth, newAuth];
          console.log("Login effettuato con successo!");
          return { token: newAuth.token, devicePrimaryKey: newDevice.primaryKey };
        } else {
          console.log("Utente non registrato.");
        }
      }
    
      logout(token: ModelAuth["token"]) {
        const authFound = this.isTokenValid(token);
        if (authFound) {
          this.auth = this.auth.filter((auth) => auth.token !== token);
          console.log("Logout effettuato con successo!");
        } else {
          console.log("Token non valido");
        }
      }
    
      updateUsername(username: string, token: ModelAuth["token"]) {
        const tokenFound = this.isTokenValid(token);
        if (tokenFound) {
          const userKeyFound = this.users.find(
            (user) => user.primaryKey === tokenFound.referenceKeyUser
          );
          if (userKeyFound) {
            userKeyFound.username = username;
            console.log("Username aggiornato con successo!");
          } else {
            console.log("Qualcosa è andato storto");
          }
        } else {
          console.log("Token non valido");
        }
      }
}