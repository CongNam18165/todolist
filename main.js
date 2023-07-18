let button = document.querySelector(".button");
let updateBtn = document.querySelector(".update")
let input = document.querySelector(".input");
let ul = document.querySelector(".ul");
let test = document.querySelector(".test");

let dataJobs = JSON.parse(localStorage.getItem("Datas")) !== null ? JSON.parse(localStorage.getItem("Datas")) : []; // lấy dữ liệu công việc trước đó ở localStorage
function render() {
    if (dataJobs === null) { // nếu mảng vừa lấy Datas có giá trị null thì thực hiện khối code dưới
        table.innerHTML = "" // trong thẻ ul không có thẻ nào hết
    }
    else {
        // table.innerHTML = `<tr>
        // <th>STT</th><th>Tên Công Việc</th><th>Ngày thêm</th><th>Ngày sửa gần nhất</th>
        // <th>Sửa</th><th>Xóa</th><th></th>
        // </tr>`
        getData(); //chạy hàm getData
    }
}

render(); //chạy hàm render
function getData() {
    ul.innerHTML = ""; // Xóa nội dung hiện tại của ul
    dataJobs.forEach((data, index) => { //duyệt qua các phần tử của mảng DataJobs
        let li = document.createElement("li"); // tạo element li 
        
        li.innerHTML = 
        // `
        // <tr>
        // <td>${index+1}</td><td><span>${data}</span></td>
        // <td></td><td></td>
        // <td><button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        // <td><i class="trash fa-solid fa-trash-can"></i></td>
        // <td><input class="checkbox" type = "checkbox"></input></td>
        // </tr>
        
        `<div class="box-jobs">
        <input class="checkbox" type = "checkbox"></input>
        <span>${data}</span>
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <i class="trash fa-solid fa-trash-can"></i>
        </div>`
        li.classList.add("li") // thêm class li vào element li
        ul.appendChild(li);// render thẻ li ra giao diện người dùng
        deleteItem(data, index);
        edit(data, index);
        deleteItems(index);
    });
}
function deleteItem(data, index) {
    let trash = document.querySelectorAll(".trash")[index]; // lấy DOM element có icon thùng rác
    trash.addEventListener("click", function trashJob(event) {
        event.target.parentElement.parentElement.remove(); // xóa thẻ element chứa icon thùng rác vừa click
        newjobs = dataJobs.filter((dataJobs) => dataJobs !== data)// lọc mảng list công việc vừa tạo
        dataJobs = newjobs;// gán mảng list hiện tại là mảng mới 
        localStorage.setItem("Datas", JSON.stringify(newjobs))// lưu vào localStorage
    })
}
function edit(data, index) {
    let editBtn = document.querySelectorAll(".edit-btn")[index];
    editBtn.addEventListener("click", function editjob(e) {
        input.value = e.target.parentElement.parentElement.querySelector("span").innerHTML
        button.classList.add("none")
        updateBtn.classList.remove("none")
        let newJobs = dataJobs.filter((data) => data !== e.target.parentElement.parentElement.querySelector("span").innerHTML)
        dataJobs = newJobs;
        localStorage.setItem("Datas", JSON.stringify(newJobs))
    })
}
function deleteItems(index) {
    test.addEventListener("click", function test() {
        let isCheckbox = document.querySelectorAll(".checkbox")[index];
        if(isCheckbox.checked == true ){
           let newjobs = dataJobs.filter((data)=> data !== isCheckbox.parentElement.querySelector("span").innerHTML)
           dataJobs = newjobs;
           localStorage.setItem("Datas", JSON.stringify(newjobs))
           location.reload();
        }
    })
}

updateBtn.addEventListener("click", function update() {
    dataJobs.push(input.value);
    localStorage.setItem("Datas", JSON.stringify(dataJobs))
    getData(); // gọi hàm getData
    input.value = "";
    button.classList.remove("none")
    updateBtn.classList.add("none")
})
button.onclick = function () {
    if (input.value.trim() == "") { // nếu giá trị ở ô input là rỗng thì làm việc dưới
        alert("Hãy nhập công việc muốn làm") // thông báo người dùng nhập dữ liệu ô input
    } else { //nếu t/h trên sai thì làm khối lệnh dưới đây
        let isDiffrent = true;
        dataJobs.forEach((dataJob) => {
            if (input.value.trim() == dataJob) {
                isDiffrent = false;
            }
        })
        if (isDiffrent == true) {
            dataJobs.push(input.value); // thêm giá trị ở ô input vào mảng DataJobs
            localStorage.setItem("Datas", JSON.stringify(dataJobs)) // lưu mảng DataJobs vào localStorage
            getData(); // gọi hàm getData
            input.value = "";
        } else {
            alert("Việc làm đã bị trùng. Xin mời nhập lại")
        }
    }
}
// thay thế những ký tự mà đoạn mã regex( gồm các ký tự mà mình không muốn trừ dấu sắc huyền và cách) thành không có gì ""
input.addEventListener("input", function validate() {
    input.value = input.value.replace(/[^\p{L}´` ]/gu, "")
})



