$(document).foundation()
const appID = "91be4d88";
const appKey = "ab48d998ad78cda49ea9a6ffbac1461b";

$("#search-btn").click(function (e) {
    e.preventDefault()
    var searchVal = $("#search-input").val()
    var popup = new Foundation.Reveal($('#first-modal'))
    if (searchVal === "") {
        popup.open()
    }
    else {
        $("#meal-form")[0].reset()
        console.log(searchVal)
        $.ajax({
            method: "GET",
            url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchVal
        }).then(function (res) {
            console.log(res)
        })
    }
})


$.ajax({
    method: "GET",
    url: "https://trackapi.nutritionix.com/v2/search/instant?query=cheese",
    headers: {
        "x-app-id": "91be4d88", 
        "x-app-key": "ab48d998ad78cda49ea9a6ffbac1461b",
    }
}).then(function (res) {
    console.log(res)
})

