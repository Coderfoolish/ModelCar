const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

function utf8(str) {
    return str.replace(/\r\n/g, '\n').replace(/\t/g, '    ').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function currency(num) {
    return num.toString().replace(/(\d{11})$/g, "")+'$';
}
// Gom
function  showDeafault()
{
    document.getElementById("thongKeSideBar").style.display = 'block' ;
    document.getElementById('productSideBar').style.display= 'none' ;
    document.getElementById('userSideBar').style.display= 'none' ;
    document.getElementById('billSideBar').style.display= 'none' ;


}
function showProductSideBar()
{
    document.getElementById('productSideBar').style.display= 'block' ;
    document.getElementById("thongKeSideBar").style.display = 'none' ;
    document.getElementById('userSideBar').style.display= 'none' ;
    document.getElementById('billSideBar').style.display= 'none' ;
}
function showUserSideBar(){
    document.getElementById('userSideBar').style.display= 'block' ;
    document.getElementById('productSideBar').style.display= 'none' ;
    document.getElementById("thongKeSideBar").style.display = 'none' ;
    document.getElementById('billSideBar').style.display= 'none' ;
}
function showBillSideBar()
{
    document.getElementById('billSideBar').style.display= 'block' ;
    document.getElementById('userSideBar').style.display= 'none' ;
    document.getElementById('productSideBar').style.display= 'none' ;
    document.getElementById("thongKeSideBar").style.display = 'none' ;
}
//END GOM

//thong ke

upDateThongKe();
function upDateThongKe(){
    tongdoanhthu();
    souser();
    sodonhang();
    sosanpham();
}
function tongdoanhthu(){
    var tong=0;
    var billArray=JSON.parse(localStorage.getItem('bill'));
    for(var i=0; i<billArray.length; i++){
        tong += billArray[i].Totalprice;
    }

    document.getElementById('tongdoanhthu').innerHTML=currency(tong);
}

function souser(){
    var userArray=JSON.parse(localStorage.getItem('user'));
    document.getElementById('souser').innerHTML=userArray.length;
}

function sodonhang(){
    var donhang=JSON.parse(localStorage.getItem('bill'))
    document.getElementById('sodonhang').innerHTML=donhang.length;
}


function sosanpham(){
    var product=JSON.parse(localStorage.getItem('product'));
    document.getElementById('sosanpham').innerHTML=product.length;
}


/*ADMIN*/
function logout(){
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href='../index.html';
}

function showbilllist(){
    if(localStorage.getItem('bill')===null){
        s='<tr><td>Khong co don hang nao</td></tr>'
        document.getElementById('billlist').innerHTML=s;
        return false;
    }
    var s='<tr><th>NGÀY</th><th>KHÁCH HÀNG</th><th>GIÁ($)</th><th>TRẠNG THÁI</th></tr>';
    var billArray = JSON.parse(localStorage.getItem('bill'));
    for(var i=0;i<billArray.length;i++){
        if (billArray[i].Status == 'unprocessed') {
            s+='<tr onclick="showinfobill(\''+billArray[i].ID+'\')">'+
                '<td>'+billArray[i].Date+'</td>'+
                '<td>' + billArray[i].Ctmfullname + '</td>' +
                '<td>'+currency(billArray[i].Totalprice)+'</td>'+
                '<td style="color: red">Chưa xử lý</td>'+
                '</tr>';
        }
        else {
            s+='<tr onclick="showinfobill(\''+billArray[i].ID+'\')">'+
                '<td>'+billArray[i].Date+'</td>'+
                '<td>' + billArray[i].Ctmfullname + '</td>' +
                '<td>'+currency(billArray[i].Totalprice)+'</td>'+
                '<td style="color: blue">Đã xử lý</td>'+
                '</tr>';
        }
    }
    document.getElementById('billlist').innerHTML=s;
}
function showinfobill(id){
    document.getElementById('billinfo').style.display = 'block';
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var s='<button class="close" onClick="closeinfobill()">&times;</button>';
    for (var i = 0; i <billArray.length; i++) {
        if(billArray[i].ID==id){
            s +='<h4>Thông tin đơn hàng:</h4>'+
                '<p>'+billArray[i].Info+'</p>'+
                '<h4>Ngày tạo đơn hàng:</h4>'+
                '<p>'+billArray[i].Date+'</p>'+
                '<h4>Tên khách hàng:</h4>'+
                '<p>'+billArray[i].Ctmfullname+'</p>'+
                '<h4>Địa chỉ:</h4>'+
                '<p>'+billArray[i].Ctmaddress+'</p>'+
                '<h4>Số điện thoại liên lạc:</h4>'+
                '<p>'+billArray[i].Ctmphone+'</p>'+
                '<h4>Tổng giá tiền:</h4>'+
                '<p>'+currency(billArray[i].Totalprice)+'</p>';
            if (billArray[i].Status=="unprocessed") {
                s+='<h4>Tình trạng:</h4>'+
                    '<div><span id="status" style="color:red">Chưa xử lý</span><label><input type="checkbox" onchange="changeStatus(this,'+billArray[i].ID+')" ><span class="slider"></span></label></div>';
            }
            else {
                s+='<h4>Tình trạng:</h4>'+
                    '<div><span id="status" style="color:blue">Đã xử lý</span><label><input type="checkbox" checked onchange="changeStatus(this,'+billArray[i].ID+')" ><span class="slider"></span></label></div>';
            }
            s+='<button class="printbtn" onClick="window.print()">In đơn hàng</button>';
        }
    }
    document.querySelector('#billinfo #info').innerHTML = s;
}
function closeinfobill(){
    document.getElementById('billinfo').style.display = 'none';
}
function searchBill(){
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var status =document.getElementById('statussearch').value;
    var name =document.getElementById('name').value.toLowerCase();
    var billArrayTemp = [];
    for (var i = 0; i < billArray.length; i++) {
        if(status==billArray[i].Status && billArray[i].Ctmfullname.toLowerCase().search(name) >= 0) {
            billArrayTemp.push(billArray[i]);
        }
    }
    var s='<th>NGÀY</th><th>KHÁCH HÀNG</th><th>GIÁ($)</th><th>TRẠNG THÁI</th>';
    for(var i=0;i<billArrayTemp.length;i++){
        if(billArrayTemp[i].Status=='unprocessed'){
            s+='<tr onClick="showinfobill('+billArrayTemp[i].ID+')">'+
                '<td>'+billArrayTemp[i].Date+'</td>'+
                '<td>'+billArrayTemp[i].Ctmfullname+'</td>'+
                '<td>'+currency(billArrayTemp[i].Totalprice)+'</td>'+
                '<td style="color: red">Chưa xử lý</td>'+
                '</tr>';
        }
        else {
            s+='<tr onClick="showinfobill('+billArrayTemp[i].ID+')">'+
                '<td>'+billArrayTemp[i].Date+'</td>'+
                '<td>'+billArrayTemp[i].Ctmfullname+'</td>'+
                '<td>'+currency(billArrayTemp[i].Totalprice)+'</td>'+
                '<td style="color: blue">Đã xử lý</td>'+
                '</tr>';
        }
    }
    document.getElementById('billlist').innerHTML=s;
}
function changeStatus(checkbox,id){
    var billArray = JSON.parse(localStorage.getItem('bill'));
    if (checkbox.checked==true) {
        for (var i = 0; i < billArray.length; i++) {
            if(billArray[i].ID==id){
                billArray[i].Status = 'processed';
            }
        }
        document.getElementById('status').innerHTML="Đã xử lý";
        document.getElementById('status').style.color = 'blue';
    }else {
        for (var i = 0; i < billArray.length; i++) {
            if(billArray[i].ID==id){
                billArray[i].Status = 'unprocessed';
            }
        }
        document.getElementById('status').innerHTML="Chưa xử lý";
        document.getElementById('status').style.color = 'red';
    }
    localStorage.setItem('bill',JSON.stringify(billArray));
    showbilllist();
}
//BILL
//PRODUCT
function showProductList(vitri) {
    var productArray = JSON.parse(localStorage.getItem('product'));
    var s = '<tr><th>#ID</th><th>Ảnh</th><th>TÊN SẢN PHẨM</th><th>THƯƠNG HIỆU</th><th>GIÁ($)</th><th>Xóa</th><th>Sửa</th></tr>';
    var dem = 0;
    for (var i = vitri; i < productArray.length; i++) {
        s +=`<tr>
            <td>${productArray[i].productID}</td>
            <td><img src="../images/product/${productArray[i].productIMG}"></td>
            <td>${productArray[i].productName}</td>
            <td>${productArray[i].brand.toUpperCase()}</td>
            <td>${currency(productArray[i].price)}</td>
            <td><button class="delete" onClick="deleteproduct('${productArray[i].productID}')">Xóa</div></td>
            <td><button class="change" onClick="showchangeproductbox('${productArray[i].productID}')">Sửa</div></td>
            
            </tr>`;
        dem++;
        if (dem == 5) {
            break;
        }
    }
    document.getElementById('productlist').innerHTML = s;
    setPagination();
}
function deleteproduct(productiddelete){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var vitri;
    for(var i=0;i<productArray.length;i++){
        if(productArray[i].productID == productiddelete){
            if(confirm('Bạn có muốn xóa sản phẩm này?')){
                productArray.splice(i, 1);
            }
            vitri=(Math.floor(i/10)*10);
        }
    }
    localStorage.setItem('product',JSON.stringify(productArray));
    showProductList(0);
    upDateThongKe();
}
function setPagination(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var sotrang=Math.ceil(productArray.length/5);
    var button='';
    for(var i = 1;i<=sotrang;i++){
        vitri=(i-1)*5;
        button += '<button class="pageNumber" onclick="showProductList('+vitri+')">'+i+'</button>';
    }
    document.getElementById('pagination').innerHTML = button;
}
function showchangeproductbox(productid){
    document.getElementById('modal').style.display = 'block';
    var productArray = JSON.parse(localStorage.getItem('product'));
    for(var i=0;i<productArray.length;i++){
        if(productArray[i].productID == productid){
            document.getElementById('imgproduct').src="../images/product/"+productArray[i].productIMG;
            document.getElementById('change-product-name').value=productArray[i].productName;
            document.getElementById('change-product-brand').value=productArray[i].brand;
            document.getElementById('change-product-type').value=productArray[i].type;
            document.getElementById('change-product-price').value=productArray[i].price;
            document.getElementById('save').setAttribute('onclick', 'changeproduct(\"'+productArray[i].productID+'\")');
            break;
        }
        
    }
}
function changeproduct(productid){
    document.getElementById('modal').style.display = 'none';

    var productArray = JSON.parse(localStorage.getItem('product'));
    for(var i=0;i<productArray.length;i++){
        if(productArray[i].productID == productid){
            var pdid=productArray[i].productID;
            var productName=document.getElementById('change-product-name').value;
            var brand=document.getElementById('change-product-brand').value;
            var type=document.getElementById('change-product-type').value;
            var price=document.getElementById('change-product-price').value;
            var imgsrc = document.getElementById('change-product-img');
            if('files' in imgsrc){
                if(imgsrc.files.length!=0){
                    var productimg = brand.toLowerCase()+"/"+imgsrc.files[0].name; 
                    productArray[i].productIMG=productimg;
                    productArray[i].brand= brand;
                    productArray[i].productName=productName;
                    productArray[i].price= price;
                    productArray[i].type= type;
                    localStorage.setItem('product',JSON.stringify(productArray));
                    showProductList(0);
                    
                }else{
                    productArray[i].productName=productName;
                    productArray[i].brand= brand;
                    productArray[i].price= price;
                    productArray[i].type= type;
                    localStorage.setItem('product',JSON.stringify(productArray));
                    showProductList(0);
                }
            }
            break;
        }
    }
}
function changeimg(file){
    var reader = new FileReader();
    reader.onload=()=>{
        document.getElementById('imgproduct').src=reader.result;
    }
    reader.readAsDataURL(file.files[0]);
}
function changeimgadd(input){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('imgadd').src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function deleteimgadd(){
    document.getElementById('imgadd').src='../images/icon/temp2.jpg';
}
function closechangebox(){

    document.getElementById('modal').style.display = 'none';
}
function addProduct(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var productid = 'P'+productArray.length;
    var productname = document.getElementById('productname');
    var brand = document.getElementById('brand');
    var price = document.getElementById('productprice');

    if(!brand.value || !productname.value || !price.value){
        customAlert('Bạn chưa nhập đủ thông tin sản phẩm','warning');
        return false;
    }
    if(isNaN(Number(price.value))){
        customAlert('Giá không hợp lệ','warning');
        return false;
    }

    var imgsrc = document.getElementById('addproductimg');
    if('files' in imgsrc){
        if(imgsrc.files.length!=0){
            var productimg = brand.value.toLowerCase()+"/"+imgsrc.files[0].name; 
            var producttemp = {
                productID: productid,
                productName: productname.value,
                productIMG: productimg,
                brand: brand.value,
                price: price.value,
                type: "",
            };
            
        }else{
            var producttemp = {
                productID: productid,
                productName: productname.value,
                productIMG: 'tmp.jpg',
                brand: brand.value,
                price: price.value,
                type: ""
            };
        }
    }
    productArray.unshift(producttemp);
    localStorage.setItem('product',JSON.stringify(productArray));
    showProductList(0);
    customAlert('Thêm sản phẩm thành công','success');
    upDateThongKe();
}
function searchproduct(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var name = document.getElementById('searchproductname').value.toLowerCase();
    var brand = document.getElementById('searchproductbrand').value.toLowerCase();
    var s='<tr><th>#ID</th><th>Ảnh</th><th>TÊN SẢN PHẨM</th><th>THƯƠNG HIỆU</th><th>GIÁ</th><th>Xóa</th><th>Sửa</th></tr>';
    if (brand=='all') {
        if(!name){
            showProductList(0);
        }
        else {
            for(var i = 0; i < productArray.length; i++) {
                if (productArray[i].productName.toLowerCase().search(name) >=0) {
                    s+=`<tr>
                    <td>${productArray[i].productID}</td>
                    <td><img src="../images/product/${productArray[i].productIMG}"></td>
                    <td>${productArray[i].productName}</td>
                    <td>${productArray[i].brand.toUpperCase()}</td>
                    <td>currency(${productArray[i].price})</td>
                    <td><button class="delete" onClick="deleteproduct('${productArray[i].productID}')">Xóa</div></td>
                    <td><button class="change" onClick="showchangeproductbox('${productArray[i].productID}')">Sửa</div></td>
                    
                    </tr>`;
                }
            }
            document.getElementById('productlist').innerHTML=s;
        }
    }
    else{
        for(var i = 0; i < productArray.length; i++) {
            if (productArray[i].productName.toLowerCase().search(name)>=0&&productArray[i].brand.toLowerCase()==brand) {
                    s+='<tr>'+
                    '<td>'+productArray[i].productID+'</td>'+
                    '<td><img src="../images/product/'+productArray[i].productIMG+'"></td>'+
                    '<td>'+productArray[i].productName+'</td>'+
                    '<td>'+productArray[i].brand+'</td>'+
                    '<td>'+currency(productArray[i].price)+'</td>'+
                    '<td>'+
                    '<button class="delete" onClick="deleteproduct(\''+productArray[i].productID+'\')">&times;</div>'+
                    '<button class="change" onClick="showchangeproductbox(\''+productArray[i].productID+'\')">Sửa</div>'+
                    '</td>'+
                    '</tr>';
            }
        }
        document.getElementById('productlist').innerHTML=s;
    }
}
//PRODUCT
//user
function showUserList(){
    if(localStorage.getItem('user')===null){
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    var tr='<tr><th>STT</th><th>HỌ TÊN KH</th><th>TÊN ĐĂNG NHẬP</th><th>NGÀY ĐĂNG KÝ</th><th>Xóa</th></tr>';
    for(var i=1; i<userArray.length;i++){
        tr+='<tr><td>'+i+'</td><td>'+userArray[i].fullname+'</td><td>'+userArray[i].username+'</td><td>'+userArray[i].datesignup+'</td><td><button class="delete" onClick="deleteuser(\''+userArray[i].username+'\')">&times;</button></td></tr>';
    }
    document.getElementById('userlist').innerHTML=tr;
}
function deleteuser(usernamedelete){
    var userArray = JSON.parse(localStorage.getItem('user'));
    for(var i=0;i<userArray.length;i++){
        if(userArray[i].username == usernamedelete){
            if(confirm('Bạn có muốn xóa tài khoản này?')){
                userArray.splice(i, 1);
            }
        }
    }
    localStorage.setItem('user',JSON.stringify(userArray));
    showUserList();
    upDateThongKe();
}

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires="+d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return "";
}

loadTheme()

function loadTheme() {
    var theme = getCookie(themeCookieName)
    body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
    if (body.classList.contains(themeLight)) {
        body.classList.remove(themeLight)
        body.classList.add(themeDark)
        setCookie(themeCookieName, themeDark)
    } else {
        body.classList.remove(themeDark)
        body.classList.add(themeLight)
        setCookie(themeCookieName, themeLight)
    }
}

function collapseSidebar() {
    body.classList.toggle('sidebar-expand')
}

window.onclick = function(event) {
    openCloseDropdown(event)
}

function closeAllDropdown() {
    var dropdowns = document.getElementsByClassName('dropdown-expand')
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('dropdown-expand')
    }
}

function openCloseDropdown(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        //
        // Close dropdown when click out of dropdown menu
        //
        closeAllDropdown()
    } else {
        var toggle = event.target.dataset.toggle
        var content = document.getElementById(toggle)
        if (content.classList.contains('dropdown-expand')) {
            closeAllDropdown()
        } else {
            closeAllDropdown()
            content.classList.add('dropdown-expand')
        }
    }
}


