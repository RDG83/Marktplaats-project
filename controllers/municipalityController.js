module.exports =
    {
        getAll: function ()
        {
            let municipalities = ["Amsterdam",
                "Rotterdam",
                "Den Haag",
                "Utrecht",
                "Eindhoven",
                "Groningen",
                "Tilburg",
                "Almere",
                "Breda",
                "Nijmegen",
                "Apeldoorn",
                "Haarlem",
                "Arnhem",
                "Enschede",
                "Amersfoort",
                "Zaanstad",
                "Haarlemmermeer",
                "'s-Hertogenbosch",
                "Zwolle",
                "Leiden",
                "Zoetermeer",
                "Leeuwarden",
                "Maastricht",
                "Dordrecht",
                "Ede",
                "Alphen aan den Rijn",
                "Westland",
                "Alkmaar",
                "Emmen",
                "Delft",
                "Venlo",
                "Deventer",
                "Sittard-Geleen",
                "Helmond",
                "Amstelveen",
                "Oss",
                "Hilversum",
                "Súdwest-Fryslân",
                "Hoeksche Waard",
                "Heerlen",
                "Nissewaard",
                "Meierijstad",
                "Hengelo",
                "Purmerend",
                "Schiedam",
                "Lelystad",
                "Roosendaal",
                "Leidschendam-Voorburg",
                "Gouda",
                "Vlaardingen",
                "Hoorn",
                "Almelo",
                "Velsen",
                "Assen",
                "Bergen op Zoom",
                "Capelle aan den IJssel",
                "Veenendaal",
                "Katwijk",
                "Stichtse Vecht",
                "Zeist",
                "Nieuwegein",
                "Westerkwartier",
                "Lansingerland",
                "Hardenberg",
                "Midden-Groningen",
                "Barneveld",
                "Roermond",
                "Gooise Meren",
                "Doetinchem",
                "Heerhugowaard",
                "Vijfheerenlanden",
                "Krimpenerwaard",
                "Smallingerland",
                "Den Helder",
                "Oosterhout",
                "Altena",
                "Hoogeveen",
                "Pijnacker-Nootdorp",
                "Terneuzen",
                "Kampen",
                "Rijswijk",
                "Woerden",
                "De Friese Meren",
                "West Betuwe",
                "Heerenveen",
                "Houten",
                "Weert",
                "Goeree-Overflakkee",
                "Utrechtse Heuvelrug",
                "Middelburg",
                "Barendrecht",
                "Waalwijk",
                "Hollands Kroon",
                "Harderwijk",
                "Overbetuwe",
                "Zutphen",
                "Het Hogeland",
                "Noordoostpolder",
                "Lingewaard",
                "Schagen",
                "Soest",
                "Ridderkerk",
                "Waadhoeke",
                "Kerkrade",
                "Veldhoven",
                "Noardeast-Fryslân",
                "Medemblik",
                "Zwijndrecht",
                "Heusden",
                "Vlissingen",
                "De Ronde Venen",
                "Steenwijkerland",
                "Etten-Leur",
                "Molenlanden",
                "Berkelland",
                "Zuidplas",
                "Rheden",
                "Zevenaar",
                "Venray",
                "Peel en Maas",
                "Noordwijk",
                "De Bilt",
                "Nijkerk",
                "Horst aan de Maas",
                "Tiel",
                "Uden",
                "Beverwijk",
                "Dronten",
                "Huizen",
                "Wijchen",
                "Hellevoetsluis",
                "Geldrop-Mierlo",
                "Wageningen",
                "Oude IJsselstreek",
                "Heemskerk",
                "Rijssen-Holten",
                "Goes",
                "Oldambt",
                "Raalte",
                "Landgraaf",
                "Teylingen",
                "Moerdijk",
                "Gorinchem",
                "Edam-Volendam",
                "Montferland",
                "Bronckhorst",
                "Castricum",
                "Hellendoorn",
                "Beekdaelen",
                "Leudal",
                "Coevorden",
                "Hof van Twente",
                "Berg en Dal",
                "Bodegraven-Reeuwijk",
                "IJsselstein",
                "Schouwen-Duiveland",
                "Meppel",
                "Tynaarlo",
                "Twenterand",
                "Lochem",
                "Epe",
                "Midden-Drenthe",
                "Maassluis",
                "Deurne",
                "Papendrecht",
                "Tietjerksteradeel",
                "Oldenzaal",
                "Aalsmeer",
                "Stadskanaal",
                "Echt-Susteren",
                "Renkum",
                "Hendrik-Ido-Ambacht",
                "Bernheze",
                "Noordenveld",
                "Valkenswaard",
                "Boxtel",
                "Gemert-Bakel",
                "Diemen",
                "Leusden",
                "Halderberge",
                "Best",
                "Bergen",
                "Opsterland",
                "Oost Gelre",
                "Krimpen aan den IJssel",
                "Uithoorn",
                "Boxmeer",
                "Sint-Michielsgestel",
                "Waddinxveen",
                "Culemborg",
                "Winterswijk",
                "Zaltbommel",
                "Nieuwkoop",
                "Dalfsen",
                "Langedijk",
                "Brunssum",
                "Achtkarspelen",
                "Nunspeet",
                "Hulst",
                "Veendam",
                "Heemstede",
                "Drimmelen",
                "Kaag en Braassem",
                "Leiderdorp",
                "Aalten",
                "Ermelo",
                "Buren",
                "Vught",
                "Gilze en Rijen",
                "Dinkelland",
                "Wassenaar",
                "Oisterwijk",
                "Dongen",
                "Beuningen",
                "Weststellingwerf",
                "Eijsden-Margraten",
                "Tholen",
                "Voorschoten",
                "Westerwolde",
                "Albrandswaard",
                "Ooststellingwerf",
                "Aa en Hunze",
                "Borger-Odoorn",
                "Steenbergen",
                "Sliedrecht",
                "Duiven",
                "Cuijk",
                "Stein",
                "Oegstgeest",
                "Baarn",
                "Maasdriel",
                "Delfzijl",
                "Voorst",
                "Wierden",
                "Haaksbergen",
                "Wijdemeren",
                "De Wolden",
                "Neder-Betuwe",
                "Putten",
                "Heiloo",
                "Maasgouw",
                "Wijk bij Duurstede",
                "Goirle",
                "Oldebroek",
                "Bloemendaal",
                "Loon op Zand",
                "Nuenen c.a.",
                "Borne",
                "Sluis",
                "Elburg",
                "Lisse",
                "Rucphen",
                "Koggenland",
                "Borsele",
                "Reimerswaal",
                "Losser",
                "Zwartewaterland",
                "Zeewolde",
                "Laarbeek",
                "Hillegom",
                "Zundert",
                "Veere",
                "Woensdrecht",
                "Bunschoten",
                "Stede Broec",
                "Geertruidenberg",
                "Tubbergen",
                "Urk",
                "Cranendonck",
                "Brummen",
                "Roerdalen",
                "Bladel",
                "Alblasserdam",
                "Rhenen",
                "Drechterland",
                "Weesp",
                "Westerveld",
                "Someren",
                "Midden-Delfland",
                "West Maas en Waal",
                "Eersel",
                "Dantumadeel",
                "Druten",
                "Meerssen",
                "Oirschot",
                "Bergeijk",
                "Enkhuizen",
                "Heerde",
                "Hardinxveld-Giessendam",
                "Waterland",
                "Brielle",
                "Olst-Wijhe",
                "Ommen",
                "Waalre",
                "Son en Breugel",
                "Staphorst",
                "Zandvoort",
                "Nederweert",
                "Gennep",
                "Asten",
                "Heumen",
                "Valkenburg a/d Geul",
                "Wormerland",
                "Heeze-Leende",
                "Beek",
                "Harlingen",
                "Landerd",
                "Hilvarenbeek",
                "Bunnik",
                "Westervoort",
                "Westvoorne",
                "Lopik",
                "Haaren",
                "Gulpen-Wittem",
                "Ouder-Amstel",
                "Montfoort",
                "Uitgeest",
                "Texel",
                "Beesel",
                "Woudenberg",
                "Bergen",
                "Reusel-De Mierden",
                "Kapelle",
                "Grave",
                "Voerendaal",
                "Pekela",
                "Hattem",
                "Opmeer",
                "Appingedam",
                "Sint Anthonis",
                "Landsmeer",
                "Blaricum",
                "Laren",
                "Doesburg",
                "Mill en Sint Hubert",
                "Boekel",
                "Simpelveld",
                "Oudewater",
                "Alphen-Chaam",
                "Vaals",
                "Beemster",
                "Scherpenzeel",
                "Oostzaan",
                "Loppersum",
                "Eemnes",
                "Zoeterwoude",
                "Mook en Middelaar",
                "Noord-Beveland",
                "Baarle-Nassau",
                "Renswoude",
                "Terschelling",
                "Ameland",
                "Rozendaal",
                "Vlieland",
                "Schiermonnikoog"
            ];
            municipalities.sort();
            return municipalities;
        }
    };