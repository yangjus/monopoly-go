export interface Sticker {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean
};

export enum Album {
    Meadow = "Midsummer Meadows",
    Marsh = "Marvelous Marshes",
    Bayou = "Beautiful Bayou",
    Mountain = "Guilded Mountains",
    Farm = "Thimble Farms",
    Paradise = "Birds of Paradise",
    Corral = "Coral Corral",
    Sand = "Searing Sands",
    Promenade = "Petal Promenade",
    Forest = "Fabled Forest",
    BC = "70 Million BC",
    Reptile = "Rachels Reptiles",
    Puppy = "Puppy Party",
    Cafe = "Cat Cafe",
    Outback = "Australian Outback",
    Safari = "On Safari",
    Bamboo = "Bamboo Forest",
    Abode = "Icy Abodes",
    Land = "Iberian Lands",
    Water = "Crossing Waters",
    Dock = "Down by the Docks"
}

export const stickers: Sticker[] = [
    { name: "Field Trip", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Prarie Dog Kiss", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Dig In", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Dear Deer", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Run for It", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Nest Egg", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Kitten Cuddles", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Sleeping In", album: Album.Meadow, star: 1, tradeable: true },
    { name: "Butterfly Feels", album: Album.Meadow, star: 1, tradeable: true },

    { name: "Eco Cleanup", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Cattail & Mouse", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Dirty Work", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Busy Beavers", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Boo!", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Swan Lake", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Pups at Play", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Marsh Lily", album: Album.Marsh, star: 1, tradeable: true },
    { name: "Job Well Done", album: Album.Marsh, star: 1, tradeable: true },

    { name: "Firefly Flicker", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Feelin' Froggy", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Egret Elegance", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Peek-a-Boo", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Beignet Bandit", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Regal Eagle", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Playful Piggies", album: Album.Bayou, star: 1, tradeable: true },
    { name: "Gator Glimpse", album: Album.Bayou, star: 2, tradeable: true },
    { name: "Supper Stealer", album: Album.Bayou, star: 2, tradeable: true },

    { name: "Take a Hike", album: Album.Mountain, star: 1, tradeable: true },
    { name: "Honey Bear", album: Album.Mountain, star: 1, tradeable: true },
    { name: "Timber!", album: Album.Mountain, star: 1, tradeable: true },
    { name: "Gone Fishin'", album: Album.Mountain, star: 1, tradeable: true },
    { name: "On the Rocks", album: Album.Mountain, star: 1, tradeable: true },
    { name: "Cat Burglar", album: Album.Mountain, star: 1, tradeable: true },
    { name: "Pika Chew", album: Album.Mountain, star: 2, tradeable: true },
    { name: "White Wolf", album: Album.Mountain, star: 2, tradeable: true },
    { name: "Cottontails", album: Album.Mountain, star: 2, tradeable: true },

    { name: "Out of Milk!", album: Album.Farm, star: 1, tradeable: true },
    { name: "Hay Day", album: Album.Farm, star: 1, tradeable: true },
    { name: "Golden Eggs", album: Album.Farm, star: 1, tradeable: true },
    { name: "Happy Family", album: Album.Farm, star: 1, tradeable: true },
    { name: "Squee!", album: Album.Farm, star: 1, tradeable: true },
    { name: "Fresh Picks", album: Album.Farm, star: 2, tradeable: true },
    { name: "Giddyup", album: Album.Farm, star: 2, tradeable: true },
    { name: "The Source", album: Album.Farm, star: 2, tradeable: true },
    { name: "Farm to Table", album: Album.Farm, star: 3, tradeable: true },

    { name: "One to Watch", album: Album.Paradise, star: 1, tradeable: true },
    { name: "Parakeet Peek", album: Album.Paradise, star: 1, tradeable: true },
    { name: "Parrot Surprise", album: Album.Paradise, star: 1, tradeable: true },
    { name: "I Spy", album: Album.Paradise, star: 1, tradeable: true },
    { name: "Honeycreeper", album: Album.Paradise, star: 1, tradeable: true },
    { name: "Motmot", album: Album.Paradise, star: 2, tradeable: true },
    { name: "Scarlet Macaw", album: Album.Paradise, star: 2, tradeable: true },
    { name: "Spoonbill Splash", album: Album.Paradise, star: 2, tradeable: true },
    { name: "It Takes Toucan", album: Album.Paradise, star: 3, tradeable: true },

    { name: "Treasure Hunt", album: Album.Corral, star: 1, tradeable: true },
    { name: "Manta Baby", album: Album.Corral, star: 1, tradeable: true },
    { name: "X Marks the Spot", album: Album.Corral, star: 1, tradeable: true },
    { name: "Maori Wrasse", album: Album.Corral, star: 1, tradeable: true },
    { name: "Crab to Fab", album: Album.Corral, star: 2, tradeable: true },
    { name: "Turtle Treasure", album: Album.Corral, star: 2, tradeable: true },
    { name: "Clamtastic", album: Album.Corral, star: 2, tradeable: true },
    { name: "Clownfish Frenzy", album: Album.Corral, star: 3, tradeable: true },
    { name: "Whale's Leap", album: Album.Corral, star: 3, tradeable: true },

    { name: "Desert Daze", album: Album.Sand, star: 1, tradeable: true },
    { name: "Sunny Scales", album: Album.Sand, star: 1, tradeable: true },
    { name: "Photogenic Fennec", album: Album.Sand, star: 1, tradeable: true },
    { name: "Snapshots & Spots", album: Album.Sand, star: 1, tradeable: true },
    { name: "Hydrate, mate!", album: Album.Sand, star: 2, tradeable: true },
    { name: "Spiky Perch", album: Album.Sand, star: 2, tradeable: true },
    { name: "Hello There", album: Album.Sand, star: 2, tradeable: true },
    { name: "Crocodile Pile", album: Album.Sand, star: 3, tradeable: true },
    { name: "The Day is Dune", album: Album.Sand, star: 3, tradeable: true },

    { name: "Doggie Day", album: Album.Promenade, star: 1, tradeable: true },
    { name: "Cocoon Bloom", album: Album.Promenade, star: 1, tradeable: true },
    { name: "Ladybug Lark", album: Album.Promenade, star: 1, tradeable: true },
    { name: "Beelightful", album: Album.Promenade, star: 2, tradeable: true },
    { name: "Stick Trick", album: Album.Promenade, star: 2, tradeable: true },
    { name: "Pretty Pattern", album: Album.Promenade, star: 2, tradeable: true },
    { name: "Shiny, Not Tiny", album: Album.Promenade, star: 3, tradeable: true },
    { name: "Monarch Mania", album: Album.Promenade, star: 3, tradeable: true },
    { name: "On The Nose", album: Album.Promenade, star: 3, tradeable: true },

    { name: "Story Time", album: Album.Forest, star: 1, tradeable: true },
    { name: "Rainbow Ride", album: Album.Forest, star: 1, tradeable: true },
    { name: "Fire Flight", album: Album.Forest, star: 2, tradeable: true },
    { name: "Gryphon Guard", album: Album.Forest, star: 2, tradeable: true },
    { name: "Lightly Toasted", album: Album.Forest, star: 2, tradeable: true },
    { name: "Nessie Sighting", album: Album.Forest, star: 3, tradeable: true },
    { name: "Cephalopod Pal", album: Album.Forest, star: 3, tradeable: true },
    { name: "Jackalope", album: Album.Forest, star: 3, tradeable: true },
    { name: "Pet Pegasus", album: Album.Forest, star: 4, tradeable: true },

    { name: "Way Back When", album: Album.BC, star: 1, tradeable: true },
    { name: "Gentle Giants", album: Album.BC, star: 1, tradeable: true },
    { name: "Plate Mates", album: Album.BC, star: 2, tradeable: true },
    { name: "Trice As Nice", album: Album.BC, star: 2, tradeable: true },
    { name: "Pterrofying!", album: Album.BC, star: 2, tradeable: true },
    { name: "Silly Smilodon", album: Album.BC, star: 3, tradeable: true },
    { name: "T Toddler", album: Album.BC, star: 3, tradeable: true },
    { name: "Mama Mammoth", album: Album.BC, star: 4, tradeable: true },
    { name: "Once Upon A Time", album: Album.BC, star: 4, tradeable: true },

    { name: "Pet Shop Parley", album: Album.Reptile, star: 1, tradeable: true },
    { name: "Swell Shell", album: Album.Reptile, star: 2, tradeable: true },
    { name: "Scaly Scarf", album: Album.Reptile, star: 2, tradeable: true },
    { name: "From The Gecko", album: Album.Reptile, star: 2, tradeable: true },
    { name: "Lizard Lid", album: Album.Reptile, star: 3, tradeable: true },
    { name: "A Closer Look", album: Album.Reptile, star: 3, tradeable: true },
    { name: "Blending In", album: Album.Reptile, star: 3, tradeable: true },
    { name: "C'mon, Caiman!", album: Album.Reptile, star: 4, tradeable: true },
    { name: "New Best Friend", album: Album.Reptile, star: 4, tradeable: false },

    { name: "Birthday Good Boy", album: Album.Puppy, star: 2, tradeable: true },
    { name: "Perfectly Pugly", album: Album.Puppy, star: 2, tradeable: true },
    { name: "Pawty Animal", album: Album.Puppy, star: 2, tradeable: true },
    { name: "Bonafide Treat", album: Album.Puppy, star: 3, tradeable: true },
    { name: "Point The Way!", album: Album.Puppy, star: 3, tradeable: true },
    { name: "Bulldog Balloons", album: Album.Puppy, star: 3, tradeable: true },
    { name: "Nosy Posy", album: Album.Puppy, star: 4, tradeable: true },
    { name: "A Bit Ambitious", album: Album.Puppy, star: 4, tradeable: true },
    { name: "Dog Tired", album: Album.Puppy, star: 4, tradeable: false },

    { name: "Catfe", album: Album.Cafe, star: 2, tradeable: true },
    { name: "Kitty n' Coffee", album: Album.Cafe, star: 2, tradeable: true },
    { name: "Whisker Basket", album: Album.Cafe, star: 3, tradeable: true },
    { name: "Meow Open!", album: Album.Cafe, star: 3, tradeable: true },
    { name: "Cool Cat", album: Album.Cafe, star: 3, tradeable: true },
    { name: "Cat-Like Reflexes", album: Album.Cafe, star: 4, tradeable: true },
    { name: "Purrfect Fit", album: Album.Cafe, star: 4, tradeable: true },
    { name: "Miss Priss", album: Album.Cafe, star: 4, tradeable: false },
    { name: "Right At Home", album: Album.Cafe, star: 5, tradeable: true },

    { name: "Koala Craze", album: Album.Outback, star: 2, tradeable: true },
    { name: "Plane Ride", album: Album.Outback, star: 2, tradeable: true },
    { name: "Wildlife Tour", album: Album.Outback, star: 3, tradeable: true },
    { name: "Quokkamole", album: Album.Outback, star: 3, tradeable: true },
    { name: "Roo'ting for you", album: Album.Outback, star: 4, tradeable: true },
    { name: "Sugar High", album: Album.Outback, star: 4, tradeable: true },
    { name: "Splatypus!", album: Album.Outback, star: 4, tradeable: false },
    { name: "Merry Cassowary", album: Album.Outback, star: 5, tradeable: true },
    { name: "Say cuddle!", album: Album.Outback, star: 5, tradeable: true },

    { name: "Adventure Awaits", album: Album.Safari, star: 2, tradeable: true },
    { name: "King In Repose", album: Album.Safari, star: 3, tradeable: true },
    { name: "Head in the Sand", album: Album.Safari, star: 3, tradeable: true },
    { name: "Floppy Ears", album: Album.Safari, star: 4, tradeable: true },
    { name: "Mud Bath", album: Album.Safari, star: 4, tradeable: true },
    { name: "A Tall Order", album: Album.Safari, star: 4, tradeable: false },
    { name: "Graceful Grazing", album: Album.Safari, star: 4, tradeable: false },
    { name: "I'm All Ears", album: Album.Safari, star: 5, tradeable: true },
    { name: "Treasured Memories", album: Album.Safari, star: 5, tradeable: false },

    { name: "A Ride Home", album: Album.Bamboo, star: 2, tradeable: true },
    { name: "Pandastic!", album: Album.Bamboo, star: 3, tradeable: true },
    { name: "Nosy buddy", album: Album.Bamboo, star: 3, tradeable: true },
    { name: "Golden snack", album: Album.Bamboo, star: 4, tradeable: true },
    { name: "All Good", album: Album.Bamboo, star: 4, tradeable: false },
    { name: "Make it rain", album: Album.Bamboo, star: 4, tradeable: false },
    { name: "Hang in there", album: Album.Bamboo, star: 5, tradeable: true },
    { name: "Magni-pheasant", album: Album.Bamboo, star: 5, tradeable: true },
    { name: "Bath time", album: Album.Bamboo, star: 5, tradeable: false },

    { name: "Ice Research", album: Album.Abode, star: 2, tradeable: true },
    { name: "Fox and the Bound", album: Album.Abode, star: 3, tradeable: true },
    { name: "LOWL!", album: Album.Abode, star: 4, tradeable: true },
    { name: "Coolest Dad", album: Album.Abode, star: 4, tradeable: true },
    { name: "Hare Care", album: Album.Abode, star: 4, tradeable: false },
    { name: "Mama's boy", album: Album.Abode, star: 4, tradeable: false },
    { name: "Marine Model", album: Album.Abode, star: 5, tradeable: true },
    { name: "Icy Unicorn", album: Album.Abode, star: 5, tradeable: true },
    { name: "Seal of Approval", album: Album.Abode, star: 5, tradeable: false },

    { name: "The Missing Lynx", album: Album.Land, star: 3, tradeable: true },
    { name: "First Steps", album: Album.Land, star: 3, tradeable: true },
    { name: "Leaf it to me", album: Album.Land, star: 4, tradeable: true },
    { name: "Paws up!", album: Album.Land, star: 4, tradeable: true },
    { name: "Think Mink", album: Album.Land, star: 4, tradeable: false },
    { name: "Howly cubs", album: Album.Land, star: 5, tradeable: true },
    { name: "Preening Time", album: Album.Land, star: 5, tradeable: true },
    { name: "Feeling goat!", album: Album.Land, star: 5, tradeable: false },
    { name: "Don't Even Blynx", album: Album.Land, star: 5, tradeable: false },

    { name: "Amazing Amazon", album: Album.Water, star: 3, tradeable: true },
    { name: "Happybara", album: Album.Water, star: 3, tradeable: true },
    { name: "Spot on", album: Album.Water, star: 4, tradeable: true },
    { name: "Brisk Basilisk", album: Album.Water, star: 4, tradeable: false },
    { name: "Feeling knotty", album: Album.Water, star: 4, tradeable: false },
    { name: "Pickpocket", album: Album.Water, star: 5, tradeable: true },
    { name: "Flippin' couple", album: Album.Water, star: 5, tradeable: true },
    { name: "Sniffing around", album: Album.Water, star: 5, tradeable: false },
    { name: "The Last Grail", album: Album.Water, star: 5, tradeable: false },

    { name: "Day at the dock", album: Album.Dock, star: 3, tradeable: true },
    { name: "Post it!", album: Album.Dock, star: 4, tradeable: true },
    { name: "Pride Stride", album: Album.Dock, star: 4, tradeable: true },
    { name: "Sea you later", album: Album.Dock, star: 4, tradeable: false },
    { name: "Pawofficer", album: Album.Dock, star: 4, tradeable: false },
    { name: "Bottlenose Bud", album: Album.Dock, star: 5, tradeable: true },
    { name: "Lion Around", album: Album.Dock, star: 5, tradeable: true },
    { name: "Sticky Fingers", album: Album.Dock, star: 5, tradeable: false },
    { name: "Open Seas", album: Album.Dock, star: 5, tradeable: false },
];