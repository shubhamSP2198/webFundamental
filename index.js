$(document).ready(() => {

    var url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/" ;
    var orderList = [];
    var productList = [];
    var userList = [];

    if(!(localStorage.getItem('login'))){
        $(location).attr('href','./login.html');
    }

    $('.logout-text').click(()=>{
        localStorage.removeItem('login');
        $(location).attr('href','./login.html');
    });


    getOrdersResponse();

    function getOrdersResponse(){
        $.get(url+'orders', (data) => {
            data.map(ele => {
                ele.isVisible = true;
            });
            orderList = data;
            showOrders(...data);
        })
    }

    function showOrders(...list){
        var count = 0
        list.map(ele => {
            if(ele.isVisible){
                count++;
                $('#order-count').text(count);
                var tableRow = $('<tr>').addClass('table-row');
                var idTableCell = $('<td>').addClass('diff-color').text(ele.id);
                var customerTableCell = $('<td>').text(ele.customerName);
                var dateTableCell = $('<td>').html(ele.orderDate + '<br>' + ele.orderTime);
                var amountTableCell = $('<td>').addClass('diff-color').text(ele.amount);
                var statusTableCell = $('<td>').text(ele.orderStatus);
                tableRow.append(idTableCell, customerTableCell, dateTableCell, amountTableCell, statusTableCell);
                $('#order-table-body').append(tableRow);
            }
        })    
    }

    

    $('.order-checkbox').change((e)=>{
        orderList.map(ele => {
            if(ele.orderStatus === e.target.attributes.id.value){
                ele.isVisible = e.target.checked
            }
        });
        $('#order-count').text(0);
        $('#order-table-body').html(null)
        showOrders(...orderList);
    })

    // product page script

    getProductsResponse();

    function getProductsResponse(){
        $.get(url+'products', (data) => {
            data.map(ele => {
                ele.isVisible = true;
            });
            productList = data;
            showProducts(...data);
        })
    }

    function showProducts(...list){
        var count = 0;
        list.map(ele => {
            if(ele.isVisible){
                count++;
                $('#product-count').text(count);
                var tableRow = $('<tr>').addClass('table-row');
                var idTableCell = $('<td>').addClass('diff-color').text(ele.id);
                var productNameTableCell = $('<td>').text(ele.medicineName);
                var productBrandTableCell = $('<td>').addClass('diff-color').html(ele.medicineBrand);
                var expairyDateTableCell = $('<td>').addClass("diff-width").text(ele.expiryDate);
                var unitTableCell = $('<td>').addClass('diff-color').text('$'+ele.unitPrice);
                var stockTableCell = $('<td>').addClass('diff-color').text(ele.stock);
                tableRow.append(idTableCell, productNameTableCell, productBrandTableCell, expairyDateTableCell, unitTableCell, stockTableCell);
                $('#product-table-body').append(tableRow);
            }
        })    
    }

    

    $('.product-checkbox').change((e)=>{
        productList.map(ele => {
            if(e.target.attributes.id.value === 'stock'){
                if(ele.stock < 100){
                    ele.isVisible = e.target.checked;
                }
            }
            if(e.target.attributes.id.value === 'expire'){
                var exDate = new Date(ele.expiryDate);
                var date = new Date();
                if(!(exDate > date)){
                    ele.isVisible = e.target.checked;
                }
            }
        });
        $('#product-count').text(0);
        $('#product-table-body').html(null)
        showProducts(...productList);
    })


    // users script


    getUsersResponse();

    function getUsersResponse(){
        $.get(url+"users" , (data) => {
            userList = data;
            showUsers(...userList);
        })
    }

    function showUsers(...list){
        list.map(ele => {
            var tableRow = $('<tr>').addClass('table-row');
            var idTableCell = $('<td>').addClass('diff-color').text(ele.id);
            var imgaeTableCell = $('<td>').text(ele.medicineName);
            imgaeTableCell.append($('<img>').attr('src', ele.profilePic))
            var nameTableCell = $('<td>').addClass('diff-color').text(ele.fullName)
            var dobTableCell = $('<td>').text(ele.dob);
            var genderTableCell = $('<td>').addClass('diff-color').text(ele.gender);
            var locationTableCell = $('<td>').addClass('diff-color').text(ele.currentCity);
            tableRow.append(idTableCell, imgaeTableCell, nameTableCell, dobTableCell, genderTableCell, locationTableCell);
            $('#user-table-body').append(tableRow);
        }) 
    }

    $("#serach-btn").click((e) => {
        e.preventDefault();
        if($("#serach-user").val().length > 1){
            $('#user-table-body').html(null);
            $.get(url+"users?fullName="+$("#serach-user").val(), (data)=>{
                showUsers(...data);
            })
        }else{
            alert("Please type atleast 2 character")
        }
    });

    $('#reset-btn').click((e) =>{
        $('#user-table-body').html(null);
        showUsers(...userList);
        $("#serach-user").val() = '';
    })

});