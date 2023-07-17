let button = document.querySelector(".button");
let value = document.querySelector(".input");
let ul = document.querySelector(".ul");

let DataJobs = JSON.parse(localStorage.getItem("Datas")) !== null ? JSON.parse(localStorage.getItem("Datas")) : []; // lấy dữ liệu công việc trước đó ở localStorage
function render() {
    if (DataJobs === null) { // nếu mảng vừa lấy Datas có giá trị null thì thực hiện khối code dưới
        ul.innerHTML = "" // trong thẻ ul không có thẻ nào hết
    }
    else {
        getData(); //chạy hàm getData
    }
}

render(); //chạy hàm render
function getData() {
    ul.innerHTML = ""; // Xóa nội dung hiện tại của ul
    DataJobs.forEach((data) => { //duyệt qua các phần tử của mảng DataJobs
        let li = document.createElement("li"); // tạo element li 
        li.textContent = data; // cho thẻ li có nội dung là data
        li.innerHTML += `<i class="trash fa-solid fa-trash-can"></i>`// thêm icon bên cạnh nội dung của thẻ li
        li.addEventListener("click", function trash(event) {
            event.target.parentElement.remove(); // xóa thẻ element chứa icon thùng rác vừa click
            newjobs = DataJobs.filter((datajobs) => datajobs !== data)// lọc mảng list công việc vừa tạo
            DataJobs = newjobs;// gán mảng list hiện tại là mảng mới 
            localStorage.setItem("Datas", JSON.stringify(newjobs))// lưu vào localStorage
        })
        li.classList.add("li") // thêm class li vào element li
        ul.appendChild(li);// render thẻ li ra giao diện người dùng

    });
}
// let datas = JSON.parse(localStorage.getItem("Datas")) !== null ? JSON.parse(localStorage.getItem("Datas")) : []; //tạo mảng datas 
button.onclick = function () {
    if (value.value == "") { // nếu giá trị ở ô input là rỗng thì làm việc dưới
        alert("Hãy nhập công việc muốn làm") // thông báo người dùng nhập dữ liệu ô input
    } else { //nếu t/h trên sai thì làm khối lệnh dưới đây
        DataJobs.push(value.value); // thêm giá trị ở ô input vào mảng DataJobs
        localStorage.setItem("Datas", JSON.stringify(DataJobs)) // lưu mảng DataJobs vào localStorage
        getData(); // gọi hàm getData
    }
}



