let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits(){
    localStorage.setItem("habits", JSON.stringify(habits));
}

function updateStats(){
    document.getElementById("totalHabits").innerText = habits.length;

    let done = habits.filter(h => h.doneToday).length;
    document.getElementById("doneToday").innerText = done;

    let best = 0;
    habits.forEach(h => {
        if(h.bestStreak > best) best = h.bestStreak;
    });

    document.getElementById("bestStreak").innerText = best;
}

function addHabit(){
    let input = document.getElementById("habitInput");
    let name = input.value.trim();

    if(name === "") return;

    habits.push({
        name:name,
        streak:0,
        bestStreak:0,
        doneToday:false
    });

    input.value="";
    saveHabits();
    renderHabits();
}

function markDone(index){
    if(!habits[index].doneToday){
        habits[index].doneToday = true;
        habits[index].streak++;

        if(habits[index].streak > habits[index].bestStreak)
            habits[index].bestStreak = habits[index].streak;
    }

    saveHabits();
    renderHabits();
}

function deleteHabit(index){
    habits.splice(index,1);
    saveHabits();
    renderHabits();
}

function renderHabits(){
    let list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit,index)=>{

        let progress = Math.min(habit.streak * 5, 100);

        list.innerHTML += `
        <div class="habit">

        <div class="habit-left">
        <div class="habit-name">${habit.name}</div>
        <div class="streak">Streak: ${habit.streak} days | Best: ${habit.bestStreak}</div>
        <div class="progress">
            <div class="progress-bar" style="width:${progress}%"></div>
        </div>
        </div>

        <div>
        <button onclick="markDone(${index})">Done</button>
        <button onclick="deleteHabit(${index})" style="background:#ef4444;color:white">Delete</button>
        </div>

        </div>`;
    });

    updateStats();
}

renderHabits();