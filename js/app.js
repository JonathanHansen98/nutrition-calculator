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
            for (let index = 0; index < 5; index++) {
                console.log(res.meals[index]);
                let option = res.meals[index]
                let img = option.strMealThumb
                let name = option.strMeal
                let cardEl = $("<div>")
                let cardSection = $("<div>")
                cardSection.addClass("card-section")
                $(cardEl).addClass("card")
                let cardImg = $("<img>")
                $(cardImg).attr("src", img)
                let cardName = $("<h5>")
                cardName.text(name)
                cardSection.append(cardName)
                cardEl.append(cardImg)
                cardEl.append(cardSection)
                let cardCell = $("<div>")
                cardCell.addClass("cell meal-option")
                cardCell.append(cardEl)
                $("#card-row").append(cardCell)
            }
            $(".meal-option").click(function (e) {
                console.log("works")
            })
        })
    }
})


$.ajax({
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    "headers": {
        "Content-Type": "application/json",
        "x-app-id": "91be4d88",
        "x-app-key": "ab48d998ad78cda49ea9a6ffbac1461b",
        "x-remote-user-id": "0"
    },
    data: JSON.stringify({
        "query": "General Tso's Chicken",
        "timezone": "US/Eastern",
        "locale": "en_US"
    })
}).then(function (res) {
    console.log(res)
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

