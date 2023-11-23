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

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
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
    var s='<tr><th>NGÀY</th><th>KHÁCH HÀNG</th><th>GIÁ</th><th>TRẠNG THÁI</th></tr>';
    var billArray = JSON.parse(localStorage.getItem('bill'));
    for(var i=0;i<billArray.length;i++){
        if (billArray[i].Status == 'unprocessed') {
            s+='<tr onclick="showinfobill(\''+billArray[i].ID+'\')">'+
                '<td>'+billArray[i].Date+'</td>'+
                '<td>'+billArray[i].Ctmusername+'</td>'+
                '<td>'+currency(billArray[i].Totalprice)+'</td>'+
                '<td style="color: red">'+billArray[i].Status+'</td>'+
                '</tr>';
        }
        else {
            s+='<tr onclick="showinfobill(\''+billArray[i].ID+'\')">'+
                '<td>'+billArray[i].Date+'</td>'+
                '<td>'+billArray[i].Ctmusername+'</td>'+
                '<td>'+currency(billArray[i].Totalprice)+'</td>'+
                '<td style="color: blue">'+billArray[i].Status+'</td>'+
                '</tr>';
        }
    }
    document.getElementById('billlist').innerHTML=s;
}
function showinfobill(id){
    document.getElementById('modal1').style.display = 'block';
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var s='<button class="close" onClick="closeinfobill()">&times;</button>';
    for (var i = 0; i < billArray.length; i++) {
        if(billArray[i].id==id){
            s +='<h4>Thông tin đơn hàng:</h4>'+
                '<p>'+billArray[i].info+'</p>'+
                '<h4>Ngày tạo đơn hàng:</h4>'+
                '<p>'+billArray[i].date+'</p>'+
                '<h4>Tên khách hàng:</h4>'+
                '<p>'+billArray[i].customer.fullname+'</p>'+
                '<h4>Địa chỉ:</h4>'+
                '<p>'+billArray[i].customer.address+'</p>'+
                '<h4>Số điện thoại liên lạc:</h4>'+
                '<p>'+billArray[i].customer.phone+'</p>'+
                '<h4>Tổng giá tiền:</h4>'+
                '<p>'+currency(billArray[i].totalprice)+'</p>';
            if (billArray[i].status=="Chưa xử lý") {
                s+='<h4>Tình trạng:</h4>'+
                    '<div><span id="status" style="color:red">'+billArray[i].status+'</span><label><input type="checkbox" onchange="changeStatus(this,'+billArray[i].id+')" ><span class="slider"></span></label></div>';
            }
            else {
                s+='<h4>Tình trạng:</h4>'+
                    '<div><span id="status" style="color:blue">'+billArray[i].status+'</span><label><input type="checkbox" checked onchange="changeStatus(this,'+billArray[i].id+')" ><span class="slider"></span></label></div>';
            }
            s+='<button class="printbtn" onClick="window.print()">In đơn hàng</button>';
        }
    }
    document.getElementById('info').innerHTML = s;
}
function closeinfobill(){

    document.getElementById('modal1').style.display = 'none';
}
function searchBill(){
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var status =document.getElementById('statussearch').value;
    var name =document.getElementById('name').value.toLowerCase();
    var billArrayTemp = [];
    for (var i = 0; i < billArray.length; i++) {
        if(status==billArray[i].status && billArray[i].customer.fullname.toLowerCase().search(name) >= 0) {
            billArrayTemp.push(billArray[i]);
        }
    }
    var s='<th>NGÀY</th><th>KHÁCH HÀNG</th><th>GIÁ</th><th>TRẠNG THÁI</th>';
    for(var i=0;i<billArrayTemp.length;i++){
        if(billArrayTemp[i].status=='Chưa xử lý'){
            s+='<tr onClick="showinfobill('+billArrayTemp[i].id+')">'+
                '<td>'+billArrayTemp[i].date+'</td>'+
                '<td>'+billArrayTemp[i].customer.fullname+'</td>'+
                '<td>'+currency(billArrayTemp[i].totalprice)+'</td>'+
                '<td style="color: red">'+billArrayTemp[i].status+'</td>'+
                '</tr>';
        }
        else {
            s+='<tr onClick="showinfobill('+billArrayTemp[i].id+')">'+
                '<td>'+billArrayTemp[i].date+'</td>'+
                '<td>'+billArrayTemp[i].customer.fullname+'</td>'+
                '<td>'+currency(billArrayTemp[i].totalprice)+'</td>'+
                '<td style="color: blue">'+billArrayTemp[i].status+'</td>'+
                '</tr>';
        }
    }
    document.getElementById('billlist').innerHTML=s;
}
function changeStatus(checkbox,id){
    var billArray = JSON.parse(localStorage.getItem('bill'));
    if (checkbox.checked==true) {
        for (var i = 0; i < billArray.length; i++) {
            if(billArray[i].id==id){
                billArray[i].status = 'Đã xử lý';
            }
        }
        document.getElementById('status').innerHTML="Đã xử lý";
        document.getElementById('status').style.color = 'blue';
    }else {
        for (var i = 0; i < billArray.length; i++) {
            if(billArray[i].id==id){
                billArray[i].status = 'Chưa xử lý';
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
    var s = '<tr><th>#ID</th><th>Ảnh</th><th>TÊN SẢN PHẨM</th><th>THƯƠNG HIỆU</th><th>GIÁ</th><th></th></tr>';
    var dem = 0;
    for (var i = vitri; i < productArray.length; i++) {
        s += '<tr>' +
            '<td>' + productArray[i].productId + '</td>' +
            '<td><img src="../images/product/' + productArray[i].img + '"></td>' +
            '<td>' + productArray[i].name + '</td>' +
            '<td>' + productArray[i].brand.toUpperCase() + '</td>' +
            '<td>' + currency(productArray[i].price) + '</td>' +
            '<td>' +
            '<button class="delete" onClick="deleteproduct(\'' + productArray[i].productId + '\')">&times;</div>' +
            '<button class="change" onClick="showchangeproductbox(\'' + productArray[i].productId + '\')">Sửa</div>' +
            '</td>' +
            '</tr>';
        dem++;
        if (dem == 10) {
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
        if(productArray[i].productId == productiddelete){
            if(confirm('Bạn có muốn xóa sản phẩm này?')){
                productArray.splice(i, 1);
            }
            vitri=(Math.floor(i/10)*10);
        }
    }
    localStorage.setItem('product',JSON.stringify(productArray));
    showProductList(vitri);
}
function setPagination(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var sotrang=Math.ceil(productArray.length/10);
    var button='';
    for(var i = 1;i<=sotrang;i++){
        vitri=(i-1)*10;
        button += '<button class="pageNumber" onClick="showProductList('+vitri+')">'+i+'</button>';
    }
    document.getElementById('pagination').innerHTML = button;
}
function changeimg(input){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('imgafter').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}
function changeimgadd(input){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('imgadd').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}
function closechangebox(){

    document.getElementById('modal1').style.display = 'none';
}
function addProduct(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var productid = productArray[0].productId+1;
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
    var producttemp = {
        productId: productid,
        brand: brand.value,
        img: '../images/product/temp.jpg',
        name: productname.value,
        price: price.value
    };
    productArray.unshift(producttemp);
    localStorage.setItem('product',JSON.stringify(productArray));
    showProductList(0);
    customAlert('Thêm sản phẩm thành công','success');
}
function searchproduct(){
    var productArray = JSON.parse(localStorage.getItem('product'));
    var name = document.getElementById('searchproductname').value.toLowerCase();
    var brand = document.getElementById('searchproductbrand').value.toLowerCase();
    var s='<tr><th>#ID</th><th>Ảnh</th><th>TÊN SẢN PHẨM</th><th>THƯƠNG HIỆU</th><th>GIÁ</th><th>Xóa</th></tr>';
    if (brand=='all') {
        if(!name){
            showProductList(0);
        }
        else {
            for(var i = 0; i < productArray.length; i++) {
                if (productArray[i].name.toLowerCase().search(name) >=0) {
                    s+='<tr>'+
                        '<td>'+productArray[i].productId+'</td>'+
                        '<td><img src="../'+productArray[i].img+'"></td>'+
                        '<td>'+productArray[i].name+'</td>'+
                        '<td>'+productArray[i].brand+'</td>'+
                        '<td>'+currency(productArray[i].price)+'</td>'+
                        '<td>'+
                        '<button class="delete" onClick="deleteproduct(\''+productArray[i].productId+'\')">&times;</div>'+
                        '<button class="change" onClick="showchangeproductbox(\''+productArray[i].productId+'\')">Sửa</div>'+
                        '</td>'+
                        '</tr>';
                }
            }
            document.getElementById('productlist').innerHTML=s;
        }
    }
    else{
        for(var i = 0; i < productArray.length; i++) {
            if (productArray[i].name.toLowerCase().search(name)  >=0  && productArray[i].brand==brand) {
                s+='<tr>'+
                    '<td>'+productArray[i].productId+'</td>'+
                    '<td><img src="../'+productArray[i].img+'"></td>'+
                    '<td>'+productArray[i].name+'</td>'+
                    '<td>'+productArray[i].brand+'</td>'+
                    '<td>'+currency(productArray[i].price)+'</td>'+
                    '<td>'+
                    '<button class="delete" onClick="deleteproduct(\''+productArray[i].productId+'\')">&times;</div>'+
                    '<button class="change" onClick="showchangeproductbox(\''+productArray[i].productId+'\')">Sửa</div>'+
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
    return ""
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


