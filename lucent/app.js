const express = require("express");
const app = express();

//const popups=require("popups");
require("./db_connecction");
const path = require("path");

const Listings = require("./DB_model/Listings");
const LoginData = require("./DB_model/LoginData");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/renterhub", async (req, resp) => {
  const allListings = await Listings.find({});
  resp.render("Home.ejs", { allListings });
});

app.get("/renterhub/about", (req, resp) => {
  resp.render("about.ejs");
});
app.get("/renterhub/newListing", (req, resp) => {
  resp.render("new.ejs");
});
app.get("/renterhub/services", (req, resp) => {
  resp.render("services.ejs");
});
app.get("/renterhub/:id",async(req,resp)=>{
  let {id}=req.params;
  const  listing=await Listings.findById(id);
resp.render("show.ejs",{listing});

})
app.post("/renterhub/newListingData", async (req, resp) => {
  let data = new Listings(req.body);
  let result = await data.save();

  console.log(result);
  // const allListings= await Listings.find({});

  resp.redirect("/renterhub");
});
app.post("/renterhub/SignUp_verification", async (req, resp) => {
  // let data=await LoginData.insertOne(req.body);
  let formData = req.body;
  let data = await LoginData.insertMany([formData]);
  console.log("this data is by sign up  form ", data);
  resp.redirect("/renterhub");
});

app.post("/renterhub/Login_verification", async (req, resp) => {
  try {
    const data = await LoginData.findOne({ name: req.body.name});
    console.log("this data is by login form ", data);
   
    if (data.password == req.body.password) {
      
   

      resp.redirect("/renterhub");
    } else{
      // resp.redirect("/renterhub/about");
       resp.send("can't login ,please provide wright details");
      resp.redirect("/renterhub");



    }
  } catch {
    // resp.redirect("/renterhub");


    resp.send("incorrect details please provide wright details");
  }
});

//   const insert=async()=>{
//     let result=await Listings.insertMany(data);
//     console.log(result);

//   }

// insert();

