export enum Role{
    ADMIN="ADMIN",
    AUTHOR="AUTHOR",
    USER="USER",
    GUEST="GUEST"
}
export interface Movie{
    id:number,
    title:string,
    synopsis:string,
    runtime:number,
    release_date:Date,
    release_type:string,
    classification:string,
    collection_name:string,
    age_rating:string,
    trailer_url:string,
    banner_url:string,
    poster_url:string,
    ott_url:string,
    ott_platform:string
    country:string,
    created_at:Date
}
export interface MovieDetails {
  title: string
  synopsis: string | null
  runtime: number | null
  release_date: Date | null
  release_type: string | null
  classification: string | null
  collection_name: string | null
  age_rating: string
  trailer_url: string | null
  banner_url: string
  poster_url: string
  ott_url: string | null
  ott_platform: string | null
  country: string
  created_at: Date
}
export interface Articles{
  article_id: number
  author_id: number
  article_title:string
  user: User
  movie_id: number | null
  movie: Movie | null

  cover_url: string
  status: Approval
  content: string
  created_at: Date
  updated_at: Date
  published_at: Date | null
  comments: comments[]
}
enum Approval{
  APPROVED,
  DENIED,
  PROCESSING
}
export interface comments{
    comment_id  :string,
  user_id : string,
  user :User,
  comment_text :string,
  created_at: Date,
  article_id :string,
  article:Articles
}
export type User = {
  id?: number
  name: string
  email: string
  image: string | null
  role?: string
  username?: string | null
  is_active?: boolean
  google_id?: string
}
export type AppUser = {
  id?: number
  name: string
  email: string
  image: string | null
  role?: string
  username?: string | null
  is_active?: boolean
  google_id?: string
}
export enum Genre_Name {
  ACTION = "ACTION",
  ADVENTURE = "ADVENTURE",
  MARTIAL_ARTS = "MARTIAL_ARTS",
  SUPERHERO = "SUPERHERO",
  SPY = "SPY",
  HEIST = "HEIST",
  SURVIVAL = "SURVIVAL",
  DISASTER = "DISASTER",
  MILITARY = "MILITARY",
  MERCENARY = "MERCENARY",
  BOUNTY_HUNTER = "BOUNTY_HUNTER",

  THRILLER = "THRILLER",
  PSYCHOLOGICAL = "PSYCHOLOGICAL",
  MYSTERY = "MYSTERY",
  CRIME = "CRIME",
  NOIR = "NOIR",
  TRUE_CRIME = "TRUE_CRIME",
  CONSPIRACY = "CONSPIRACY",
  LEGAL = "LEGAL",
  DETECTIVE = "DETECTIVE",
  WHODUNIT = "WHODUNIT",

  HORROR = "HORROR",
  SLASHER = "SLASHER",
  SUPERNATURAL = "SUPERNATURAL",
  PARANORMAL = "PARANORMAL",
  CREATURE_FEATURE = "CREATURE_FEATURE",
  ZOMBIE = "ZOMBIE",
  VAMPIRE = "VAMPIRE",
  WEREWOLF = "WEREWOLF",
  FOLK_HORROR = "FOLK_HORROR",
  BODY_HORROR = "BODY_HORROR",
  FOUND_FOOTAGE = "FOUND_FOOTAGE",
  COSMIC_HORROR = "COSMIC_HORROR",
  GOTHIC = "GOTHIC",
  HAUNTED_HOUSE = "HAUNTED_HOUSE",

  DRAMA = "DRAMA",
  ROMANCE = "ROMANCE",
  HISTORICAL = "HISTORICAL",
  BIOGRAPHICAL = "BIOGRAPHICAL",
  POLITICAL = "POLITICAL",
  WAR = "WAR",
  MEDICAL = "MEDICAL",
  LEGAL_DRAMA = "LEGAL_DRAMA",
  FAMILY_DRAMA = "FAMILY_DRAMA",
  SOCIAL = "SOCIAL",
  COMING_OF_AGE = "COMING_OF_AGE",
  TRAGEDY = "TRAGEDY",
  MELODRAMA = "MELODRAMA",
  PERIOD_DRAMA = "PERIOD_DRAMA",