function customAlert(message, type) {
    if (type === "success") {
    document.getElementById("customalert").style.backgroundColor = "#4CAF50";
  }
    if (type === "warning") {
    document.getElementById("customalert").style.backgroundColor = "#f44336";
  }
  document.getElementById("customalert").innerHTML = message;
  var x = document.getElementById("customalert");
  x.className = "show";
  setTimeout(function () {
    x.className = x.classList.remove("show");
  }, 3500);
}

// STATISTIC TABLE
function statisticInfo(id) {
    let statistics = {};
    var billArray = JSON.parse(localStorage.getItem('bill'));
  
    for (let i = 0; i < billArray.length; i++) {
    let bill = billArray[i];
  
    if (bill.ID === id) {
        let info = bill.Info.split(';');
  
        for (let j = 0; j < info.length; j++) {
        info[j].trim();
        let productInfo = info[j].trim().split('*');
        let productName = productInfo[0].trim();
        let quantity = parseInt(productInfo[1]);
  
        if (statistics[productName] ) {
            statistics[productName] += quantity;
        } else {
            statistics[productName] = quantity;
        }
        }
        break;
    }
    }
  
  return statistics;
  }
  
  function runStatistics() {
    let statistics = {};
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var option=document.getElementById('selectoptiondate').value;
    var day;
    if(option=="day"){
        day=document.getElementById('date').value;
    }
    for (let i = 0; i < billArray.length; i++) {
        if(option=="none"){
            let id = billArray[i].ID;
            let result = statisticInfo(id);
    
            for (let productName in result) {
                if(!isNaN(productName) == false){
                    // console.log(productName)
                    if (statistics[productName]) {
                    statistics[productName] += result[productName];
                    } else {
                    statistics[productName] = result[productName];
                    }
                    // console.log(statistics[productName])
                }
            }
        }
    }
  
    let tempArray = [];
    for (let productName in statistics) {
        tempArray.push({ name: productName, value: statistics[productName] });
        // console.log(statistics[productName]+"tmpArray")
    }
  
    tempArray.sort((a, b) => b.value - a.value);
  
    statistics = {};
    for (let i = 0; i < tempArray.length; i++) {
        let productName = tempArray[i].name;
        let value = tempArray[i].value;
        statistics[productName] = value;
        // console.log(statistics[productName]+"sort")
    }
  
    return statistics;
  }
  function runTable() {
    let statistics = runStatistics();
    var productArray = JSON.parse(localStorage.getItem("product"));
    var table = document.querySelector("#tungsanpham tbody");
    var s = "";
    var i = 1;
    var ferrarisold=0, toyotasold=0, mclarensold=0, lamborghinisold=0, porschesold=0, allsold=0;
    var ferrariprofit=0, toyotaprofit=0, mclarenprofit=0, lamborghiniprofit=0, porscheprofit=0, allprofit=0;
    
    for (let product in statistics) {
        if (!isNaN(statistics[product])) {
            var s1 = product.toString();
            var price;
            for (let iloop = 0; iloop < productArray.length; iloop++) {
            if (s1 == productArray[iloop].productName) {
                price = productArray[iloop].price;
                date = productArray[iloop].date ; 
            }
            }
            s +=
            "<tr>" +
            "<td>" + i + "</td>" +
            "<td>" + product + "</td>" +
            "<td>" + statistics[product] + "</td>" +
            "<td>" + currency(price * statistics[product])    + "</td>" +
            "<td>" +date
            "</td>";
            i++;

            if(/ferrari/i.test(product)){
                ferrariprofit+=price * statistics[product]
                ferrarisold+=statistics[product]
            }
            else if(/PORSCHE/i.test(product)){
                porscheprofit+=price * statistics[product]
                porschesold+=statistics[product]
            }
            else if(/MCLAREN/i.test(product)){
                mclarenprofit+=price * statistics[product]
                mclarensold+=statistics[product]
            }
            else if(/LAMBORGHINI/i.test(product)){
                lamborghiniprofit+=price * statistics[product]
                lamborghinisold+=statistics[product]
            }
            else{
                toyotaprofit+=price * statistics[product]
                toyotasold+=statistics[product]
            }

            allprofit+=price * statistics[product]
            allsold+=statistics[product]

        }
    }

    s2=
    `<tr>
        <td>Ferrari</td>
        <td>${ferrarisold}</td>
        <td>${currency(ferrariprofit)}</td>
    </tr>
    <tr>
        <td>Lamborghini</td>
        <td>${lamborghinisold}</td>
        <td>${currency(lamborghiniprofit)}</td>
    </tr>
    <tr>
        <td>Mclaren</td>
        <td>${mclarensold}</td>
        <td>${currency(mclarenprofit)}</td>
    </tr>
    <tr>
        <td>Porsche</td>
        <td>${porschesold}</td>
        <td>${currency(porscheprofit)}</td>
    </tr>
    <tr>
        <td>Toyota</td>
        <td>${toyotasold}</td>
        <td>${currency(toyotaprofit)}</td>
    </tr>
    <tr>
        <td>All</td>
        <td>${allsold}</td>
        <td>${currency(allprofit)}</td>
    </tr>`

    document.querySelector("#theobrand tbody").innerHTML=s2
  
    table.innerHTML = s;
}
runTable();
// END STATISTIC TABLE

function doanhso(){
    var productArray = JSON.parse(localStorage.getItem("product")) ; 
    var totalPriceProduct = 0 ; 
    for( var i= 0 ; i<productArray.length ; i++)
    {
        totalPriceProduct += Number(currency(productArray[i].price));
    }
    document.getElementById("doanhthu").innerHTML = totalPriceProduct ;
//     const time = new Date();
//   var date =
//     String(time.getDate()) +
//     "-" +
//     String(time.getMonth() + 1) +
//     "-" +
//     String(time.getFullYear());
}