function getData() {
    let pic = localStorage.getItem("Picture");
    let data = JSON.parse(localStorage.getItem("Users"));

    let weight = $("#weight").val();
    let newdate = new Date($("#date").val());
    let date = newdate.toDateString();

    let userInfo = {};

    userInfo.fname = $("#fname").val();
    userInfo.lname = $("#lname").val();
    userInfo.phone = $("#phone").val();
    userInfo.weight = [weight];
    userInfo.date = [date];
    userInfo.picture = '';

    let tel = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
    if (tel.test(userInfo.phone) == false) { swal('error', 'The phone number you entered is not a valid entry', 'error'); return };

    if (pic !== null) userInfo.picture = pic;

    if (userInfo.fname == '' || userInfo.lname == '' || userInfo.phone == '' || userInfo.weight == 0 || userInfo.date == '' || userInfo.picture == '') {
        if (userInfo.fname == '') { swal('Ooops!', 'Please enter your first name', 'error'); return };
        if (userInfo.lname == '') { swal('Ooops!', 'Please enter your last name', 'error'); return };
        if (userInfo.phone == '') { swal('Ooops!', 'A phone number is requierd', 'error'); return };
        if (userInfo.weight == 0) { swal('Ooops!', 'The weight must be greater than 0', 'error'); return };
        if (userInfo.date == null) { swal('Ooops!', 'A date is required', 'error'); return };
        if (userInfo.picture == '') { swal('Ooops!', 'Please choose a image', 'error'); return };
    };

    if (data == null) data = [];

    if (data !== null) {
        let user = data.find(users => users.phone == userInfo.phone && users.fname == userInfo.fname && users.lname == userInfo.lname);
        if (user) {
            user.weight.push(weight);
            user.date.push(date);
            swal('Success!', 'Your data has been submitted.', 'success');
            localStorage.setItem("Users", JSON.stringify(data));
            newData()
            return
        }

        for (let i in data) {
            if (userInfo.phone == data[i].phone && (userInfo.fname !== data[i].fname || userInfo.lname !== data[i].lname)) {
                swal('Sorry', 'This phone number has already been taken by another user', 'error');
                return
            }
        }
    }

    data.push(userInfo);

    swal('Success!', 'Your data has been submitted.', 'success');
    localStorage.setItem("Users", JSON.stringify(data))
    // localStorage.setItem(userInfo.phone, JSON.stringify(userInfo));

    newData()
}



window.onload = function () {
    let pic = '';
    $("#picture").change(function (e) {
        var file = e.target.files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $("#userpic").html('');
                var img = new Image();
                img.src = reader.result;
                $("#userpic").append(img);
                $("#question").hide();
                $("#userpic").show();
                pic = reader.result;
                localStorage.setItem("Picture", pic);
            }
        }
        else {
            swal('Error', 'This file is not supporrted!', 'error')
        };
    });
    localStorage.removeItem("Picture");
}


function newData() {
    let pic = '';
    localStorage.setItem("Picture", pic);

    $("#fname").val('');
    $("#lname").val('');
    $("#phone").val('');
    $("#weight").val('');
    $("#picture").val('');
    new Date($("#date").val(null));
    $("#userpic").hide();
    $("#question").show();
}

function displayData() {
    let data = JSON.parse(localStorage.getItem("Users"));
    let table = '';

    data.forEach((user, i) => {
        table += `<tr>
                    <td>${user.fname}</td>
                    <td>${user.lname}</td>
                    <td>${user.phone}</td>
                    <td><img src ='${user.picture}' style="width:50px; height: 50px; border-radius:5px"></td>
                    <td class="ps-5"><p id="details" onclick=showlist(${i})>Details...</p><ul id="list${i}" style="list-style-type:none"></ul></td>
                    <td><i class="bi bi-trash-fill" style="color:blue;cursor:pointer" onclick="deleteUser(${i})"></i></td>
                </tr>`
    });

    if (data == null) {
        $("#nodata").show()
    }

    $("#table").html(table);
    $("#nodata").hide();
}


function deleteUser(i) {
    let data = JSON.parse(localStorage.getItem("Users"));
    data.splice(i, 1);
    localStorage.setItem("Users", JSON.stringify(data));
    displayData()
}

function showlist(i) {
    let data = JSON.parse(localStorage.getItem("Users"));
    let list = '';

    console.log(data[i].weight)

    if ((data[i].date).length > 1) {

        // data.forEach(user => {
        //     list += `<li>${user.date}: <span class="fw-bold">${user.weight} lbs.</span></li>`
        // })
        for (let j in data[i].weight) {
            list += `<li>${data[i].date[j]}: <span class="fw-bold">${data[i].weight[j]} lbs.</span></li>`
        }
    }
    else {
        list = `<li>${data[i].date}: <span class="fw-bold">${data[i].weight} lbs.</span></li>`
    }
    $(`#list${i}`).html(list)
    $('#details').css('font-size', '12px')

}

let message = [];
function sendMessage() {
    let messageinfo = {
        name: $("#firstname").val(),
        email: $("#youremail").val(),
        subject: $("#subject").val(),
        mess: $("#themessage").val()
    };

    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if(pattern.test(messageinfo.email)== false){swal('Sorry', 'The email you entered is invalid', 'error'); return}

    message.push(messageinfo);

    swal(`Thank You! ${messageinfo.name}`, 'We will reply to you as quickly as possible.', 'success');
    localStorage.setItem('Key', JSON.stringify(message));

    $("#firstname").val('');
    $("#youremail").val('');
    $("#subject").val('');
    $("#themessage").val('');
}


function subscribe() {
    let email = $("#email").val();

    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(pattern.test(email)== false){swal('Sorry', 'The email you entered is invalid', 'error'); return}
    else{
        swal('Thank You!', 'You will now receive mails for offers, news, updates, and more!', 'success')
    }
}