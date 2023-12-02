export interface Sticker {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean
};

export enum Album {
    Dinner = "Holiday Dinner",
    Party = "Sweater Party",
    Tradition = "Winter Traditions",
    Santa = "Santa's Workshop",
    Feast = "Festive Feasts",
    Dream = "Nutcracker Dreams",
    Home = "Sweet Home",
    Gift = "The Perfect Gift",
    Snow = "Snowed In",
    Bake = "Holiday Bakes",
    Fun = "Outdoor Fun",
    World = "Monopoly World",
}

export const stickers: Sticker[] = [
    { name: "Chop Chop!", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Tree Trimming", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Top it Off", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Cardinal Rule", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Stir the Pot", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Sous Chef", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Table Bling", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Top Dessert", album: Album.Dinner, star: 1, tradeable: true },
    { name: "Comfort & Joy", album: Album.Dinner, star: 1, tradeable: true },

    { name: "Found Photo", album: Album.Party, star: 1, tradeable: true },
    { name: "Memory Lane", album: Album.Party, star: 1, tradeable: true },
    { name: "Yarn Quest", album: Album.Party, star: 1, tradeable: true },
    { name: "New Knits", album: Album.Party, star: 1, tradeable: true },
    { name: "Happy Helper", album: Album.Party, star: 1, tradeable: true },
    { name: "Sweater Party", album: Album.Party, star: 1, tradeable: true },
    { name: "Almost Twinsies", album: Album.Party, star: 1, tradeable: true },
    { name: "So Fly", album: Album.Party, star: 2, tradeable: true },
    { name: "Better Sweater", album: Album.Party, star: 2, tradeable: true },

    { name: "Saint Lucia", album: Album.Tradition, star: 1, tradeable: true },
    { name: "Lantern Fest", album: Album.Tradition, star: 1, tradeable: true },
    { name: "Dongzhi", album: Album.Tradition, star: 1, tradeable: true },
    { name: "Brighton Bonfire", album: Album.Tradition, star: 1, tradeable: true },
    { name: "O Christmas Tree", album: Album.Tradition, star: 1, tradeable: true },
    { name: "Yuzu Bath", album: Album.Tradition, star: 1, tradeable: true },
    { name: "Yalda Night", album: Album.Tradition, star: 2, tradeable: true },
    { name: "Boat Parade", album: Album.Tradition, star: 2, tradeable: true },
    { name: "Pole Flyers", album: Album.Tradition, star: 2, tradeable: true },

    { name: "Santa's List", album: Album.Santa, star: 1, tradeable: true },
    { name: "Elven Gifts", album: Album.Santa, star: 1, tradeable: true },
    { name: "GO Time", album: Album.Santa, star: 1, tradeable: true },
    { name: "Special Reindeer", album: Album.Santa, star: 1, tradeable: true },
    { name: "Moonlight Ride", album: Album.Santa, star: 1, tradeable: true },
    { name: "Rooftop Haul", album: Album.Santa, star: 2, tradeable: true },
    { name: "Cookie Break", album: Album.Santa, star: 2, tradeable: true },
    { name: "Stocking Stuffers", album: Album.Santa, star: 2, tradeable: true },
    { name: "X-mas Morning", album: Album.Santa, star: 3, tradeable: true },

    { name: "Lovely Latkes", album: Album.Feast, star: 1, tradeable: true },
    { name: "7 Fishes", album: Album.Feast, star: 1, tradeable: true },
    { name: "Saffron Buns", album: Album.Feast, star: 1, tradeable: true },
    { name: "Chicken Cheer", album: Album.Feast, star: 2, tradeable: true },
    { name: "Christmas Pudding", album: Album.Feast, star: 2, tradeable: true },
    { name: "Holiday Tamales", album: Album.Feast, star: 2, tradeable: true },
    { name: "Roscon de Reyes", album: Album.Feast, star: 2, tradeable: true },
    { name: "Sweet Cornbread", album: Album.Feast, star: 3, tradeable: true },
    { name: "Biryani Yums", album: Album.Feast, star: 3, tradeable: true },

    { name: "Storytime", album: Album.Dream, star: 1, tradeable: true },
    { name: "Drosselmeyer", album: Album.Dream, star: 1, tradeable: true },
    { name: "Up & Up!", album: Album.Dream, star: 2, tradeable: true },
    { name: "Mouse King", album: Album.Dream, star: 2, tradeable: true },
    { name: "Snow Queen", album: Album.Dream, star: 2, tradeable: true },
    { name: "Sugarplum Fairy", album: Album.Dream, star: 2, tradeable: true },
    { name: "Sweets Feast", album: Album.Dream, star: 3, tradeable: true },
    { name: "Mother Ginger", album: Album.Dream, star: 3, tradeable: true },
    { name: "Farewell", album: Album.Dream, star: 4, tradeable: true },

    { name: "Decor Skills", album: Album.Home, star: 1, tradeable: true },
    { name: "What If", album: Album.Home, star: 2, tradeable: true },
    { name: "Pastry Plans", album: Album.Home, star: 2, tradeable: true },
    { name: "Getting Up", album: Album.Home, star: 2, tradeable: true },
    { name: "Messy Partner", album: Album.Home, star: 3, tradeable: true },
    { name: "Let's Peck!", album: Album.Home, star: 3, tradeable: true },
    { name: "Careful Now", album: Album.Home, star: 3, tradeable: true },
    { name: "Bake It Happen", album: Album.Home, star: 4, tradeable: false },
    { name: "So Proud!", album: Album.Home, star: 5, tradeable: true },

    { name: "Christmas Gifts", album: Album.Gift, star: 2, tradeable: true },
    { name: "Shopping Fever", album: Album.Gift, star: 2, tradeable: true },
    { name: "Suits Me!", album: Album.Gift, star: 3, tradeable: true },
    { name: "Brand New", album: Album.Gift, star: 3, tradeable: true },
    { name: "Pawesome Naps", album: Album.Gift, star: 3, tradeable: true },
    { name: "Treat-o-Clock", album: Album.Gift, star: 4, tradeable: true },
    { name: "Unwrapping", album: Album.Gift, star: 4, tradeable: true },
    { name: "Pile of Goodies", album: Album.Gift, star: 4, tradeable: false },
    { name: "Merry Kissmas", album: Album.Gift, star: 5, tradeable: true },

    { name: "Winter-ful Day", album: Album.Snow, star: 2, tradeable: true },
    { name: "Pajama Party", album: Album.Snow, star: 3, tradeable: true },
    { name: "Light It Up", album: Album.Snow, star: 3, tradeable: true },
    { name: "Gingerly", album: Album.Snow, star: 3, tradeable: true },
    { name: "Christmas Train", album: Album.Snow, star: 4, tradeable: true },
    { name: "Cozied Up", album: Album.Snow, star: 4, tradeable: true },
    { name: "Binge-watching", album: Album.Snow, star: 5, tradeable: true },
    { name: "Scottie's Fort", album: Album.Snow, star: 5, tradeable: true },
    { name: "Game Night!", album: Album.Snow, star: 4, tradeable: false },

    { name: "Modern Kitchen", album: Album.Bake, star: 3, tradeable: true },
    { name: "Bake Off!", album: Album.Bake, star: 3, tradeable: true },
    { name: "Recipe Generator", album: Album.Bake, star: 4, tradeable: true },
    { name: "Twisted!", album: Album.Bake, star: 4, tradeable: true },
    { name: "Jingle Delight", album: Album.Bake, star: 4, tradeable: true },
    { name: "Ginger Peg-E", album: Album.Bake, star: 5, tradeable: true },
    { name: "Roll the Dice", album: Album.Bake, star: 5, tradeable: true },
    { name: "Bite Me!", album: Album.Bake, star: 4, tradeable: false },
    { name: "Sugary Feast", album: Album.Bake, star: 4, tradeable: false },

    { name: "Winter Resort", album: Album.Fun, star: 3, tradeable: true },
    { name: "Working the Poles", album: Album.Fun, star: 3, tradeable: true },
    { name: "Mr Snowman", album: Album.Fun, star: 4, tradeable: true },
    { name: "On the Slopes", album: Album.Fun, star: 4, tradeable: true },
    { name: "Watch Out!", album: Album.Fun, star: 5, tradeable: true },
    { name: "Joyful Snow", album: Album.Fun, star: 5, tradeable: true },
    { name: "Sleigh All Day", album: Album.Fun, star: 4, tradeable: false },
    { name: "Team Work", album: Album.Fun, star: 5, tradeable: false },
    { name: "Well-Deserved Rest", album: Album.Fun, star: 5, tradeable: false },

    { name: "Christmas Park", album: Album.World, star: 3, tradeable: true },
    { name: "All Aboard", album: Album.World, star: 4, tradeable: true },
    { name: "Up & Down", album: Album.World, star: 4, tradeable: true },
    { name: "Spin Around", album: Album.World, star: 5, tradeable: true },
    { name: "GO! Karts", album: Album.World, star: 4, tradeable: false },
    { name: "Santa's Float", album: Album.World, star: 4, tradeable: false },
    { name: "Hang On!", album: Album.World, star: 5, tradeable: false },
    { name: "Tycoon Ride", album: Album.World, star: 5, tradeable: false },
    { name: "Special Order", album: Album.World, star: 5, tradeable: false },
]