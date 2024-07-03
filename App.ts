import { ModelAuth } from "./models/Auth";
import { ModelDevice } from "./models/Device";
import { ModelAd } from "./models/Ad";
import { ModelFavorite } from "./models/Favorite";
import { ModelReport } from "./models/Report";
import { ModelReview } from "./models/Review";
import { ModelUser } from "./models/User";

class Marketplace {
  users: Array<ModelUser> = [];
  ads: Array<ModelAd> = [];
  reviews: Array<ModelReview> = [];
  auth: Array<ModelAuth> = [];
  reports: Array<ModelReport> = [];
  favorites: Array<ModelFavorite> = [];
  devices: Array<ModelDevice> = [];

  register(email: ModelUser["email"], password: ModelUser["password"]) {
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

  login(email: ModelUser["email"], password: ModelUser["password"]) {
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

  updateUsername(username: ModelUser["username"], token: ModelAuth["token"]) {
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

  createAd(
    token: ModelAuth["token"],
    title: ModelAd["title"],
    description: ModelAd["description"],
    price: ModelAd["price"],
    category: ModelAd["category"],
    condition: string,
    URLimage: ModelAd["URLimage"],
    address: ModelAd["address"]
  ) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newAd = new ModelAd(
        tokenFound.referenceKeyUser,
        title,
        description,
        price,
        category,
        condition,
        URLimage,
        address
      );
      this.ads = [...this.ads, newAd];
      console.log("Annuncio creato con successo!");
    }
  }

  updateAd(
    referenceKeyAd: ModelAd["primaryKey"],
    token: ModelAuth["token"],
    title: ModelAd["title"],
    description: ModelAd["description"],
    price: ModelAd["price"],
    category: ModelAd["category"],
    URLimage: ModelAd["URLimage"],
    address: ModelAd["address"]
  ) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
      return;
    }

