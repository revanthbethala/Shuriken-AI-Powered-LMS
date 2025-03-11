import GetUserId from "@/helperFunctions/GetUserId"
import useGet from "@/myComponents/useGet"

function StudentDashboard() {
  const userId = GetUserId()
const {data:testsData,isLoading,error} = useGet(`tests/getAllTests/${userId}`);
const tests= testsData.tests
console.log(tests);
  return (
    <div>StudentDashboard</div>
  )
}

export default StudentDashboard