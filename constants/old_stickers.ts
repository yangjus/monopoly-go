export interface Sticker {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean
};

export enum Album {
    NY = "New York",
    Tokyo = "Tokyo",
    Venice = "Venice",
    Rio = "Rio",
    LA = "Los Angeles",
    Istanbul = "Istanbul",
    Seoul = "Seoul",
    Rome = "Rome",
    Madrid = "Madrid",
    NZ = "New Zealand",
    Paris = "Paris",
    NO = "New Orleans",
    Bavaria = "Bavaria",
    Vermont = "Vermont",
    Cairo = "Cairo",
    Montreal = "Montreal",
    Marrakesh = "Marrakesh",
    London = "London"
}

export const stickers: Sticker[] = [
    { name: "Sell High", album: Album.NY, star: 1, tradeable: true },
    { name: "Freedom Rings", album: Album.NY, star: 1, tradeable: true },
    { name: "Dijon Delight", album: Album.NY, star: 1, tradeable: true },
    { name: "High Hopes", album: Album.NY, star: 1, tradeable: true },
    { name: "Pepperoni Peril", album: Album.NY, star: 1, tradeable: true },
    { name: "Atlas", album: Album.NY, star: 1, tradeable: true },
    { name: "Chic Boutique", album: Album.NY, star: 1, tradeable: true },
    { name: "Green Oasis", album: Album.NY, star: 1, tradeable: true },
    { name: "Big City Lights", album: Album.NY, star: 1, tradeable: true },

    { name: "Speeding Bullet", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Peaceful Perch", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Sakura Serenity", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Bento Brunch", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Divine Shrine", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Towering Tokyo", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Taiko Tempo", album: Album.Tokyo, star: 1, tradeable: true },
    { name: "Your Biggest Fan", album: Album.Tokyo, star: 2, tradeable: true },
    { name: "GO! With the Flow", album: Album.Tokyo, star: 3, tradeable: true },

    { name: "Dynamic Duet", album: Album.Venice, star: 1, tradeable: true },
    { name: "Doughy Detour", album: Album.Venice, star: 1, tradeable: true },
    { name: "Canal Fowl", album: Album.Venice, star: 1, tradeable: true },
    { name: "Taking Shape", album: Album.Venice, star: 1, tradeable: true },
    { name: "Flyin' Lion", album: Album.Venice, star: 1, tradeable: true },
    { name: "Piazza Panic", album: Album.Venice, star: 1, tradeable: true },
    { name: "Masquerade", album: Album.Venice, star: 2, tradeable: true },
    { name: "Go Go Gondola!", album: Album.Venice, star: 2, tradeable: true },
    { name: "Regal Red Carpet", album: Album.Venice, star: 3, tradeable: true },

    { name: "Sugar Loaf", album: Album.Rio, star: 1, tradeable: true },
    { name: "Fancy Footwork", album: Album.Rio, star: 1, tradeable: true },
    { name: "Deliciousa", album: Album.Rio, star: 1, tradeable: true },
    { name: "Carnival Queen", album: Album.Rio, star: 1, tradeable: true },
    { name: "Step by Step", album: Album.Rio, star: 2, tradeable: true },
    { name: "Just Hangin'", album: Album.Rio, star: 2, tradeable: true },
    { name: "Vibrant Vila", album: Album.Rio, star: 2, tradeable: true },
    { name: "Two Left Feet", album: Album.Rio, star: 2, tradeable: true },
    { name: "Campeoes!", album: Album.Rio, star: 3, tradeable: true },

    { name: "Muscle Beach", album: Album.LA, star: 1, tradeable: true },
    { name: "Beach Day!", album: Album.LA, star: 1, tradeable: true },
    { name: "What In Tarnation?", album: Album.LA, star: 1, tradeable: true },
    { name: "Turning Heads", album: Album.LA, star: 2, tradeable: true },
    { name: "A Star Is Born", album: Album.LA, star: 2, tradeable: true },
    { name: "Birria Hysteria", album: Album.LA, star: 2, tradeable: true },
    { name: "Tubular", album: Album.LA, star: 2, tradeable: true },
    { name: "Posh Pooch", album: Album.LA, star: 3, tradeable: true },
    { name: "Top Tier Pier", album: Album.LA, star: 3, tradeable: true },

    { name: "Steamy Ritual", album: Album.Istanbul, star: 1, tradeable: true },
    { name: "Hustle & Bustle", album: Album.Istanbul, star: 1, tradeable: true },
    { name: "Turkish Delight", album: Album.Istanbul, star: 1, tradeable: true },
    { name: "Sultan Dream", album: Album.Istanbul, star: 1, tradeable: true },
    { name: "Going Up!", album: Album.Istanbul, star: 2, tradeable: true },
    { name: "Sancta Sapientia", album: Album.Istanbul, star: 2, tradeable: true },
    { name: "Meze Platter", album: Album.Istanbul, star: 2, tradeable: true },
    { name: "Cotton Castle", album: Album.Istanbul, star: 2, tradeable: true },
    { name: "Feline Good", album: Album.Istanbul, star: 4, tradeable: true },

    { name: "Glow Hunt", album: Album.Seoul, star: 1, tradeable: true },
    { name: "Fort Night", album: Album.Seoul, star: 1, tradeable: true },
    { name: "Virtual Bias", album: Album.Seoul, star: 1, tradeable: true },
    { name: "Wave Hall", album: Album.Seoul, star: 2, tradeable: true },
    { name: "Tigris Land", album: Album.Seoul, star: 2, tradeable: true },
    { name: "Incredibowl", album: Album.Seoul, star: 2, tradeable: true },
    { name: "Gangnam Neons", album: Album.Seoul, star: 3, tradeable: true },
    { name: "Mix it up!", album: Album.Seoul, star: 3, tradeable: true },
    { name: "Dressed in Silk", album: Album.Seoul, star: 4, tradeable: true },

    { name: "Make a Wish", album: Album.Rome, star: 1, tradeable: true },
    { name: "Truth or dare", album: Album.Rome, star: 1, tradeable: true },
    { name: "SPQR", album: Album.Rome, star: 1, tradeable: true },
    { name: "Seas the day!", album: Album.Rome, star: 2, tradeable: true },
    { name: "Cin cin!", album: Album.Rome, star: 2, tradeable: true },
    { name: "Eye of Rome", album: Album.Rome, star: 2, tradeable: true },
    { name: "Mint to be", album: Album.Rome, star: 3, tradeable: true },
    { name: "Fun on wheels", album: Album.Rome, star: 4, tradeable: true },
    { name: "L'eleganza", album: Album.Rome, star: 4, tradeable: false },

    { name: "Looking Glassy", album: Album.Madrid, star: 1, tradeable: true },
    { name: "Beary Best", album: Album.Madrid, star: 1, tradeable: true },
    { name: "Ole!", album: Album.Madrid, star: 2, tradeable: true },
    { name: "Calamari Attack", album: Album.Madrid, star: 2, tradeable: true },
    { name: "Football Heaven", album: Album.Madrid, star: 2, tradeable: true },
    { name: "Bring the Tapas", album: Album.Madrid, star: 3, tradeable: true },
    { name: "Just Wing It", album: Album.Madrid, star: 3, tradeable: true },
    { name: "The Classics", album: Album.Madrid, star: 4, tradeable: true },
    { name: "Canoe For Two", album: Album.Madrid, star: 4, tradeable: false },

    { name: "Red Lift", album: Album.NZ, star: 1, tradeable: true },
    { name: "Spotted!", album: Album.NZ, star: 2, tradeable: true },
    { name: "Place to Be", album: Album.NZ, star: 2, tradeable: true },
    { name: "Ka Mate! Ka ora!", album: Album.NZ, star: 2, tradeable: true },
    { name: "Point & Click", album: Album.NZ, star: 3, tradeable: true },
    { name: "Jam Sesh", album: Album.NZ, star: 3, tradeable: true },
    { name: "Sealebrities", album: Album.NZ, star: 4, tradeable: true },
    { name: "Nice try!", album: Album.NZ, star: 4, tradeable: false },
    { name: "Wharf Jumping", album: Album.NZ, star: 5, tradeable: true },

    { name: "The Iron Lady", album: Album.Paris, star: 2, tradeable: true },
    { name: "Seine-sational", album: Album.Paris, star: 2, tradeable: true },
    { name: "Matching game", album: Album.Paris, star: 2, tradeable: true },
    { name: "Let's Gogh!", album: Album.Paris, star: 3, tradeable: true },
    { name: "Pantomime", album: Album.Paris, star: 3, tradeable: true },
    { name: "Bonjour coffee", album: Album.Paris, star: 3, tradeable: true },
    { name: "Bake it happen", album: Album.Paris, star: 4, tradeable: true },
    { name: "La vie en clothes", album: Album.Paris, star: 4, tradeable: false },
    { name: "Summer Picnic", album: Album.Paris, star: 5, tradeable: true },

    { name: "Creole Cottage", album: Album.NO, star: 2, tradeable: true },
    { name: "On Parade", album: Album.NO, star: 2, tradeable: true },
    { name: "Marching In", album: Album.NO, star: 3, tradeable: true },
    { name: "All That Jazz", album: Album.NO, star: 3, tradeable: true },
    { name: "The King Cake", album: Album.NO, star: 3, tradeable: true },
    { name: "Bayou Banquet", album: Album.NO, star: 4, tradeable: true },
    { name: "River Queen", album: Album.NO, star: 4, tradeable: false },
    { name: "Miss Marigny", album: Album.NO, star: 5, tradeable: true },
    { name: "Ghostly Gator", album: Album.NO, star: 5, tradeable: true },

    { name: "Round the Maypole", album: Album.Bavaria, star: 2, tradeable: true },
    { name: "Spring Feast", album: Album.Bavaria, star: 3, tradeable: true },
    { name: "Portly Pretzel", album: Album.Bavaria, star: 3, tradeable: true },
    { name: "Alphorn Magic", album: Album.Bavaria, star: 3, tradeable: true },
    { name: "Poocherhosen", album: Album.Bavaria, star: 4, tradeable: true },
    { name: "Lebkuchen Lovers", album: Album.Bavaria, star: 4, tradeable: false },
    { name: "Bovine Beauty", album: Album.Bavaria, star: 5, tradeable: true },
    { name: "Polka Party", album: Album.Bavaria, star: 5, tradeable: true },
    { name: "Volksfest", album: Album.Bavaria, star: 5, tradeable: false },

    { name: "The Old Mill", album: Album.Vermont, star: 3, tradeable: true },
    { name: "Sweater Weather", album: Album.Vermont, star: 3, tradeable: true },
    { name: "Bushel Bounty", album: Album.Vermont, star: 3, tradeable: true },
    { name: "Impressive Press", album: Album.Vermont, star: 4, tradeable: true },
    { name: "Entrepreneurs", album: Album.Vermont, star: 4, tradeable: false },
    { name: "Snap Apple", album: Album.Vermont, star: 5, tradeable: true },
    { name: "Ripe Choice", album: Album.Vermont, star: 5, tradeable: true },
    { name: "Fat Stacks", album: Album.Vermont, star: 5, tradeable: false },
    { name: "Uncover Vermont", album: Album.Vermont, star: 5, tradeable: false },

    { name: "Giza Greatness", album: Album.Cairo, star: 3, tradeable: true },
    { name: "Ancient History", album: Album.Cairo, star: 3, tradeable: true },
    { name: "Cairoglyphics", album: Album.Cairo, star: 4, tradeable: true },
    { name: "Koshary", album: Album.Cairo, star: 4, tradeable: false },
    { name: "Dive In", album: Album.Cairo, star: 5, tradeable: true },
    { name: "Gotta Scoot!", album: Album.Cairo, star: 5, tradeable: true },
    { name: "A Spicy Sale", album: Album.Cairo, star: 5, tradeable: false },
    { name: "Comet Cab", album: Album.Cairo, star: 5, tradeable: false },
    { name: "Cat Nap", album: Album.Cairo, star: 5, tradeable: false },

    { name: "Joyride", album: Album.Montreal, star: 3, tradeable: true },
    { name: "Doughlicious", album: Album.Montreal, star: 4, tradeable: true },
    { name: "Tough Crowd", album: Album.Montreal, star: 4, tradeable: false },
    { name: "Good Gravy", album: Album.Montreal, star: 4, tradeable: false },
    { name: "Get Your Toboggan", album: Album.Montreal, star: 5, tradeable: true },
    { name: "Slap Shot", album: Album.Montreal, star: 5, tradeable: true },
    { name: "The Wheel Deal", album: Album.Montreal, star: 5, tradeable: false },
    { name: "Hundred Steeples", album: Album.Montreal, star: 5, tradeable: false },
    { name: "Plaid Chad", album: Album.Montreal, star: 5, tradeable: false },

    { name: "Spice It Up", album: Album.Marrakesh, star: 3, tradeable: true },
    { name: "Prized Piggy", album: Album.Marrakesh, star: 4, tradeable: true },
    { name: "Kitty Kindness", album: Album.Marrakesh, star: 4, tradeable: false },
    { name: "Desert Dozing", album: Album.Marrakesh, star: 4, tradeable: false },
    { name: "Very Charming", album: Album.Marrakesh, star: 5, tradeable: true },
    { name: "Radiant Riad", album: Album.Marrakesh, star: 5, tradeable: true },
    { name: "Moroccan Mint", album: Album.Marrakesh, star: 5, tradeable: false },
    { name: "Bab Agnaou", album: Album.Marrakesh, star: 5, tradeable: false },
    { name: "Woven Wonders", album: Album.Marrakesh, star: 5, tradeable: false },

    { name: "Tea Time", album: Album.London, star: 4, tradeable: true },
    { name: "On Guard", album: Album.London, star: 4, tradeable: true },
    { name: "Fish & Chips", album: Album.London, star: 4, tradeable: false },
    { name: "Leg It!", album: Album.London, star: 4, tradeable: false },
    { name: "Phone Home", album: Album.London, star: 5, tradeable: true },
    { name: "London Lookout", album: Album.London, star: 5, tradeable: false },
    { name: "Double Decker", album: Album.London, star: 5, tradeable: false },
    { name: "A Real Circus", album: Album.London, star: 5, tradeable: false },
    { name: "Bigger Ben", album: Album.London, star: 5, tradeable: false },
];