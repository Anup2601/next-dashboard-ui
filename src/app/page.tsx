import StudentForm from "@/components/student/StudentForm"
import StudentList from "@/components/student/StudentList"

const Homepage = () => {
  return (
    <div className=''>
      <StudentList />
      <StudentForm />
    </div>
  )
}

export default Homepage