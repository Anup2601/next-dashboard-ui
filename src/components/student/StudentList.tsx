"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { Student } from "@/types/student";

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Student[];

    setStudents(data);
  };

  const deleteStudent = async (id: string) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col gap-2 ">
        {/* table header */}
        <div className="font-bold border-b-2 p-2">Student List</div>
        <th>
            <div className="flex items-center gap-2 border p-2">
                <span>Name</span>
                <span>Class</span>
                <span>Subject</span>
                <span>Age</span>
            </div>
        </th>
      {students.map((s) => (
        <div key={s.id} className="flex items-center gap-2 border p-2">
          <img src={s.profilePic} width={50} height={50} alt={`${s.name}'s profile`} className="rounded-full" />
          <b className="font-semibold">{s.name}</b> | {s.class} | {s.subject} | Age: {s.age}
          <button onClick={() => deleteStudent(s.id!)} className="text-red-600 hover:text-red-800">Delete</button>
        </div>
      ))}
    </div>
  );
}
