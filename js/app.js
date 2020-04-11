$(document).foundation()
const appID = "91be4d88";
const appKey = "ab48d998ad78cda49ea9a6ffbac1461b";

var calArr = []
var proArr = []
var fatArr = []
var carbArr = []

var totalData = []



$("#meal1").click(function (e) {
    e.preventDefault()
    var searchVal = $("#search-input").val()
    var popup = new Foundation.Reveal($('#first-modal'))
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
            let shuffledOptions = shuffle(res.meals)
            for (let index = 0; index < 5; index++) {
                let option = shuffledOptions[index]
                if (option !== undefined) {
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


            }
            $(".meal-option").click(function (e) {
                console.log($(this)[0].innerText)
                let name = $(this)[0].innerText
                $.ajax({
                    method: "POST",
                    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                    "headers": {
                        "Content-Type": "application/json",
                        "x-app-id": "5e073232",
                        "x-app-key": "585d9f5f1c0b728a00307dc296b0930d",
                        "x-remote-user-id": "0"
                    },
                    data: JSON.stringify({
                        "query": name,
                        "timezone": "US/Eastern",
                        "locale": "en_US"
                    })
                }).then(function (res) {
                    console.log(res)
                    for (let index = 0; index < res.foods.length; index++) {
                        let totalCal = res.foods[index].nf_calories
                        let totalFat = res.foods[index].nf_total_fat
                        let totalCarbs = res.foods[index].nf_total_carbohydrate
                        let totalPro = res.foods[index].nf_protein
                        console.log(totalCal)
                        calArr.push(totalCal)
                        proArr.push(totalPro)
                        fatArr.push(totalFat)
                        carbArr.push(totalCarbs)
                    }
                    console.log(calArr)
                    console.log(carbArr)
                    console.log(fatArr)
                    console.log(proArr)
                })
            })
        })
    }
})

function mainArr () {  
    totalData.push(adder(calArr))
    totalData.push(adder(carbArr))
    totalData.push(adder(fatArr))
    totalData.push(adder(proArr))

    console.log(totalData)
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nutritional Information'
        },
        xAxis: {
            categories: ['Calories', 'Protein', 'Carbs', 'Fat']
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

function adder (array) {
    var sum = array.reduce(function (a, b) {
        return a + b;
    }, 0)
    return sum
    console.log(sum)
}

document.addEventListener('DOMContentLoaded', function () {

});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
