// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//     origin: "hc:5173",
// }));

// app.use(express.json());

// if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined.");
//     process.exit(1);
// }

// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         app.listen(process.env.PORT || 5000, () => {
//             console.log(`Listening on port: ${process.env.PORT || 5000}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     });

// app.get("/", (req, res) => {
//     res.json("Hello from the Flashcard App backend!");
// });

// // Counter لتوليد ID رقمي
// const counterSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     seq: { type: Number, default: 0 },
// });
// const Counter = mongoose.model("Counter", counterSchema);

// // Flashcard Schema بعد التعديل
// const flashcardSchema = new mongoose.Schema({
//     id: { type: Number, unique: true },
//     question: String,
//     answer: String,
//     category: {
//         type: String,
//         required: true,
//     },
// });
// const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// // دالة توليد ID
// async function getNextSequence(name) {
//     const counter = await Counter.findOneAndUpdate(
//         { name },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//     );
//     return counter.seq;
// }

// // إضافة فلاش كارد
// // ✅ إضافة واحدة أو مجموعة من الفلاش كاردات
// app.post("/add-flashcard", async (req, res) => {
//     const data = req.body;

//     // تأكدي إذا كانت Array ولا لأ
//     const flashcards = Array.isArray(data) ? data : [data];

//     // التحقق من كل عنصر في الـ array
//     const invalid = flashcards.some(fc => !fc.question || !fc.answer || !fc.category);
//     if (invalid) {
//         return res.status(400).json({ message: "Each flashcard must include question, answer, and category" });
//     }

//     try {
//         // توليد ID لكل فلاش كارد
//         const flashcardsWithIds = await Promise.all(
//             flashcards.map(async fc => {
//                 const nextId = await getNextSequence("flashcardid");
//                 return {
//                     id: nextId,
//                     question: fc.question,
//                     answer: fc.answer,
//                     category: fc.category,
//                 };
//             })
//         );

//         // الحفظ دفعة واحدة
//         const savedFlashcards = await Flashcard.insertMany(flashcardsWithIds);
//         res.status(201).json({ message: "Flashcards added successfully!", flashcards: savedFlashcards });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding flashcards", error: error.message });
//     }
// });

// // جلب فلاش كاردات حسب الفئة (category)
// app.get("/flashcards/:category", async (req, res) => {
//     const { category } = req.params;

//     try {
//         const flashcards = await Flashcard.find({ category });
//         res.json(flashcards);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching flashcards", error: error.message });
//     }
// });

// // حذف فلاش كارد بالـ id
// app.delete("/flashcards/:id", async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedFlashcard = await Flashcard.findOneAndDelete({ id: parseInt(id) });

//         if (!deletedFlashcard) {
//             return res.status(404).json({ message: "Flashcard not found" });
//         }

//         res.json({ message: "Flashcard deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting flashcard", error: error.message });
//     }
// });

// // تعديل فلاش كارد بالـ id
// app.put("/flashcards/:id", async (req, res) => {
//     const { id } = req.params;
//     const { question, answer } = req.body;

//     if (!question || !answer) {
//         return res.status(400).json({ message: "Both question and answer are required" });
//     }

//     try {
//         const updatedFlashcard = await Flashcard.findOneAndUpdate(
//             { id: parseInt(id) },
//             { question, answer },
//             { new: true, runValidators: true }
//         );

//         if (!updatedFlashcard) {
//             return res.status(404).json({ message: "Flashcard not found" });
//         }

//         res.json({ message: "Flashcard updated successfully", flashcard: updatedFlashcard });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating flashcard", error: error.message });
//     }
// });


// // ✅ جلب كل الفلاش كاردات بدون فلترة
// app.get("/flashcards", async (req, res) => {
//     try {
//         const flashcards = await Flashcard.find({});
//         res.json(flashcards);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching all flashcards", error: error.message });
//     }
// });



require("dotenv").config()
const { PORT = 5000 } = process.env;
const mongoose = require("mongoose")

const app = require("./app");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port: ${ PORT }`)
        })
    })
    .catch(error => console.log(error))