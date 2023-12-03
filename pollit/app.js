const express = require("express")
const collection = require("./index")
const cors = require("cors")
const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.route("/")
  .get(cors(),(req, res) => {
    res.send("Login page");
  })
  .post(async (req, res) => {

    const { email, password, confirmPassword } = req.body;

    if (req.body.action === "register") {
      const data = {
        email: email,
        password: password,
      };

      try {
        const check = await collection.findOne({ email: email });
        if (check) {
          res.json("exist");
        } else {
          if (password === confirmPassword) {
            await collection.insertMany([data]);
            res.json("notexist");
          } else {
            res.json("exist");
          }
        }
      } catch (e) {
        res.json("notexist");
      }
    } else if (req.body.action === "login") {
      try {
        const check = await collection.findOne({ email: email });
        if (check) {
          if (check.password === password) {
            res.json("success");
          } else {
            res.json("password mismatch");
          }
        } else {
          res.json("notexist");
        }
      } catch (e) {
        res.json("notexist");
      }
    } else {
      res.status(400).send("Bad Request");
    }
  });

app.listen(3000,()=>{
	console.log("port connected");
})
