let button = document.querySelector(".button");
let value = document.querySelector(".input");
let ul = document.querySelector(".ul");

let DataJobs = JSON.parse(localStorage.getItem("Datas")); // lấy dữ liệu công việc trước đó ở localStorage
function render(){
    if (DataJobs == null){ // nếu mảng vừa lấy Datas có giá trị null thì thực hiện khối code dưới
        ul.innerHTML = "" // trong thẻ ul không có thẻ nào hết
    }
    else {
        DataJobs.forEach((data) => { // duyệt qua các phần tử của mảng DataJobs
            let li = document.createElement("li"); //tạo element li 
            li.textContent = data;// cho thẻ li có nội dung là data
            li.innerHTML += `<i class="trash fa-solid fa-trash-can"></i>`// thêm icon bên cạnh nội dung của thẻ li
            ul.appendChild(li);// render thẻ li ra giao diện người dùng
            li.classList.add("li")// thêm class li vào element li
          });
    }
}
render(); //chạy hàm render
let datas =[JSON.parse(localStorage.getItem("Datas"))]; //tạo mảng datas 
function getData() {
    let Datas = JSON.parse(localStorage.getItem("Datas")) 
    ul.innerHTML = ""; // Xóa nội dung hiện tại của ul
    Datas.forEach((data) => { //duyệt qua các phần tử của mảng Datas
      let li = document.createElement("li"); // tạo element li 
      li.textContent = data; // cho thẻ li có nội dung là data
      li.innerHTML += `<i class="trash fa-solid fa-trash-can"></i>`// thêm icon bên cạnh nội dung của thẻ li
      ul.appendChild(li);// render thẻ li ra giao diện người dùng
      li.classList.add("li") // thêm class li vào element li
    });
  }
button.onclick = function () {
    if (value.value == "") { // nếu giá trị ở ô input là rỗng thì làm việc dưới
        alert("Hãy nhập công việc muốn làm") // thông báo người dùng nhập dữ liệu ô input
    } else { //nếu t/h trên sai thì làm khối lệnh dưới đây
        datas.push(value.value); // thêm giá trị ở ô input vào mảng datas
        localStorage.setItem("Datas", JSON.stringify(datas)) // lưu mảng datas vào localStorage
        getData(); // gọi hàm getData
    }
}
let trash = document.querySelector(".trash");
trash.onclick = function(e){
console.log(123)
}

