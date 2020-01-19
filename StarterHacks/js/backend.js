

function collectData()
{
    // Store
    all_inputs = document.getElementsByTagName("input");

    sessionStorage.setItem("firstname", all_inputs[0].value);
    sessionStorage.setItem("age", all_inputs[2].value);
    sessionStorage.setItem("sleep", all_inputs[3].value);
    sessionStorage.setItem("eat", all_inputs[4].value);
    sessionStorage.setItem("exercise", all_inputs[5].value);

   /* all_inputs = document.getElementsByTagName("input");
    sessionStorage.setItem("firstName", "Test");
    window.firstName = all_inputs[0].value;
    window.age = parseInt(all_inputs[1].value);
    window.sleep = parseInt(all_inputs[2].value);
    window.eat = parseInt(all_inputs[3].value);
    window.exercise = parseInt(all_inputs[4].value);  

    console.log(sessionStorage.getItem("firstname"));*/
}


function sentimentAnalysis()
{
   var sentiment_value = 0;
   allCircles = document.getElementsByTagName("span");
   for (i = 0; i < allCircles.length; i++)
   {
     if(allCircles[i].style.backgroundColor != "")
     {
         if (allCircles[i].className == "dot1 agree")
         {
             sentiment_value += 10;
         }
         else if (allCircles[i].className == "dot2 agree")
         {
            sentiment_value += 6;
         }
         else if (allCircles[i].className == "dot3 agree")
         {
            sentiment_value += 3;
         }
         else if (allCircles[i].className == "dot4 neutral")
         {
            sentiment_value += 0;
         }
         else if (allCircles[i].className == "dot3 disagree")
         {
            sentiment_value -= 3;
         }
         else if (allCircles[i].className == "dot2 disagree")
         {
            sentiment_value -= 6;
         }
         else if (allCircles[i].className == "dot1 disagree")
         {
            sentiment_value -= 10;
         }

         sessionStorage.setItem("sentiment_value", sentiment_value);
     }
   }
}


// can add refill white later
function circleFilling(circle)
{
    if (circle.className == "dot1 agree" || circle.className == "dot2 agree" || circle.className == "dot3 agree")
    {
        circle.style.backgroundColor = "rgb(78,91,74)";
    }
    else if (circle.className == "dot4 neutral")
    {
        circle.style.backgroundColor = "rgb(245,242,218)";
    }
    else
    {
        circle.style.backgroundColor = "rgb(162,60,68)";
    }
}

function loadMood()
{
   document.getElementsByTagName("h1")[0].innerHTML = sessionStorage.getItem("firstname") +"'s " + "summary";
   if(parseInt(sessionStorage.getItem("sentiment_value")) >= 16)
   {
    document.getElementById("mood-graphic").src = "img/sun-positive.svg";  
    document.getElementById("mood-text").innerHTML = "You are always smiling and actively seeking ways to laugh!";
   }
   else if (parseInt(sessionStorage.getItem("sentiment_value")) <= 15 && parseInt(sessionStorage.getItem("sentiment_value")) >= -15 )
   {
    document.getElementById("mood-graphic").src = "img/stars-impartial.svg";  
    document.getElementById("mood-text").innerHTML = "As you lie in between the chaotic environment, your curiosities springboard you into looking at the bigger picture and questioning all aspects of the world.";
   }
   else 
   {
    document.getElementById("mood-graphic").src = "img/moon-negative.svg";
    document.getElementById("mood-text").innerHTML =" Loosely living through life, you are okay with whatever comes next.";
   }
    
}