let data=[
  {
    "name": "Cozy Cottage",
    "title": "Charming cottage in the woods",
    "price": 150,
    "location": "Ashland",
    "country": "USA",
    "img_url": "",
    "description": "A cozy cottage surrounded by nature, perfect for a weekend getaway.",
    "amenities": ["Wi-Fi", "Parking", "Kitchen"]
  },
  {
    "name": "Ocean View Villa",
    "title": "Stunning villa by the beach",
    "price": 300,
    "location": "Malibu",
    "country": "USA",
    "img_url": "",
    "description": "Enjoy breathtaking ocean views from this luxurious villa.",
    "amenities": ["Pool", "Wi-Fi", "Breakfast included"]
  },
  {
    "name": "City Center Apartment",
    "title": "Modern apartment in the heart of the city",
    "price": 200,
    "location": "New York",
    "country": "USA",
    "img_url": "",
    "description": "Experience the vibrant life of the city in this stylish apartment.",
    "amenities": ["Gym", "Wi-Fi", "Air conditioning"]
  },
  {
    "name": "Rustic Cabin",
    "title": "Secluded cabin in the mountains",
    "price": 120,
    "location": "Boulder",
    "country": "USA",
    "img_url": "",
    "description": "A rustic cabin ideal for hiking and relaxation.",
    "amenities": ["Fireplace", "Parking", "Pets allowed"]
  },
  {
    "name": "Luxury Penthouse",
    "title": "Elegant penthouse with skyline views",
    "price": 500,
    "location": "Chicago",
    "country": "USA",
    "img_url": "",
    "description": "A luxurious penthouse with panoramic city views.",
    "amenities": ["Rooftop terrace", "Jacuzzi", "Wi-Fi"]
  },
  {
    "name": "Beachfront Bungalow",
    "title": "Charming bungalow steps from the beach",
    "price": 180,
    "location": "Miami",
    "country": "USA",
    "img_url": "",
    "description": "A charming bungalow perfect for beach lovers.",
    "amenities": ["BBQ grill", "Wi-Fi", "Outdoor shower"]
  },
  {
    "name": "Countryside Farmhouse",
    "title": "Spacious farmhouse with a large garden",
    "price": 130,
    "location": "Nashville",
    "country": "USA",
    "img_url": "",
    "description": "Enjoy fresh air and open spaces in this beautiful farmhouse.",
    "amenities": ["Parking", "Kitchen", "Washer/Dryer"]
  },
  {
    "name": "Downtown Loft",
    "title": "Stylish loft with industrial design",
    "price": 220,
    "location": "San Francisco",
    "country": "USA",
    "img_url": "",
    "description": "A stylish loft located in a vibrant neighborhood.",
    "amenities": ["Wi-Fi", "Gym", "Pet friendly"]
  },
  {
    "name": "Historic Castle",
    "title": "Stay in a real castle",
    "price": 1000,
    "location": "Edinburgh",
    "country": "Scotland",
    "img_url": "",
    "description": "Experience history in this magnificent castle.",
    "amenities": ["Wi-Fi", "Breakfast included", "Guided tours"]
  },
  {
    "name": "Tropical Paradise",
    "title": "Luxury villa in a tropical setting",
    "price": 450,
    "location": "Bali",
    "country": "Indonesia",
    "img_url": "",
    "description": "A luxurious villa surrounded by lush greenery.",
    "amenities": ["Private pool", "Spa services", "Wi-Fi"]
  },
  {
    "name": "Ski Resort Chalet",
    "title": "Chalet near the ski slopes",
    "price": 250,
    "location": "Aspen",
    "country": "USA",
    "img_url": "",
    "description": "Perfect for skiing enthusiasts.",
    "amenities": ["Hot tub", "Ski storage", "Wi-Fi"]
  },
  {
    "name": "Desert Oasis",
    "title": "Unique house in the desert",
    "price": 200,
    "location": "Palm Springs",
    "country": "USA",
    "img_url": "",
    "description": "A unique retreat with stunning desert views.",
    "amenities": ["Pool", "Fire pit", "Wi-Fi"]
  },
  {
    "name": "Riverside Lodge",
    "title": "Serene lodge by the river",
    "price": 160,
    "location": "Jackson Hole",
    "country": "USA",
    "img_url": "",
    "description": "Relax by the river in this beautiful lodge.",
    "amenities": ["Fishing gear", "Wi-Fi", "Fireplace"]
  },
  {
    "name": "Artistic Retreat",
    "title": "Inspiring space for creatives",
    "price": 175,
    "location": "Sedona",
    "country": "USA",
    "img_url": "",
    "description": "An artistic retreat perfect for inspiration.",
    "amenities": ["Art supplies", "Wi-Fi", "Outdoor workspace"]
  },
  {
    "name": "Mountain Escape",
    "title": "Secluded mountain home",
    "price": 220,
    "location": "Lake Tahoe",
    "country": "USA",
    "img_url": "",
    "description": "A beautiful home with stunning mountain views.",
    "amenities": ["Hiking trails", "Wi-Fi", "Parking"]
  },
  {
    "name": "Charming Studio",
    "title": "Cozy studio in the city",
    "price": 120,
    "location": "Los Angeles",
    "country": "USA",
    "img_url": "",
    "description": "A cozy studio perfect for solo travelers.",
    "amenities": ["Wi-Fi", "Kitchen", "Air conditioning"]
  },
  {
    "name": "Lavish Villa",
    "title": "Elegant villa with private beach access",
    "price": 600,
    "location": "Phuket",
    "country": "Thailand",
    "img_url": "",
    "description": "An elegant villa with luxurious amenities.",
    "amenities": ["Private beach", "Infinity pool", "Wi-Fi"]
  },
  {
    "name": "Wine Country Retreat",
    "title": "Beautiful home in wine country",
    "price": 250,
    "location": "Napa Valley",
    "country": "USA",
    "img_url": "",
    "description": "Enjoy wine tasting and relaxation in this lovely home.",
    "amenities": ["Wine cellar", "Wi-Fi", "Garden"]
  },
  {
    "name": "Glamorous Condo",
    "title": "Luxurious condo with city views",
    "price": 300,
    "location": "Toronto",
    "country": "Canada",
    "img_url": "",
    "description": "A glamorous condo with breathtaking views.",
    "amenities": ["Fitness center", "Wi-Fi", "Balcony"]
  },
  {
    "name": "Eco-Friendly Cabin",
    "title": "Sustainable cabin in the forest",
    "price": 130,
    "location": "Portland",
    "country": "USA",
    "img_url": "",
    "description": "An eco-friendly cabin perfect for nature lovers.",
    "amenities": ["Solar power", "Wi-Fi", "Organic garden"]
  },
  {
    "name": "Family-Friendly House",
    "title": "Spacious home with a backyard",
    "price": 220,
    "location": "Seattle",
    "country": "USA",
    "img_url": "",
    "description": "A family-friendly home with plenty of space for kids.",
    "amenities": ["Playground", "Wi-Fi", "BBQ grill"]
  },
  {
    "name": "Pet-Friendly Cottage",
    "title": "Cozy cottage for you and your pet",
    "price": 150,
    "location": "Savannah",
    "country": "USA",
    "img_url": "",
    "description": "A cozy cottage where pets are welcome.",
    "amenities": ["Fenced yard", "Wi-Fi", "Pet beds"]
  },
  {
    "name": "Luxury Safari Lodge",
    "title": "Experience wildlife up close",
    "price": 800,
    "location": "Kruger National Park",
    "country": "South Africa",
    "img_url": "",
    "description": "A luxury lodge in the heart of the safari.",
    "amenities": ["Game drives", "Wi-Fi", "Spa services"]
  },
  {
    "name": "Chalet in the Alps",
    "title": "Beautiful chalet with mountain views",
    "price": 300,
    "location": "Zermatt",
    "country": "Switzerland",
    "img_url": "",
    "description": "A stunning chalet perfect for skiing and hiking.",
    "amenities": ["Hot tub", "Ski rental", "Wi-Fi"]
  }
];

// Listings.insertMany(data);

app.listen(5000, () => {
  console.log("port 5000 connected ");
});
