$(document).foundation()
const appID = "91be4d88";
const appKey = "ab48d998ad78cda49ea9a6ffbac1461b";
// Global array variables
var calArr = []
var proArr = []
var fatArr = []
var carbArr = []
var totalData = []
// Modal variables
var popup = new Foundation.Reveal($('#first-modal'))
var queryModal = new Foundation.Reveal($('#query-modal'))
var instructions = new Foundation.Reveal($('#instructions'))
// Opens modal on page load
instructions.open()

$("#meal1").click(function (e) {
    e.preventDefault()
    // Prevents empty searches
    var searchVal = $("#search-input").val()
    if (searchVal === "") {
        popup.open()
    }
    else {
        $("#card-row").empty()
        $("#meal-form")[0].reset()
        $.ajax({
            method: "GET",
            url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchVal
        }).then(function (res) {
            console.log(res)

            let name = ""

            let shuffledOptions = shuffle(res.meals)
            for (let index = 0; index < 5; index++) {
                let option = shuffledOptions[index]
                if (option !== undefined) {
                    let img = option.strMealThumb
                    name = option.strMeal
                    let cardEl = $("<div>")
                    let cardSection = $("<div>")
                    cardSection.addClass("card-section text-center")
                    $(cardEl).addClass("card")
                    let cardImg = $("<img>")
                    $(cardImg).attr("src", img)
                    let cardName = $("<h5>")
                    cardName.text(name)
                    cardSection.append(cardName)
                    cardEl.append(cardImg)
                    cardEl.append(cardSection)
                    let cardCell = $("<div>")
                    cardCell.addClass("cell meal-option large-auto")
                    cardCell.append(cardEl)
                    $("#card-row").append(cardCell)
                }


            }
            $(".meal-option").click(function (e) {
                console.log($(this)[0].innerText)
                let name = $(this)[0].innerText
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
                        "query": name,
                        "timezone": "US/Eastern",
                        "locale": "en_US"
                    })
                }).then(function (res) {
                    console.log(res)
                    let totalCal = 0;
                    let totalFat = 0;
                    let totalCarbs = 0;
                    let totalPro = 0;

                    for (let index = 0; index < res.foods.length; index++) {
                        totalCal = res.foods[index].nf_calories
                        totalFat = res.foods[index].nf_total_fat
                        totalCarbs = res.foods[index].nf_total_carbohydrate
                        totalPro = res.foods[index].nf_protein
                        console.log(totalCal)
                        calArr.push(totalCal)
                        proArr.push(totalPro)
                        fatArr.push(totalFat)
                        carbArr.push(totalCarbs)
                    }
                    //append name and nutrition info here
                    let nameheader = $("<h5>")
                    nameheader.html(name)
                    let pTag = $("<p>");
                    // Grabs newest value in calArr(calArr is all food item macros combined), which would be the most recent item they selected
                    pTag.append("Calories: " + calArr[calArr.length - 1], "<br>", "Fat: " + fatArr[fatArr.length - 1], "<br>", "Carbs: " + carbArr[carbArr.length - 1], "<br>", "Protein: " + proArr[proArr.length - 1], "<br>")

                    let mealDiv = $("<div>")
                    $(mealDiv).append(nameheader, pTag)
                    $("#mealCategory").append(mealDiv)

                    console.log(calArr)
                    console.log(carbArr)
                    console.log(fatArr)
                    console.log(proArr)
                })
            })
        })
    }
})

$("#reset-button").click(function () {
    $("#container").empty()
    $("#mealCategory").empty()
    $("#card-row").empty()
    calArr = []
    proArr = []
    fatArr = []
    carbArr = []
    totalData = []
})

function mainArr() {
    totalData = [];
    totalData.push(parseInt(adder(calArr)))
    totalData.push(parseInt(adder(carbArr)))
    totalData.push(parseInt(adder(fatArr)))
    totalData.push(parseInt(adder(proArr)))

    console.log(totalData)
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nutritional Information'
        },
        xAxis: {
            categories: ['Calories', 'Carbs', 'Fats', 'Proteins']
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        series: [{
            name: 'RDA',
            data: [2000, 50, 275, 78]
        }, {
            name: 'Total Selected',
            data: totalData
        }]
    });
}

function adder(array) {
    var sum = array.reduce(function (a, b) {
        return a + b;
    }, 0)
    return sum
    console.log(sum)
}

document.addEventListener('DOMContentLoaded', function () {

});

$("#calculate-btn").click(function (e) {
    e.preventDefault()
    mainArr()
})

function shuffle(a) {
    if (a === null) {
        queryModal.open()
    }
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
