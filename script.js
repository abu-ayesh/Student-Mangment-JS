const students = [];

const getStudent = () => {

  const id = document.getElementById("id").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const address = document.getElementById("address").value;
  const major = document.getElementById("major").value;
  const year = document.getElementById("yearOfStudy").value;

  if (!id || !firstName || !lastName || !age || !gender || !email || !phone || !address || !major || !year) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Enter Correct Value',
    })
    return;
  }

  const student = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    email: email,
    phone: phone,
    address: address,
    major: major,
    year: year,
    isActive: false,
    isDelete: false,
  };

  students.push(student);
  console.log('students :>> ', students);
  listStudent();
};

const listStudent = () => {

  const listStudent = document.getElementById("students_info");

  const newListStudent = students.map((student) => {

    let button_active = "Active";
    let button_show = "Show Data";
    let button_active_class = "btn btn-success";


    if (student.isActive) {
      button_active = "De-Active";
      button_active_class = "btn btn-warning";

    }

    if (student.isActive) {
      button_show = "Show Data"
    }

    const stdInfo = `
    <tr>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>
    <button onclick="activeStd(${student.id})" type="button" class="${button_active_class}" >${button_active}</button>
    <button onclick="showStudent(${student.id})" type="button" class="btn btn-primary">${button_show}</button>
    <button onclick="isDelete(${student.id})" type="button" class="btn btn-danger">Delete</button>
</td>
</tr>
</tbody> `;

    return stdInfo;

  });


  console.log("newListStudent :>> ", newListStudent);
  listStudent.innerHTML = newListStudent.join(" ");

};

const filterStudents = () => {

  const filterAge = document.getElementById('filter-age').value;
  const filterMajor = document.getElementById('filter-major').value;

  if (filterAge.value == "" && filterMajor.value == "") {

    listStudent();

    return;
  }

  const filteredStudents = students.filter(student => {

    let fill = true;

    if (filterAge) {
      fill = student.age === filterAge;
    }

    if (fill && filterMajor) {
      fill = student.major === filterMajor;
    }

    return fill;

  });


  const listStudent = document.getElementById("students_info");

  const newListStudent = filteredStudents.map((student) => {

    let button_active = "Active";
    let button_show = "Show Data";
    let button_active_class = "btn btn-success";

    if (student.isActive) {
      button_active = "De-Active";
      button_active_class = "btn btn-warning";
    }

    if (student.isActive) {
      button_show = "Show Data"
    }

    const stdInfo = `
    <tr>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>
        <button onclick="activeStd(${student.id})" type="button" class="${button_active_class}" >${button_active}</button>
        <button onclick="showStudent(${student.id})" type="button" class="btn btn-primary">${button_show}</button>
        <button onclick="isDelete(${student.id})" type="button" class="btn btn-danger">Delete</button>
    </td>
</tr>
</tbody> `;

    return stdInfo;

  });

  console.log("newListStudent :>> ", newListStudent);
  listStudent.innerHTML = newListStudent.join(" ");

};



const stdDetails = (id) => {

  const studentData = document.getElementById("std-data");

  const student = students.find((student) => {
    return student.id == id && student.isActive;
  });

  if (!student) {
    return " ";
  }

  let student_status = "";

  if (student.isActive == true) {
    student_status = "Active"
  } else {
    student_status = "pending"
  }

  const studentInfo = `    
  <p><strong>ID:</strong> <span id="id">${student.id}</span></p>
  <p><strong>First Name:</strong> <span id="firstName">${student.firstName}</span></p>
  <p><strong>Last Name:</strong> <span id="lastName">${student.lastName}</span></p>
  <p><strong>Age:</strong> <span id="age">${student.age}</span></p>
  <p><strong>Gender:</strong> <span id="gender">${student.gender}</span></p>
  <p><strong>Email:</strong> <span id="email">${student.email}</span></p>
  <p><strong>Phone Number:</strong> <span id="phoneNumber">${student.phone}</span></p>
  <p><strong>Address:</strong> <span id="address">${student.address}</span></p>
  <p><strong>Major:</strong> <span id="major">${student.major}</span></p>
  <p><strong>Year of Study:</strong> <span id="yearOfStudy">${student.year}</span></p>
  <p><strong>Status:</strong> <span id="status">${student_status}</span></p>
  <p><strong>Is Deleted:</strong> <span id="isDelete">${student.isDelete}</span></p>
`;

  console.log("newStudentData :>> ", studentInfo);

  studentData.innerHTML = studentInfo;

}

const activeStd = (id) => {
  students.forEach((student) => {
    if (id == student.id) {
      student.isActive = !student.isActive;
    }
  });
  listStudent();
};


const showStudent = (stdId) => {
  const studentData = document.getElementById("std-data");
  students.forEach((student) => {
    if (stdId == student.id) {
      if (student.isActive == false) {
        studentData.classList.remove("display-block");
        studentData.classList.add("display-none");
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'The Student is Pending',
        })
      } else {
        studentData.classList.remove("display-none");
        studentData.classList.add("display-block");
      }
    }
  });

  stdDetails(stdId);


};

const isDelete = (id) => {
  students.forEach((student) => {
    if (id == student.id) {
      if (student.isActive == false) {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'The Student is Pending',
        })
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'The Student has been deleted.',
              'success'
            )
            students.isDelete = true;
            students.splice(0, 1);
            listStudent();
          }
        })
      }
    }
  });
}