  COMEDY = "COMEDY",
  DARK_COMEDY = "DARK_COMEDY",
  ROMANTIC_COMEDY = "ROMANTIC_COMEDY",
  PARODY = "PARODY",
  SATIRE = "SATIRE",
  SLAPSTICK = "SLAPSTICK",
  MOCKUMENTARY = "MOCKUMENTARY",
  STAND_UP = "STAND_UP",
  SKETCH = "SKETCH",

  SCIENCE_FICTION = "SCIENCE_FICTION",
  CYBERPUNK = "CYBERPUNK",
  STEAMPUNK = "STEAMPUNK",
  DYSTOPIAN = "DYSTOPIAN",
  UTOPIAN = "UTOPIAN",
  POST_APOCALYPTIC = "POST_APOCALYPTIC",
  TIME_TRAVEL = "TIME_TRAVEL",
  SPACE_OPERA = "SPACE_OPERA",
  ALIEN = "ALIEN",
  BIOPUNK = "BIOPUNK",
  SOLARPUNK = "SOLARPUNK",
  HARD_SCIFI = "HARD_SCIFI",
  SOFT_SCIFI = "SOFT_SCIFI",
  MECHA = "MECHA",

  FANTASY = "FANTASY",
  HIGH_FANTASY = "HIGH_FANTASY",
  LOW_FANTASY = "LOW_FANTASY",
  DARK_FANTASY = "DARK_FANTASY",
  URBAN_FANTASY = "URBAN_FANTASY",
  EPIC_FANTASY = "EPIC_FANTASY",
  FAIRY_TALE = "FAIRY_TALE",
  MYTHOLOGY = "MYTHOLOGY",
  SWORD_AND_SORCERY = "SWORD_AND_SORCERY",
  PORTAL_FANTASY = "PORTAL_FANTASY",
  ISEKAI = "ISEKAI",
  CULTIVATION = "CULTIVATION",
  WUXIA = "WUXIA",
  XIANXIA = "XIANXIA",

  ANIMATION = "ANIMATION",
  STOP_MOTION = "STOP_MOTION",
  CGI = "CGI",

  SHONEN = "SHONEN",
  SHOJO = "SHOJO",
  SEINEN = "SEINEN",
  JOSEI = "JOSEI",
  KODOMOMUKE = "KODOMOMUKE",

  SLICE_OF_LIFE = "SLICE_OF_LIFE",
  ISEKAI_REINCARNATION = "ISEKAI_REINCARNATION",
  MAGICAL_GIRL = "MAGICAL_GIRL",
  SCHOOL = "SCHOOL",
  HAREM = "HAREM",
  REVERSE_HAREM = "REVERSE_HAREM",
  ECCHI = "ECCHI",
  SPORTS_ANIME = "SPORTS_ANIME",
  MUSIC_ANIME = "MUSIC_ANIME",
  COOKING_ANIME = "COOKING_ANIME",
  GAME_ANIME = "GAME_ANIME",
  IDOL_ANIME = "IDOL_ANIME",
  VILLAINESS = "VILLAINESS",
  ISEKAI_VILLAINESS = "ISEKAI_VILLAINESS",
  DEMON_SLAYER_TYPE = "DEMON_SLAYER_TYPE",
  MOE = "MOE",
  IYASHIKEI = "IYASHIKEI",
  BATTLE_SHONEN = "BATTLE_SHONEN",
  POWER_FANTASY = "POWER_FANTASY",
  REVERSE_ISEKAI = "REVERSE_ISEKAI",
  OTOME_GAME = "OTOME_GAME",
  DUNGEON = "DUNGEON",
  VIRTUAL_REALITY = "VIRTUAL_REALITY",
  CARD_GAME = "CARD_GAME",
  TOURNAMENT = "TOURNAMENT",
  ALCHEMY = "ALCHEMY",
  NINJA = "NINJA",
  SAMURAI = "SAMURAI",
  PIRATE = "PIRATE",
  SPACE_ANIME = "SPACE_ANIME",
  PSYCHOLOGICAL_ANIME = "PSYCHOLOGICAL_ANIME",
  HORROR_ANIME = "HORROR_ANIME",
  ROMANCE_ANIME = "ROMANCE_ANIME",
  DRAMA_ANIME = "DRAMA_ANIME",
  COMEDY_ANIME = "COMEDY_ANIME",
  CRIME_ANIME = "CRIME_ANIME",
  SUPERNATURAL_ANIME = "SUPERNATURAL_ANIME",
  HISTORICAL_ANIME = "HISTORICAL_ANIME",
  SCI_FI_ANIME = "SCI_FI_ANIME",
  DONGHUA = "DONGHUA",

