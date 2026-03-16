/*

    browser storage: dịch vụ cho phép lưu trử dữ liệu phía trình duyệt web
    cung cấp 3 kiểu dữ liệu
    1. local storage
        + dung lượng lưu: 5-10 mb
    2. session storage
        + dung lượng lưu: 5-10 mb
    3. cookie
        + dung lượng lưu: 4-8 kb

    cscsh lưu dữ lêij
    
*/

let name = "John Doe";
localStorage.setItem("name", name); 

let age = 13;
localStorage.setItem("age", age);
     

let stu = ["John Doe", "John Doe"];
localStorage.setItem("students", JSON.stringify(stu)); 

let product = [
    {
        id: 1,
        name: "sản phẩm 1"
    },
    {
        id: 2,
        name: "sản phẩm 2"
    }
]
localStorage.setItem("products", JSON.stringify(product));