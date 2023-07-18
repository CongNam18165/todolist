let button = document.querySelector(".button");
let updateBtn = document.querySelector(".update")
let input = document.querySelector(".input");
let bodyTable = document.querySelector(".body-table");
let pickDelete = document.querySelector(".delete-pick");

let dataJobs = JSON.parse(localStorage.getItem("Datas")) !== null ? JSON.parse(localStorage.getItem("Datas")) : []; // lấy dữ liệu công việc trước đó ở localStorage
function render() {
    
    if (dataJobs.length > 0) {
        let currentTime = JSON.parse(localStorage.getItem("currentTime"))
        let currentNow = JSON.parse(localStorage.getItem("currentNow"))
        getData(currentTime,currentNow); //chạy hàm getData
    }
}

render(); //chạy hàm render
function getData(currentTime,currentNow) {
    bodyTable.innerHTML = "";
    dataJobs.forEach((data, index) => { //duyệt qua các phần tử của mảng DataJobs
        bodyTable.innerHTML +=
            `
        <tr>
        <td>${index +1}</td><td><span>${data}</span></td>
        <td>${currentTime  }</td><td>${currentNow == null ? "chưa sửa đổi lần nào": currentNow }</td>
        <td><button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><i class="trash fa-solid fa-trash-can"></i></td>
        <td><input class="checkbox" type = "checkbox"></input></td>
        </tr>
        `
    });
    deleteItem();
    edit();
    deleteItems();
}
function deleteItem() {
    let trash = document.getElementsByClassName("trash"); // lấy DOM element có icon thùng rác
    for(let i = 0; i<trash.length; i++){
        trash[i].addEventListener("click", function trashJob(event) {
            event.target.parentElement.parentElement.remove(); // xóa thẻ element chứa icon thùng rác vừa click
            newJobs = dataJobs.filter((dataJobs) => dataJobs !== event.target.parentElement.parentElement.querySelector("span").innerHTML)// lọc mảng list công việc vừa tạo
            dataJobs = newJobs;// gán mảng list hiện tại là mảng mới 
            localStorage.setItem("Datas", JSON.stringify(newJobs))// lưu vào localStorage
        })
    }
}
function edit() {
    let editBtn = document.getElementsByClassName("edit-btn");
    for(let i = 0; i<editBtn.length; i++){
        editBtn[i].addEventListener("click", function editJob(e) {
            input.value = e.target.parentElement.parentElement.parentElement.querySelector("span").innerHTML
            button.classList.add("none")
            updateBtn.classList.remove("none")
            let newJobs = dataJobs.filter((data) => data !== e.target.parentElement.parentElement.parentElement.querySelector("span").innerHTML)
            dataJobs = newJobs;
            localStorage.setItem("Datas", JSON.stringify(newJobs))
        })    
    }
}
function deleteItems() {
    pickDelete.addEventListener("click", function deleteJobs() {
        let isCheckbox = document.getElementsByClassName("checkbox");
        for(let i= 0; i<isCheckbox.length;i++)
        if (isCheckbox[i].checked == true) {
            let newJobs = dataJobs.filter((data) => data !== isCheckbox[i].parentElement.parentElement.querySelector("span").innerHTML)
            dataJobs = newJobs;
            localStorage.setItem("Datas", JSON.stringify(newJobs))
            location.reload();
        }
    })
}

updateBtn.addEventListener("click", function update() {
    dataJobs.push(input.value);
    localStorage.setItem("Datas", JSON.stringify(dataJobs))
    let currentDate = new Date()
    let currentNow = currentDate.getHours() +"/"+ currentDate.getMinutes() +"/"+ currentDate.getSeconds();
    localStorage.setItem("currentTime",JSON.stringify(currentNow))
    getData(currentNow); // gọi hàm getData
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
            let currentDate = new Date()
            let currentTime = currentDate.getDay() +"/"+ currentDate.getMonth() + "/" + currentDate.getFullYear();
            localStorage.setItem("currentTime",JSON.stringify(currentTime))
            dataJobs.push(input.value); // thêm giá trị ở ô input vào mảng DataJobs
            localStorage.setItem("Datas", JSON.stringify(dataJobs)) // lưu mảng DataJobs vào localStorage
            // bodyTable.innerHTML = "";
            getData(currentTime); // gọi hàm getData
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



