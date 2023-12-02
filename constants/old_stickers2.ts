export interface Sticker {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean
};

export enum Album {
    Thor = "Adventures of Thor",
    Argo = "The Argonauts",
    Bake = "Bake-Danuki",
    RR = "Romulus and Remus",
    Robin = "Robin Hood",
    Trojan = "Trojan Horse",
    Fate = "String of Fate",
    Ulysses = "Ulysses Travels",
    Piper = "Pied Piper",
    Dorado = "El Dorado",
    Race = "The Great Race",
    City = "The Lost City",
    Arthur = "King Arthur",
    Bunyan = "Paul Bunyan",
    Nessie = "Nessie",
    Bermuda = "Bermuda Triangle",
    Lizard = "Lizard Man",
    Midas = "Midas Touch",
    Sasquatch = "Sasquatch",
    Acalica = "Acalica",
    Mulan = "Hua Mulan"
}

export const stickers: Sticker[] = [
    { name: "Little God", album: Album.Thor, star: 1, tradeable: true },
    { name: "Almost There", album: Album.Thor, star: 1, tradeable: true },
    { name: "Asgaror", album: Album.Thor, star: 1, tradeable: true },
    { name: "Mjolnir", album: Album.Thor, star: 1, tradeable: true },
    { name: "God of Thunder", album: Album.Thor, star: 1, tradeable: true },
    { name: "Hold Your Goats", album: Album.Thor, star: 1, tradeable: true },
    { name: "Colossal", album: Album.Thor, star: 1, tradeable: true },
    { name: "Flame Bridge", album: Album.Thor, star: 1, tradeable: true },
    { name: "Norse Adventure", album: Album.Thor, star: 1, tradeable: false },

    { name: "Arrangements", album: Album.Argo, star: 1, tradeable: true },
    { name: "Hero Workout", album: Album.Argo, star: 1, tradeable: true },
    { name: "Hero at Heart", album: Album.Argo, star: 1, tradeable: true },
    { name: "Golden Fleece", album: Album.Argo, star: 1, tradeable: true },
    { name: "Shipwrights", album: Album.Argo, star: 1, tradeable: true },
    { name: "The Argo", album: Album.Argo, star: 1, tradeable: true },
    { name: "Lemnos", album: Album.Argo, star: 1, tradeable: true },
    { name: "Siren Calls", album: Album.Argo, star: 1, tradeable: true },
    { name: "Bronze Giant", album: Album.Argo, star: 1, tradeable: false },

    { name: "Japanese Style", album: Album.Bake, star: 1, tradeable: true },
    { name: "Curious Danuki", album: Album.Bake, star: 1, tradeable: true },
    { name: "Mimics", album: Album.Bake, star: 1, tradeable: true },
    { name: "I'll take it!", album: Album.Bake, star: 1, tradeable: true },
    { name: "Night Chase", album: Album.Bake, star: 1, tradeable: true },
    { name: "Classy Thief", album: Album.Bake, star: 1, tradeable: true },
    { name: "Sweet Home", album: Album.Bake, star: 1, tradeable: true },
    { name: "The Missing Hat", album: Album.Bake, star: 2, tradeable: true },
    { name: "Trickster!", album: Album.Bake, star: 1, tradeable: false },

    { name: "Adrift", album: Album.RR, star: 1, tradeable: true },
    { name: "Lupa Capitolina", album: Album.RR, star: 1, tradeable: true },
    { name: "Wolfie Time", album: Album.RR, star: 1, tradeable: true },
    { name: "In The Woods", album: Album.RR, star: 1, tradeable: true },
    { name: "The Herdsman", album: Album.RR, star: 1, tradeable: true },
    { name: "Golden Seat", album: Album.RR, star: 1, tradeable: true },
    { name: "Bird Gazing", album: Album.RR, star: 2, tradeable: true },
    { name: "King of Rome", album: Album.RR, star: 2, tradeable: true },
    { name: "The Eternal City", album: Album.RR, star: 1, tradeable: false },

    { name: "Major Oak", album: Album.Robin, star: 1, tradeable: true },
    { name: "On Point!", album: Album.Robin, star: 1, tradeable: true },
    { name: "Bullseye", album: Album.Robin, star: 1, tradeable: true },
    { name: "Bad News", album: Album.Robin, star: 1, tradeable: true },
    { name: "Tax Time", album: Album.Robin, star: 1, tradeable: true },
    { name: "Sneaking", album: Album.Robin, star: 2, tradeable: true },
    { name: "Jackpot!", album: Album.Robin, star: 2, tradeable: true },
    { name: "Goodwill", album: Album.Robin, star: 2, tradeable: true },
    { name: "Wedding Bells", album: Album.Robin, star: 1, tradeable: false },

    { name: "Trojan Wall", album: Album.Trojan, star: 1, tradeable: true },
    { name: "Greek Affairs", album: Album.Trojan, star: 1, tradeable: true },
    { name: "Master Plan", album: Album.Trojan, star: 1, tradeable: true },
    { name: "Eureka!", album: Album.Trojan, star: 1, tradeable: true },
    { name: "Team Work", album: Album.Trojan, star: 1, tradeable: true },
    { name: "Troy Story", album: Album.Trojan, star: 2, tradeable: true },
    { name: "Hide & Seek", album: Album.Trojan, star: 2, tradeable: true },
    { name: "Secret Gift", album: Album.Trojan, star: 2, tradeable: true },
    { name: "Surprise!", album: Album.Trojan, star: 2, tradeable: false },

    { name: "What's This", album: Album.Fate, star: 1, tradeable: true },
    { name: "Invisible Fate", album: Album.Fate, star: 1, tradeable: true },
    { name: "True Love", album: Album.Fate, star: 1, tradeable: true },
    { name: "Oh My!", album: Album.Fate, star: 1, tradeable: true },
    { name: "Entwined", album: Album.Fate, star: 2, tradeable: true },
    { name: "Child's Play", album: Album.Fate, star: 2, tradeable: true },
    { name: "Arranged Future", album: Album.Fate, star: 2, tradeable: true },
    { name: "Destiny", album: Album.Fate, star: 2, tradeable: true },
    { name: "Forever Bond", album: Album.Fate, star: 2, tradeable: false },

    { name: "Odyssey Trip", album: Album.Ulysses, star: 1, tradeable: true },
    { name: "Mount Sizzle", album: Album.Ulysses, star: 1, tradeable: true },
    { name: "Looks Comfy", album: Album.Ulysses, star: 1, tradeable: true },
    { name: "I See You", album: Album.Ulysses, star: 1, tradeable: true },
    { name: "Puff God", album: Album.Ulysses, star: 2, tradeable: true },
    { name: "Circe's Farm", album: Album.Ulysses, star: 2, tradeable: true },
    { name: "Shello-o!", album: Album.Ulysses, star: 2, tradeable: true },
    { name: "Ithaca", album: Album.Ulysses, star: 3, tradeable: true },
    { name: "Homecoming", album: Album.Ulysses, star: 2, tradeable: false },

    { name: "Hameline", album: Album.Piper, star: 1, tradeable: true },
    { name: "Mousetache", album: Album.Piper, star: 1, tradeable: true },
    { name: "Rat-Packed!", album: Album.Piper, star: 1, tradeable: true },
    { name: "Furry Problem", album: Album.Piper, star: 2, tradeable: true },
    { name: "Say Squeak!", album: Album.Piper, star: 2, tradeable: true },
    { name: "Blow It!", album: Album.Piper, star: 2, tradeable: true },
    { name: "Recital", album: Album.Piper, star: 3, tradeable: true },
    { name: "Lockstep", album: Album.Piper, star: 3, tradeable: true },
    { name: "Micest Home", album: Album.Piper, star: 2, tradeable: false },

    { name: "Uncharted", album: Album.Dorado, star: 1, tradeable: true },
    { name: "Let's Cruise!", album: Album.Dorado, star: 1, tradeable: true },
    { name: "Set Up Camp", album: Album.Dorado, star: 1, tradeable: true },
    { name: "Who's There?", album: Album.Dorado, star: 2, tradeable: true },
    { name: "Wild Ride", album: Album.Dorado, star: 2, tradeable: true },
    { name: "Lost Temple", album: Album.Dorado, star: 3, tradeable: true },
    { name: "El Dorado", album: Album.Dorado, star: 3, tradeable: true },
    { name: "Tricky Business", album: Album.Dorado, star: 3, tradeable: true },
    { name: "Happy Trading", album: Album.Dorado, star: 3, tradeable: false },

    { name: "On Your Marks", album: Album.Race, star: 1, tradeable: true },
    { name: "Small Fight", album: Album.Race, star: 1, tradeable: true },
    { name: "Almost There", album: Album.Race, star: 2, tradeable: true },
    { name: "A Little Help", album: Album.Race, star: 2, tradeable: true },
    { name: "Hissterical!", album: Album.Race, star: 2, tradeable: true },
    { name: "Choir Work", album: Album.Race, star: 3, tradeable: true },
    { name: "Splashing!", album: Album.Race, star: 3, tradeable: true },
    { name: "Boaring", album: Album.Race, star: 4, tradeable: true },
    { name: "Chinese Zodiac", album: Album.Race, star: 3, tradeable: false },

    { name: "Great Barrier", album: Album.City, star: 1, tradeable: true },
    { name: "Atlantic City", album: Album.City, star: 1, tradeable: true },
    { name: "Poseidon", album: Album.City, star: 2, tradeable: true },
    { name: "Sirens Den", album: Album.City, star: 2, tradeable: true },
    { name: "Sea Secrets", album: Album.City, star: 2, tradeable: true },
    { name: "Seashell Seat", album: Album.City, star: 3, tradeable: true },
    { name: "Coral Castle", album: Album.City, star: 3, tradeable: true },
    { name: "Fin-tastic!", album: Album.City, star: 4, tradeable: true },
    { name: "Dive in!", album: Album.City, star: 3, tradeable: false },

    { name: "Future King", album: Album.Arthur, star: 1, tradeable: true },
    { name: "Wizarding", album: Album.Arthur, star: 2, tradeable: true },
    { name: "Merlin's Test", album: Album.Arthur, star: 2, tradeable: true },
    { name: "Excalibur", album: Album.Arthur, star: 2, tradeable: true },
    { name: "Arturic Crown", album: Album.Arthur, star: 3, tradeable: true },
    { name: "Knight Tale", album: Album.Arthur, star: 3, tradeable: true },
    { name: "Happily Ever After", album: Album.Arthur, star: 4, tradeable: true },
    { name: "Lady of the Lake", album: Album.Arthur, star: 4, tradeable: true },
    { name: "Camelot", album: Album.Arthur, star: 3, tradeable: false },

    { name: "Great Find!", album: Album.Bunyan, star: 1, tradeable: true },
    { name: "Cut It Out", album: Album.Bunyan, star: 2, tradeable: true },
    { name: "A Big Step", album: Album.Bunyan, star: 2, tradeable: true },
    { name: "Grand Bunyan", album: Album.Bunyan, star: 3, tradeable: true },
    { name: "Lumberjack!", album: Album.Bunyan, star: 3, tradeable: true },
    { name: "Nap Time", album: Album.Bunyan, star: 3, tradeable: true },
    { name: "Footprints", album: Album.Bunyan, star: 4, tradeable: true },
    { name: "Hay There!", album: Album.Bunyan, star: 4, tradeable: true },
    { name: "Rock On!", album: Album.Bunyan, star: 4, tradeable: false },

    { name: "Loch Ness", album: Album.Nessie, star: 2, tradeable: true },
    { name: "Reely Good Time", album: Album.Nessie, star: 2, tradeable: true },
    { name: "Magnessiecent", album: Album.Nessie, star: 2, tradeable: true },
    { name: "What's that?", album: Album.Nessie, star: 3, tradeable: true },
    { name: "The Scoop", album: Album.Nessie, star: 3, tradeable: true },
    { name: "Adventure Time", album: Album.Nessie, star: 4, tradeable: true },
    { name: "Gotcha!", album: Album.Nessie, star: 4, tradeable: true },
    { name: "Hello There", album: Album.Nessie, star: 4, tradeable: true },
    { name: "Happiness", album: Album.Nessie, star: 4, tradeable: false },

    { name: "Hearties", album: Album.Bermuda, star: 2, tradeable: true },
    { name: "Blimey!", album: Album.Bermuda, star: 2, tradeable: true },
    { name: "Treasure Hunt", album: Album.Bermuda, star: 3, tradeable: true },
    { name: "Land in Sight!", album: Album.Bermuda, star: 3, tradeable: true },
    { name: "Abandon Ship!", album: Album.Bermuda, star: 4, tradeable: true },
    { name: "Plunderful", album: Album.Bermuda, star: 4, tradeable: true },
    { name: "Coming Ashore", album: Album.Bermuda, star: 4, tradeable: true },
    { name: "Oh My Gems", album: Album.Bermuda, star: 5, tradeable: true },
    { name: "Big Booty", album: Album.Bermuda, star: 4, tradeable: false },

    { name: "In the making", album: Album.Lizard, star: 2, tradeable: true },
    { name: "BOOMerang!", album: Album.Lizard, star: 2, tradeable: true },
    { name: "WOW", album: Album.Lizard, star: 3, tradeable: true },
    { name: "Oopsie!", album: Album.Lizard, star: 3, tradeable: true },
    { name: "Throw and Catch", album: Album.Lizard, star: 4, tradeable: true },
    { name: "Wanted!", album: Album.Lizard, star: 4, tradeable: true },
    { name: "Desert Dust", album: Album.Lizard, star: 5, tradeable: true },
    { name: "Silhouette Night", album: Album.Lizard, star: 5, tradeable: true },
    { name: "Mount Ularu", album: Album.Lizard, star: 4, tradeable: false },

    { name: "Not Good Enough", album: Album.Midas, star: 2, tradeable: true },
    { name: "Small Favour", album: Album.Midas, star: 3, tradeable: true },
    { name: "Golden Wish", album: Album.Midas, star: 3, tradeable: true },
    { name: "Showtime", album: Album.Midas, star: 4, tradeable: true },
    { name: "Midas' Touch", album: Album.Midas, star: 4, tradeable: true },
    { name: "Sleep in Gold", album: Album.Midas, star: 4, tradeable: true },
    { name: "Liquid Gold", album: Album.Midas, star: 5, tradeable: true },
    { name: "Golden Bounty", album: Album.Midas, star: 5, tradeable: true },
    { name: "Frustration", album: Album.Midas, star: 5, tradeable: false },

    { name: "Hairy Baby", album: Album.Sasquatch, star: 3, tradeable: true },
    { name: "Big Toys!", album: Album.Sasquatch, star: 3, tradeable: true },
    { name: "Splashquatch", album: Album.Sasquatch, star: 3, tradeable: true },
    { name: "Stay Curious", album: Album.Sasquatch, star: 4, tradeable: true },
    { name: "Wilderness!", album: Album.Sasquatch, star: 4, tradeable: true },
    { name: "Night Binge", album: Album.Sasquatch, star: 5, tradeable: true },
    { name: "Shake It!", album: Album.Sasquatch, star: 5, tradeable: true },
    { name: "Classy Gift", album: Album.Sasquatch, star: 5, tradeable: true },
    { name: "Good Memories", album: Album.Sasquatch, star: 5, tradeable: false },

    { name: "Fairy Tale", album: Album.Acalica, star: 3, tradeable: true },
    { name: "Enchanting", album: Album.Acalica, star: 3, tradeable: true },
    { name: "Field Study", album: Album.Acalica, star: 4, tradeable: true },
    { name: "Weather-fairy", album: Album.Acalica, star: 4, tradeable: true },
    { name: "Make It Rain", album: Album.Acalica, star: 5, tradeable: true },
    { name: "Superhot", album: Album.Acalica, star: 5, tradeable: true },
    { name: "Not a fan", album: Album.Acalica, star: 5, tradeable: true },
    { name: "Gotcha!", album: Album.Acalica, star: 5, tradeable: true },
    { name: "Discovery", album: Album.Acalica, star: 5, tradeable: false },

    { name: "Duty Calls", album: Album.Mulan, star: 3, tradeable: true },
    { name: "Disguise", album: Album.Mulan, star: 3, tradeable: true },
    { name: "Partners", album: Album.Mulan, star: 4, tradeable: true },
    { name: "Show The Way", album: Album.Mulan, star: 4, tradeable: true },
    { name: "Roger that!", album: Album.Mulan, star: 5, tradeable: true },
    { name: "Lookin' Sharp", album: Album.Mulan, star: 5, tradeable: true },
    { name: "Danger Ahead", album: Album.Mulan, star: 5, tradeable: true },
    { name: "Moment of Truth", album: Album.Mulan, star: 5, tradeable: true },
    { name: "Great Honor", album: Album.Mulan, star: 5, tradeable: false },
];