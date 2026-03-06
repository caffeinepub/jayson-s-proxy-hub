import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type Game = {
    id : Nat;
    name : Text;
    description : Text;
    url : Text;
    category : Text;
  };

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Nat.compare(game1.id, game2.id);
    };
  };

  type Movie = {
    id : Nat;
    title : Text;
    description : Text;
    url : Text;
    genre : Text;
  };

  module Movie {
    public func compare(movie1 : Movie, movie2 : Movie) : Order.Order {
      Nat.compare(movie1.id, movie2.id);
    };
  };

  type Meme = {
    id : Nat;
    name : Text;
    audioUrl : Text;
    emoji : Text;
  };

  module Meme {
    public func compare(meme1 : Meme, meme2 : Meme) : Order.Order {
      Nat.compare(meme1.id, meme2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let games = Map.empty<Nat, Game>();
  let movies = Map.empty<Nat, Movie>();
  let memes = Map.empty<Nat, Meme>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var password = "hackerman";

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let seedGames = [
    {
      id = 1;
      name = "2048";
      description = "Classic tile-sliding puzzle game";
      url = "https://play2048.co/";
      category = "Puzzle";
    },
    {
      id = 2;
      name = "Snake";
      description = "Retro snake game";
      url = "https://playsnake.org/";
      category = "Arcade";
    },
    {
      id = 3;
      name = "Tetris";
      description = "Falling block puzzle game";
      url = "https://tetris.com/play-tetris";
      category = "Puzzle";
    },
    {
      id = 4;
      name = "Pac-Man";
      description = "Classic maze arcade game";
      url = "https://google.com/search?q=pac-man";
      category = "Arcade";
    },
    {
      id = 5;
      name = "Chess";
      description = "Play chess online";
      url = "https://lichess.org/";
      category = "Strategy";
    },
    {
      id = 6;
      name = "Flappy Bird";
      description = "Flap your way through pipes";
      url = "https://flappybird.io/";
      category = "Arcade";
    },
  ];

  let seedMovies = [
    {
      id = 1;
      title = "Night of the Living Dead";
      description = "Classic horror film";
      url = "https://archive.org/details/night_of_the_living_dead";
      genre = "Horror";
    },
    {
      id = 2;
      title = "Plan 9 from Outer Space";
      description = "Cult sci-fi film";
      url = "https://archive.org/details/Plan_9_from_Outer_Space";
      genre = "Sci-Fi";
    },
    {
      id = 3;
      title = "The Great Train Robbery";
      description = "Early silent film";
      url = "https://archive.org/details/GreatTrainRobbery";
      genre = "Western";
    },
    {
      id = 4;
      title = "Sherlock Holmes";
      description = "Vintage mystery film";
      url = "https://archive.org/details/SherlockHolmes1916";
      genre = "Mystery";
    },
    {
      id = 5;
      title = "Metropolis";
      description = "Silent sci-fi masterpiece";
      url = "https://archive.org/details/Metropolis1927";
      genre = "Sci-Fi";
    },
    {
      id = 6;
      title = "Nosferatu";
      description = "Classic vampire film";
      url = "https://archive.org/details/Nosferatu-1922";
      genre = "Horror";
    },
  ];

  let seedMemes = [
    {
      id = 1;
      name = "We're In";
      audioUrl = "https://freesound.org/data/previews/742/742422_11323239-lq.mp3";
      emoji = "🤖";
    },
    {
      id = 2;
      name = "Access Granted";
      audioUrl = "https://freesound.org/data/previews/330/330271_3248244-lq.mp3";
      emoji = "🔒";
    },
    {
      id = 3;
      name = "Error";
      audioUrl = "https://freesound.org/data/previews/506/506534_11049867-lq.mp3";
      emoji = "⚠";
    },
    {
      id = 4;
      name = "Dun Dun Dun";
      audioUrl = "https://freesound.org/data/previews/345/345639_6240064-lq.mp3";
      emoji = "😲";
    },
    {
      id = 5;
      name = "Mission Impossible";
      audioUrl = "https://freesound.org/data/previews/270/270964_5238290-lq.mp3";
      emoji = "🕵";
    },
    {
      id = 6;
      name = "Hacker Laugh";
      audioUrl = "https://freesound.org/data/previews/681/681383_5027191-lq.mp3";
      emoji = "😈";
    },
    {
      id = 7;
      name = "Level Up";
      audioUrl = "https://freesound.org/data/previews/462/462396_10011960-lq.mp3";
      emoji = "🎉";
    },
    {
      id = 8;
      name = "Game Over";
      audioUrl = "https://freesound.org/data/previews/254/254736_2409917-lq.mp3";
      emoji = "💀";
    },
    {
      id = 9;
      name = "Success";
      audioUrl = "https://freesound.org/data/previews/234/234563_2026879-lq.mp3";
      emoji = "💰";
    },
    {
      id = 10;
      name = "Failure";
      audioUrl = "https://freesound.org/data/previews/352/352661_3248244-lq.mp3";
      emoji = "🙌";
    },
  ];

  public shared ({ caller }) func setPassword(oldPassword : Text, newPassword : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can change the password");
    };

    if (oldPassword != password) {
      return false;
    };

    password := newPassword;
    true;
  };

  public query ({ caller }) func verifyPassword(passwordAttempt : Text) : async Bool {
    password == passwordAttempt;
  };

  public query ({ caller }) func getGames() : async [Game] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view games");
    };
    seedGames.sort();
  };

  public query ({ caller }) func getMovies() : async [Movie] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view movies");
    };
    seedMovies.sort();
  };

  public query ({ caller }) func getMemes() : async [Meme] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view memes");
    };
    seedMemes.sort();
  };

  public shared ({ caller }) func addGame(game : Game) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add games");
    };
    games.add(game.id, game);
  };

  public shared ({ caller }) func addMovie(movie : Movie) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add movies");
    };
    movies.add(movie.id, movie);
  };

  public shared ({ caller }) func addMeme(meme : Meme) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add memes");
    };
    memes.add(meme.id, meme);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