    const adFound = this.ads.find((ad) => {
      return (
        ad.primaryKey === referenceKeyAd &&
        ad.referenceKeyUser === tokenFound.referenceKeyUser
      );
    });
    if (!adFound) {
      console.log("Annuncio non trovato!");
      return;
    } else {
      adFound.title = title;
      adFound.description = description;
      adFound.price = price;
      adFound.category = category;
      adFound.URLimage = URLimage;
      adFound.address = address;
      console.log("Annuncio aggiornato con successo!");
    }
  }

  deleteAd(token: ModelAuth["token"], referenceKeyAd: number) {
    const tokenFound = this.isTokenValid(token);

    if (!tokenFound) {
      return console.log("Token non valido!");
    } else {
      const newAds = this.ads.filter((ad) => {
        return ad.primaryKey !== referenceKeyAd;
      });
      this.ads = newAds;
      console.log("Annuncio cancellato con successo!");
    }
  }

  markAsSold(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"], referenceKeyUser: ModelUser["primaryKey"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const adFound = this.ads.find(
        (ad) => ad.primaryKey === referenceKeyAd
      );

      if (!adFound) {
        console.log("Annuncio non trovato!");
        return null;
      }
      if (adFound.referenceKeyUser === tokenFound.referenceKeyUser) {
        adFound.sold = referenceKeyUser;
        console.log("Annuncio venduto con successo!");
      } else {
        console.log("Qualcosa è andato storto");
      }
    }
  }

  createReview(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"], title: ModelAd["title"], description: ModelAd["description"], rating: ModelReview["rating"]) {
    const tokenFound = this.isTokenValid(token);

    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newReview = new ModelReview(
        referenceKeyAd,
        tokenFound.referenceKeyUser,
        title,
        description,
        rating
      );
      this.reviews = [...this.reviews, newReview];
      console.log("Recensione creata con successo!");
    }
  }

  updateReview(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"], title: ModelAd["title"], description: ModelAd["description"], rating: ModelReview["rating"]) {
    // verificare il token, se esiste, fare l'update altrimenti dare errore.
    const tokenFound = this.isTokenValid(token);
    const reviewFound = this.reviews.find(
      (review) => review.referenceKeyAd === referenceKeyAd
    );
    if (!tokenFound) return console.log("Token non valido!");
    if (!reviewFound) return console.log("Recensione non trovata!");
    else {
      if (tokenFound.referenceKeyUser === reviewFound.referenceKeyUser)
        return console.log("Non sei autorizzato a modificare questo annuncio!");
      else {
        reviewFound.title = title;
        reviewFound.description = description;
        reviewFound.rating = rating;

        console.log("Annuncio modificato con successo!");
      }
    }
  }

  deleteReview(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"]) {
    const tokenFound = this.isTokenValid(token);
    const reviewFound = this.reviews.find((review) => {
      return review.referenceKeyAd === referenceKeyAd;
    });
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      if (!reviewFound) {
        console.log("Recensione non trovata!");
        return null;
      }
      if (reviewFound.referenceKeyUser !== tokenFound.referenceKeyUser) {
        console.log("Non sei autorizzato a cancellare questa recensione!");
      } else {
        const newReviews = this.reviews.filter((review) => {
          return review.referenceKeyAd !== referenceKeyAd;
        });

        this.reviews = newReviews;
        console.log("Recensione cancellata con successo!");
      }
    }
  }

  deleteAccount(token: ModelAuth["token"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newUsers = this.users.filter(
        (user) => user.primaryKey !== tokenFound.referenceKeyUser
      );
      this.users = newUsers;
      console.log("Account cancellato con successo!");
    }
  }

  filterList(category: ModelAd["category"]) {
    // mostra la lista in base alla categoria scelta
    const filteredAds = this.ads.filter((ad) => {
      return ad.category === category;
    });
  }

  AdDetails(referenceKeyAd: ModelAd["primaryKey"]) {
    // Implement the ad details logic here
  }

  itemSoldList(token: ModelAuth["token"]) {
    // Implement the item sold list logic here
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const userAds = this.ads.filter((ad) => {
        return ad.referenceKeyUser === tokenFound.referenceKeyUser;
      });

      const soldItems = userAds.filter((ad) => {
        return ad.sold !== 0;
      });

      console.log("Ecco i tuoi articoli venduti", soldItems);
    }
  }

  itemBoughtList(token: ModelAuth["token"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const userAds = this.ads.filter((ad) => {
        return ad.sold === tokenFound.referenceKeyUser;
      });
      console.log("Ecco i tuoi articoli comprati", userAds);
    }
  }

  favoritesList(token: ModelAuth["token"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const userFavorites = this.favorites.filter((favorite) => {
        return favorite.referenceKeyUser === tokenFound.referenceKeyUser;
      });
      console.log("Ecco la tua lista dei favoriti", userFavorites);
    }
    // Implement the favorites list logic here
  }

  addFavorite(referenceKeyAd: ModelAd["primaryKey"], token: ModelAuth["token"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newFavorite = new ModelFavorite(
        referenceKeyAd,
        tokenFound.referenceKeyUser
      );
      this.favorites = [...this.favorites, newFavorite];
    }
  }

  removeFavorite(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newFavorites = this.favorites.filter((favorite) => {
        return favorite.referenceKeyAd !== referenceKeyAd;
      });
      this.favorites = newFavorites;
      console.log("Favorito rimosso con successo!");
    }
  }

  reportAd(referenceKeyAd: ModelAd["primaryKey"], token: ModelAuth["token"], title: ModelAd["title"], description: ModelAd["description"], condition: ModelAd["condition"]) {
    const tokenFound = this.isTokenValid(token);
    if (!tokenFound) {
      console.log("Token non valido!");
    } else {
      const newReport = new ModelReport(
        referenceKeyAd,
        tokenFound.referenceKeyUser,
        title,
        description,
        condition
      );
      this.reports = [...this.reports, newReport];
    }
  }
}

const app = new Marketplace();
