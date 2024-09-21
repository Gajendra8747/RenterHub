const mongoose=require("mongoose");

const ListingSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type:Number,
    required: true,
  },
  location:{
    type:String,
    required:true,
  },
  country:{
    type:String,
    required:true,
  },
  img_url:{
    type:String,
    default:"https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    set:(v)=>
    v===""
    ?"https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWV8ZW58MHx8MHx8fDA%3D":v,
  },
  description:{
    type:String,
  },
  amenities:{
    type:Array,
  }

});

const collection = mongoose.model("Listing", ListingSchema);

module.exports = collection;