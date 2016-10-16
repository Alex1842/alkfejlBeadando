# Dokumentáció
##Koktél receptek
Készítette: Akopjan Alex

###1.	Követelményanalízis
#####1.1.	Célkitűzés, projektindító dokumentum
A program legfőbb célja jól átláthatóan, és érthetően megjeleníteni az adott koktélok, és italok főbb tulajdonságait, és receptjüket egy webes vastagkliens, azaz egyoldali alkalmazás felhasználásával Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a koktélok listáját megtekintheti, bővítheti, meglévő elemeket törölhet, valamit megjegyzéseket írhat. 

######Funkcionális követelmények:
* Regisztrációra
* Bejelentkezés
* Csak bejelentkezett felhasználók által elérhető funkciók
  - új ital felvételére a listába*
  - a meglévő italok szerkesztésére
  - a meglévő italok törlésére
  - komment írása

######Nem funkcionális követelmények:
*	**Könnyű áttekinthetőség:** Színekkel típus szerint csoportosítás
*	**Használhatóság:** Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
*	**Megbízhatóság:** jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
*	**Karbantarthatóság:** könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

#####1.2.	Szakterületi fogalomjegyzék

**Fajták:**
* **Shot:** Felespohárban felszolgált, gyakran csak alkoholt tartalmazó ital.
* **Cocktail:** Koktélos pohárban, szirupokkal, gyömülcslevekkel készített ital.
* **Long drink:** Egyszerű long-os pohárban felszolgált ital, gyakran egy fajta alkoholt és üdítőt tartalmaz.
* **Aperitif:** Étkezések előtt, étvágy fokozás céljából fogyasztott ital.

**Alap ital:** A koktélban legnagyobb arányban részt vevő tömény alkohol.

#####1.3.	Használatieset-modell, funkcionális követelmények

**Vendég**: Csak a publikus oldalakat éri el

*	Főoldal
*	Bejelentkezés
*	Regisztráció

**Bejelentkezett felhasználó**: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

*	Új recept felvétele
*	Meglévő recept megtekintése
*	Meglévő recept szerkesztése
*	Meglévő recept törlése
*	Komment írása



Vegyünk példának egy egyszerű folyamatot:

**Meglévő recept szerkesztése:**

1.	A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2.	Regisztráció után megtekintheti a recepteket listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt receptet.
3.	Megnyomja a „Megtekintés” feliratú gombot
4.	A megtekintés oldalon kiválaszthatja a „Szerkesztés” gombot
5.	Szerkesztés oldalon felviszi az új adatokat
6.	Submit gombra kattintva elmenti a változásokat