  PROCEDURAL = "PROCEDURAL",
  ANTHOLOGY = "ANTHOLOGY",
  MINI_SERIES = "MINI_SERIES",
  SOAP_OPERA = "SOAP_OPERA",
  TELENOVELA = "TELENOVELA",
  REALITY = "REALITY",
  TALK_SHOW = "TALK_SHOW",
  GAME_SHOW = "GAME_SHOW",
  NEWS = "NEWS",
  DOCUSERIES = "DOCUSERIES",
  LIMITED_SERIES = "LIMITED_SERIES",
  WEBSERIES = "WEBSERIES",

  DOCUMENTARY = "DOCUMENTARY",
  NATURE = "NATURE",
  BIOGRAPHY = "BIOGRAPHY",
  TRAVEL = "TRAVEL",
  FOOD_DOC = "FOOD_DOC",
  HISTORY_DOC = "HISTORY_DOC",
  SCIENCE_DOC = "SCIENCE_DOC",
  CRIME_DOC = "CRIME_DOC",
  SPORTS_DOC = "SPORTS_DOC",
  MUSIC_DOC = "MUSIC_DOC",

  FAMILY = "FAMILY",
  KIDS = "KIDS",

  MUSICAL = "MUSICAL",
  CONCERT = "CONCERT",

  SPORTS = "SPORTS",
  EXPERIMENTAL = "EXPERIMENTAL",
  SHORT_FILM = "SHORT_FILM",
  SILENT = "SILENT",
  EROTIC = "EROTIC",
  WESTERN = "WESTERN",
  ROAD_MOVIE = "ROAD_MOVIE",
  BUDDY = "BUDDY",
  ENSEMBLE = "ENSEMBLE",
}
export enum Language_Name {
  ENGLISH = "ENGLISH",
  SPANISH = "SPANISH",
  FRENCH = "FRENCH",
  HINDI = "HINDI",
  MANDARIN = "MANDARIN",
  CANTONESE = "CANTONESE",
  JAPANESE = "JAPANESE",
  KOREAN = "KOREAN",
  GERMAN = "GERMAN",
  ITALIAN = "ITALIAN",
  PORTUGUESE = "PORTUGUESE",
  RUSSIAN = "RUSSIAN",
  ARABIC = "ARABIC",
  TURKISH = "TURKISH",
  TAMIL = "TAMIL",
  TELUGU = "TELUGU",
  MALAYALAM = "MALAYALAM",
  KANNADA = "KANNADA",
  BENGALI = "BENGALI",
  MARATHI = "MARATHI",
  PUNJABI = "PUNJABI",
  URDU = "URDU",
  THAI = "THAI",
  INDONESIAN = "INDONESIAN",
  SWEDISH = "SWEDISH",
  DANISH = "DANISH",
  NORWEGIAN = "NORWEGIAN",
  DUTCH = "DUTCH",
  POLISH = "POLISH",
  UKRAINIAN = "UKRAINIAN",
  PERSIAN = "PERSIAN",
  HEBREW = "HEBREW",
  TULU = "TULU"
}