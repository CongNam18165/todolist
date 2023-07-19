let button = document.querySelector(".button");
let updateBtn = document.querySelector(".update")
let input = document.querySelector(".input");
let bodyTable = document.querySelector(".body-table");
let pickDelete = document.querySelector(".delete-pick");
let yourSelect = document.querySelector("select");
//Lấy mảng dataJobs ở localStorage nếu mảng đó chưa được khởi tạo thì dataJobs sẽ là mảng rỗng.
//Sau lấy xong sẽ giải mã chuỗi JSON bằng phương thức parse() và cho chay 
//hàm getData lần đầu tiên để hiển thị ra các giá trị trước 
let dataJobs = JSON.parse(localStorage.getItem("Datas")) !== null ? JSON.parse(localStorage.getItem("Datas")) : []; // lấy dữ liệu công việc trước đó ở localStorage
function render() {
    if (dataJobs.length > 0) {
        getData(); //chạy hàm getData
    }
}

render(); //chạy hàm render
// hàm getData nhận 2 tham số ngày hiện tại và thời gian hiện tại, trong hàm getData trỏ đến element tbody và in
//ra chuỗi "" sau đó dùng forEach lặp qua từng phần tử của mảng trả ra 2 giá trị data là giá trị từng phần tử và
//index là chỉ mục của từng giá trị. In thêm vào element tbody các giá trị cần điền vào bảng theo đúng format table.
//Nếu 2 biến currentTime và currentNow chưa được khởi tạo sẽ in ra chữ thay thế.Chạy hàm addDay có đối số là index. 
function getData(currentTime, currentNow) {
    bodyTable.innerHTML = "";
    dataJobs.forEach((data, index) => { //duyệt qua các phần tử của mảng DataJobs
        bodyTable.innerHTML +=
            `
        <tr>
        <td class="stt">${index + 1}</td><td><span>${data}</span></td>
        <td class="day">${currentTime == null ? "không rõ ngày thêm" : currentTime}</td><td class ="time">${currentNow == null ? "chưa sửa đổi lần nào" : currentNow}</td>
        <td><button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><i class="trash fa-solid fa-trash-can"></i></td>
        <td><input class="checkbox" type = "checkbox"></input></td>
        </tr>
        `
        addDay(index)
    });
    deleteItem();
    edit();
    deleteItems();
}
// Hàm xóa đơn lẻ 1 item: lấy tất cả thẻ Element có class là trash. Sau đó cho 1 vòng lặp chạy từ 0 cho đến chiều dài của HTMLcolection trash
// mà mình vừa lấy. Qua mỗi lần lặp thì mỗi thẻ element có class là trash sẽ được lắng nghe sự kiện bên trong.
//Khi click vào icon thùng rác mình vừa gắn sự kiện sẽ lấy hàng chứa icon thùng rác đó xóa khỏi giao diện đồng thời dùng phương thức 
//filter() lọc mảng dataJobs xóa giá trị mà giống với giá trị trong thẻ span() của hàng đó và gắn lại vào localStorage để những thao
//tác sau đó được cập nhật mảng dataJobs
function deleteItem() {
    let trash = document.getElementsByClassName("trash"); // lấy DOM element có icon thùng rác
    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener("click", function trashJob(event) {
            event.target.parentElement.parentElement.remove(); // xóa thẻ element chứa icon thùng rác vừa click
            newJobs = dataJobs.filter((dataJobs) => dataJobs !== event.target.parentElement.parentElement.querySelector("span").innerHTML)// lọc mảng list công việc vừa tạo
            dataJobs = newJobs;// gán mảng list hiện tại là mảng mới 
            localStorage.setItem("Datas", JSON.stringify(newJobs))// lưu vào localStorage
        })
    }
}
//Hàm xóa nhiều Items cùng lúc: Gắn sự kiện click cho nút xóa toàn bộ. Cho vòng lặp có độ dài là số lượng element checkbox
//Sau đó kiểm tra nếu checkbox nào được tích vào sẽ lọc khỏi mảng dataJobs với phương thức filter và gắn lại mảng dataJobs
//và lưu vào localStorage với key là "Datas" và value là chuỗi JSON newJobs để thực hiện các sự kiện tiếp theo.cuối cùng dùng hàm location.reload()để 
// render lại trang  
function deleteItems() {
    pickDelete.addEventListener("click", function deleteJobs() {
        let isCheckbox = document.getElementsByClassName("checkbox");
        for (let i = 0; i < isCheckbox.length; i++)
            if (isCheckbox[i].checked == true) {
                let newJobs = dataJobs.filter((data) => data !== isCheckbox[i].parentElement.parentElement.querySelector("span").innerHTML)
                dataJobs = newJobs;
                localStorage.setItem("Datas", JSON.stringify(newJobs))
                location.reload();
            }
    })
}
//Hàm sửa giá trị bảng: Tạo biến toàn cục currentTimeedit.Trong hàm edit gắn lại biến bằng với số lượng các nút sửa mà 
// dùng phương thức getElementclassName lấy ra ở trên.Trong vòng lặp for có chiều dài là số lượng các nút sửa
//gán giá trị của input là đoạn text ở element span(e.target.parentElement trả về chính đối tượng mà mình click vào sau đó lấy ra những giá trị cha của nó)
var currentTimeedit;
function edit() {
    let editBtn = document.getElementsByClassName("edit-btn");
    currentTimeedit = editBtn.length;
    for (let i = 0; i < editBtn.length; i++) {
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
// Hàm xử lý nút update sau khi thực hiện hàm edit:gán biến currentDate là giá trị đối tượng Date mới biểu diễn thời gian hiện tại
//lấy ra Giờ,phút,giây ngăn cách bởi dấu 2 chấm.và sử dụng template literals `` để có thể truyền biến vào 1 chuỗi string qua cú pháp ${}
// lấy element có class button gọi đến phuwong thức classList(là 1 tập hợp các class và cho phép thêm sửa xóa class dễ dàng với các phương thức)

updateBtn.addEventListener("click", function update() {
    dataJobs.push(input.value);
    localStorage.setItem("Datas", JSON.stringify(dataJobs))
    getData(); // gọi hàm getData
    let time = document.getElementsByClassName("time")
    let day = document.getElementsByClassName("day")
    let currentDate = new Date()
    let currentNow = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let currentDay = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    time[currentTimeedit - 1].innerText = currentNow;
    day[currentTimeedit - 1].innerText = currentDay;

    input.value = "";
    button.classList.remove("none")
    updateBtn.classList.add("none")
})
// Xử lý khi click vào button add: Nếu giá trị của ô input bỏ qua khoảng trắng ở 2 bên không có gì sẽ làm khối code bên dưới còn không
// thì sẽ làm khối code ở sau từ else
button.onclick = function () {
    if (input.value.trim() == "") { 
        alert("Hãy nhập công việc muốn làm") 
    } else { 
        let isDiffrent = true;
        dataJobs.forEach((dataJob) => {
            if (input.value.trim() == dataJob) {
                isDiffrent = false;
            }
        })
        if (isDiffrent == true) {
            dataJobs.push(input.value); // thêm giá trị ở ô input vào mảng dataJobs
            localStorage.setItem("Datas", JSON.stringify(dataJobs)) //lưu mảng dataJobs vào localStorage với phương thức JSON.stringify để chuyển đổi dữ liệu qua chuỗi json
            getData(); 
            input.value = "";
        } else {
            alert("Việc làm đã bị trùng. Xin mời nhập lại")
        }
    }
}
//hàm sắp xếp theo anphabet: Cho biến switching giá trị true và vòng lặp sẽ xảy ra khi switching mang giá trị true
// trong vòng lặp giá trị switch sẽ là false và lồng vòng lặp for chạy từ 0 đến độ dài hàng ở thân table -1 để so sánh cặp 
//giá trị liên tiếp theo anphabet.Cứ thế đến hết.
function arrangeAlphabet() {
    let switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < bodyTable.rows.length -1; i++) {
            let stt = document.querySelectorAll(".stt")
            stt[i].innerHTML = i + 1;
            stt[i+1].innerHTML = i + 2;
            let shouldSwitch = false;
            let x = bodyTable.rows[i].querySelector("span").innerHTML.toLowerCase()// đặt x là giá trị trong thẻ span của hàng i và .toLowerCase()để thành chữ thường so sánh
            let y = bodyTable.rows[i + 1].querySelector("span").innerHTML.toLowerCase()
            if (x > y) {
                shouldSwitch = true;
            }
            if (shouldSwitch) {
                
                bodyTable.rows[i].parentElement.insertBefore(bodyTable.rows[i + 1], bodyTable.rows[i]);
                switching = true;
            }
        }
    }
}
// Lắng nghe sự kiện thay đổi của ô select nếu nó là giá trị 1 sẽ sắp xếp theo ngày thêm vào còn giá trị 2 là theo vần anphabet
yourSelect.addEventListener("change", function () {
    if (yourSelect.value == 1) {
        // arrangeDayadd();
    } else if (yourSelect.value == 2) {
        arrangeAlphabet();
    }
})
//hàm addDay được được nhận tham số index là chỉ mục hàng được thêm vào bảng.Sử dụng template literals để truyền biến vào trong tạo ra ngày tháng năm
function addDay(index) {
    let currentDate = new Date()
    let currentDay = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    let day = document.getElementsByClassName("day")
    day[index].innerText = currentDay
}
// thay thế những ký tự mà đoạn mã regex( gồm các ký tự mà mình không muốn trừ dấu sắc huyền và cách) thành chuỗi rỗng ""
input.addEventListener("input", function validate() {
    input.value = input.value.replace(/[^\p{L}´` ]/gu, "")
})



