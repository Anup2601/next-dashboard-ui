"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/firestore";
import { storage } from "@/firebase/storage";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  const addStudent = async () => {
    // if (!file) return alert("Upload profile picture");

    // Upload image
    // const imageRef = ref(storage, `students/${Date.now()}_${file.name}`);
    // await uploadBytes(imageRef, file);
    // const imageUrl = await getDownloadURL(imageRef);

    // Save data
    await addDoc(collection(db, "students"), {
      name,
      class: studentClass,
      subject,
      age,
      profilePic: "",
      createdAt: serverTimestamp(),
    });

    alert("Student added");
  };

  return (
    <div className="flex flex-col gap-2  mt-2 ">
      <input className="px-2 py-4 border" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="px-2 py-4 border" placeholder="Class" onChange={(e) => setStudentClass(e.target.value)} />
      <input className="px-2 py-4 border" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
      <input className="px-2 py-4 border" type="number" placeholder="Age" onChange={(e) => setAge(+e.target.value)} />
      <input className="px-2 py-4 border" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={addStudent}>Add Student</button>
    </div>
  );
}