function loadGraphs()
{  
    
    if(sessionStorage.getItem("age") == "16")
    {
        sleep = parseInt(sessionStorage.getItem("sleep"));
        sleep_median = 8;
        sleep_data = [13, sleep, 8, 3];

        if (sleep > sleep_median)
        {
            document.getElementById("sleep-text").innerHTML = "You are making your best efforts to go above and beyond to get the expected amount of sleep needed for a human being."
        }
        else if (sleep < sleep_median)
        {
            document.getElementById("sleep-text").innerHTML = "You are suggested to get to bed slightly earlier to reach the average amount of sleep needed to function.";
        }
        else
        {
            document.getElementById("sleep-text").innerHTML = "You are getting the perfect amount of sleep, keep up the great work!";
        }
    }
    else
    {
        sleep = parseInt(sessionStorage.getItem("sleep"));
        sleep_data = [10, sleep, 7, 2];
        sleep_median = 7;

        if (sleep > sleep_median)
        {
            var x = (sleep - sleep_median).toString();
            document.getElementById("sleep-text").innerHTML = "You are making your best efforts to go above and beyond to get the expected amount of sleep, exceeding by "+ x + " hours.";
        }
        else if (sleep < sleep_median)
        {
            var x = (sleep_median - sleep).toString();
            document.getElementById("sleep-text").innerHTML = "You are suggested to get to bed slightly earlier to reach the average amount of " + x + "sleep needed to function.";
        }
        else
        {
            document.getElementById("sleep-text").innerHTML = "You are getting the perfect amount of sleep, keep up the great work!";
        }
    }

    // rememeber to add the element in the results page
    var ctx = document.getElementById('sleepChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Above Average', 'You', 'Median','Below Average'],
            datasets: [{
                label: '# of Hours',
                data: sleep_data,
                backgroundColor: [
                    'rgba(246, 242,242, 0.2)',
                    'rgba(255,81,142, 0.2)',
                    'rgba(242,230,230, 0.2)',
                    'rgba(238,220,220, 0.2)',
                    'rgba(238, 220, 220, 0.2)',
                    'rgba(231,208,208, 0.2)'
                ],
                borderColor: [
                    'rgba(246, 242,242, 1)',
                    'rgba(255,81,142, 1)',
                    'rgba(242,230,230, 1)',
                    'rgba(238,220,220, 1)',
                    'rgba(238, 220, 220, 1)',
                    'rgba(231,208,208, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    

     ////// MEAL CHARTS ///////////////
     meal = parseInt(sessionStorage.getItem("eat"));
     meal_data = [5, meal, 3, 1];
     meal_median = 3;

     if (meal > meal_median)
     {
         var x = (meal - meal_median).toString();
         document.getElementById("meal-text").innerHTML = "You are eating beyond the average amount of food for an individual your age by " + x + " it is advised you cut down on this to avoid future detrimental health." 
     }
     else if (meal < meal_median)
     {
         var x = (meal_median - meal).toString();
         document.getElementById("meal-text").innerHTML = "You are not at the correct standard for the amount of food eaten and is recommended to eat " + x + " more meals.";
     }
     else
     {
         document.getElementById("meal-text").innerHTML = "Bravo! You are eating at the standard amount of food at 3 meals and gaining the perfect amount of nutrients for your body type.";
     }
     
 
     var ctx = document.getElementById('mealChart').getContext('2d');
     var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: ['Above Average', 'You', 'Median','Below Average'],
             datasets: [{
                 label: '# of Meals',
                 data: meal_data,
                 backgroundColor: [
                    'rgba(246, 242,242, 0.2)',
                    'rgba(255,81,142, 0.2)',
                    'rgba(242,230,230, 0.2)',
                    'rgba(238,220,220, 0.2)',
                    'rgba(238, 220, 220, 0.2)',
                    'rgba(231,208,208, 0.2)'
                ],
                borderColor: [
                    'rgba(246, 242,242, 1)',
                    'rgba(255,81,142, 1)',
                    'rgba(242,230,230, 1)',
                    'rgba(238,220,220, 1)',
                    'rgba(238, 220, 220, 1)',
                    'rgba(231,208,208, 1)'
                ],
                borderWidth: 1
             }]
         },
         options: {
             scales: {
                 yAxes: [{
                     ticks: {
                         beginAtZero: true
                     }
                 }]
             }
         }
     });

     if(sessionStorage.getItem("age") == "16"){
        exercise = parseInt(sessionStorage.getItem("exercise"));
        exercise_median = 60;
        exercise_data = [120, exercise, 60, 10];

        if (exercise > exercise_median)
        {
            var x = (exercise - exercise_median).toString();
            document.getElementById("exercise-text").innerHTML = " Incredible work! Exercise is crucial to a healthy lifestyle and you are going above and beyond to stay healthy and active, exceeding by " + x + " minutes."
        }
        else if (exercise < exercise_median)
        {
            var x = (exercise_median - exercise).toString();
            document.getElementById("exercise-text").innerHTML = "You are not meeting the average amount of exercise needed to maintain your health, please attempt to add " + x + " more minutes of exercise to improve this.";
        }
        else
        {
            document.getElementById("exercise-text").innerHTML = "Great work keeping up with your exercise habits at 30 minutes. Keep it up!";
        }
    }
    else{
        exercise = parseInt(sessionStorage.getItem("exercise"));
        exercise_median = 30;
        exercise_data = [60, exercise, 30, 10];

        if (exercise > exercise_median)
        {
            var x = (exercise - exercise_median).toString();
            document.getElementById("exercise-text").innerHTML = " Incredible work! Exercise is crucial to a healthy lifestyle and you are going above and beyond to stay healthy and active, exceeding by " + x + " minutes."
        }
        else if (exercise < exercise_median)
        {
            var x = (exercise_median - exercise).toString();
            document.getElementById("exercise-text").innerHTML = "You are not meeting the average amount of exercise needed to maintain your health, please attempt to add " + x + " more minutes of exercise to improve this.";
        }
        else
        {
            document.getElementById("exercise-text").innerHTML = "Great work keeping up with your exercise habits at 30 minutes. Keep it up!";
        }
    }

    var ctx = document.getElementById('exerciseChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Above Average', 'You', 'Median','Below Average'],
            datasets: [{
                label: '# of Minutes',
                data: exercise_data,
                backgroundColor: [
                    'rgba(246, 242,242, 0.2)',
                    'rgba(255,81,142, 0.2)',
                    'rgba(242,230,230, 0.2)',
                    'rgba(238,220,220, 0.2)',
                    'rgba(238, 220, 220, 0.2)',
                    'rgba(231,208,208, 0.2)'
                ],
                borderColor: [
                    'rgba(246, 242,242, 1)',
                    'rgba(255,81,142, 1)',
                    'rgba(242,230,230, 1)',
                    'rgba(238,220,220, 1)',
                    'rgba(238, 220, 220, 1)',
                    'rgba(231,208,208, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


    
