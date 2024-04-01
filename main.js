const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/studentDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//  For allowing cors
app.use(
  cors({
    methods: ["GET", "POST","DELETE","PUT"], // Only allow certain HTTP methods
    allowedHeaders: ["Content-Type"], // Only allow certain headers
    origin: "*", // Restrict access to a specific origin
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const studentSchema = new mongoose.Schema({
  eNumber: Number,
  sName: String,
  mlMarks: Number,
  dpMarks: Number,
  bctMarks: Number,
});

const Student = mongoose.model("Student", studentSchema);
app.post("/addData", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const addData = new Student(data);
    const resData = await addData.save();
    console.log(resData);
    res.status(201).json(resData);
  } catch (error) {
    res.status(501).json({
      message: "not add student data",
    });
  }
});

app.get("/showData", async (req, res) => {
  try {
    const allData=await Student.find({});
    res.json(allData);
  } catch (error) {
    res.status(501).json({
      message: "not show student data",
    });
  }
});

app.put("/updateData/:id", async (req, res) => {
  console.log("this update router");
  try {
    const _id = req.params.id;
    const data = req.body;
    console.log(_id, data);
    
    const updatedData = await Student.findByIdAndUpdate(_id, { $set: data }, { new: true });
    console.log(updatedData);
    
    if (!updatedData) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(501).json({
      message: "Could not update student data",
      error: error.message,
    });
  }
});


app.delete("/deleteData/:id",async(req,res)=>{
    try {
        console.log("this backend api is accoure")
        const _id=req.params.id;
        const resData=await Student.findByIdAndDelete({_id});
        console.log(resData);
        res.status(201).json(resData)
    } catch (error) {
        res.status(501).json({
            message: "not delete student data",
          }); 
    }
})
