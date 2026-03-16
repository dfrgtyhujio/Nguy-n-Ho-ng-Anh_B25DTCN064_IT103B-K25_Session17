/*

    lấy dữ liệu
    đối với mảng hoặc object khi lấy về phải chuyển từ định dạng JSON sang dạng đúng của nó


    xóa dữ liệu
    1. xóa từng key: removeItem
    2. xóa hết: clear

*/

localStorage.getItem("name");
let age = localStorage.getItem("age");
console.log(age);

let students = JSON.parse(localStorage.getItem("students"));
let products = JSON.parse(localStorage.getItem("products"));
console.log(students);
console.log(products);

localStorage.removeItem("age");
localStorage.clear();