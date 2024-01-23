const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;
const userId = process.env.DB_USERID;
const pass = process.env.DB_PASSWORD;

app.use(
  cors({
    origin: [
      "https://jobhunter-rahmantopu67.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// middleware
const isVerified = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    const { data } = decoded;
    req.user = data.email;
    next();
  });
};

app.get("/", async (req, res) => {
  res.send(`server running on port ${port}`);
});
app.listen(port, () => {
  console.log(`running port ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${userId}:${pass}@cluster0.myyqyo8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("jobsHub");
    const jobsCollection = database.collection("jobs");
    const blogsCollection = database.collection("blogs");
    const questionsCollection = database.collection("ask");

    // GET API

    app.get("/allJobs", async (req, res) => {
      jobsData = jobsCollection.find();
      const result = await jobsData.toArray();
      res.send(result);
    });

    app.get("/myJobs", isVerified, async (req, res) => {
      const query = req.query;
      if (query.employerEmail === req.user) {
        jobsData = jobsCollection.find(query);
        const result = await jobsData.toArray();
        res.send(result);
      } else {
        res.status(403).send({ message: "Forbidden Access" });
      }
    });

    app.get("/appliedJobs", isVerified, async (req, res) => {
      const query = req.query;
      if (query.appliedApplicantsEmail === req.user) {
        jobsData = jobsCollection.find(query);
        const result = await jobsData.toArray();
        res.send(result);
      } else {
        res.status(403).send({ message: "Forbidden Access" });
      }
    });

    app.get("/allJobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const jobData = jobsCollection.find(query);
      const result = await jobData.toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const blogsData = blogsCollection.find();
      const results = await blogsData.toArray();
      res.send(results);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blogData = blogsCollection.find(query);
      const result = await blogData.toArray();
      res.send(result);
    });

    app.get("/ask", async (req, res) => {
      const qusData = questionsCollection.find();
      const result = await qusData.toArray();
      res.send(result);
    });

    app.get("/ask/:email", async (req, res) => {
      const mail = req.params.email;
      console.log(mail);
      const query = { user_email: mail };
      const qusData = questionsCollection.find(query);
      const result = await qusData.toArray();
      res.send(result);
    });

    app.get("/askDetails/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const qusData = questionsCollection.find(query);
      const result = await qusData.toArray();
      res.send(result);
    });

    //POST API

    app.post("/jwt", async (req, res) => {
      const data = req.body;
      const token = jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({ success: true, token: token });
    });

    app.post("/logout", async (req, res) => {
      req.body;
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    // Insert Many Data
    app.post("/allJobsMany", async (req, res) => {
      const data = req.body;
      const result = await jobsCollection.insertMany(data);
      res.send(result);
    });

    app.post("/allJobs", async (req, res) => {
      const data = req.body;
      const result = await jobsCollection.insertOne(data);
      res.send(result);
    });

    app.post("/blogs", async (req, res) => {
      const data = req.body;
      const result = await blogsCollection.insertOne(data);
      res.send(result);
    });

    app.post("/ask", async (req, res) => {
      const data = req.body;
      const result = await questionsCollection.insertOne(data);
      res.send(result);
    });

    // UPDATE API
    app.put("/allJobs/:id", async (req, res) => {
      const id = req.params.id;
      const updateJobInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const insertOptional = { upsert: true };
      const updatedJobInfo = {
        $set: {
          employerName: updateJobInfo.employerName,
          title: updateJobInfo.title,
          category: updateJobInfo.category,
          salaryRange: updateJobInfo.salaryRange,
          description: updateJobInfo.description,
          postingDate: updateJobInfo.postingDate,
          deadline: updateJobInfo.deadline,
          pictureURL: updateJobInfo.pictureURL,
          lowestSalary: updateJobInfo.lowestSalary,
          highestSalary: updateJobInfo.highestSalary,
        },
      };

      const result = await jobsCollection.updateOne(
        query,
        updatedJobInfo,
        insertOptional
      );
      res.send(result);
    });

    app.put("/apply/:id", async (req, res) => {
      const id = req.params.id;
      const applicant = req.body.applicant;

      const query = { _id: new ObjectId(id) };
      const insertOptional = { upsert: true };
      const addApplicant = {
        $push: {
          appliedApplicantsEmail: applicant,
        },
        $inc: {
          noOfApplicants: 1,
        },
      };
      const result = await jobsCollection.updateOne(
        query,
        addApplicant,
        insertOptional
      );
      res.send(result);
    });

    app.put("/askDetails/:id", async (req, res) => {
      const id = req.params.id;
      const answer = req.body.answer;
      console.log(answer);
      const query = { _id: new ObjectId(id) };
      const insertOptional = { upsert: true };
      const addAnswer = {
        $push: {
          answers: answer,
        },
      };
      const result = await questionsCollection.updateOne(
        query,
        addAnswer,
        insertOptional
      );
      res.send(result);
    });

    //DELETE API

    app.delete("/deleteJob/:id", async (req, res) => {
      const jobId = req.params.id;
      const query = { _id: new ObjectId(jobId) };
      console.log(query);
      console.log("toke:", req.cookies.token);
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
