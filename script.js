const container_tag = document.getElementById("container");
const question_tag = document.getElementById("question");
const options_tags = document.getElementsByClassName("option");
const confirm_tag = document.getElementById("confirm");
const message_tag = document.getElementById("message");


let level = 0;
let chosen_tag = null;
let corrent_answer = 0;
let final_money = 0;


function set_question_tag(text, img) {
    question_tag.getElementsByTagName("span")[0].textContent = text;
    if (img == null) {
        question_tag.getElementsByTagName("img")[0].classList.add("hidden");
    } else {
        question_tag.getElementsByTagName("img")[0].src = `/images/question_${level}/${img}.png`;
    }

}


function set_options(options) {
    for (let i = 0; i < 4; i++) {
        const [text, img] = options[i];
        const tag = options_tags[i];
        if (text == null) {
            tag.getElementsByTagName("span")[0].classList.add("hidden");
        } else {
            tag.getElementsByTagName("span")[0].textContent = text;
        }
        if (img == null) {
            tag.getElementsByTagName("img")[0].classList.add("hidden");
        } else {
            tag.getElementsByTagName("img")[0].src = `/images/question_${level}/${img}.png`;
        }
        tag.setAttribute("data", `${i}`);
    }
}


function render_level() {
    const {question: [question_text, question_img], options, answer, money} = questions[level];
    set_question_tag(question_text, question_img);
    set_options(options);
    container_tag.classList.remove("hidden");
    corrent_answer = answer;
    final_money = money;
}


async function check_answer(event) {
    
}



for (let tag of options_tags) {
    tag.addEventListener("click", event => {
        if (chosen_tag) {
            chosen_tag.classList.remove("chosen");
            chosen_tag.classList.add("hover");
        }
        chosen_tag = event.currentTarget;
        chosen_tag.classList.remove("hover");
        chosen_tag.classList.add("chosen");
        confirm_tag.classList.remove("blocked");
        confirm_tag.classList.add("unblocked");
    });
}
confirm_tag.addEventListener("click", async event => {
    if (event.currentTarget.classList.contains("unblocked")) {
        container_tag.classList.add("hidden");
        if (chosen_tag.id == corrent_answer) {
            message_tag.textContent = `Masz na koncie ${final_money} zł`;
            message_tag.classList.remove("hidden");
            if (level >= questions.length - 1) {
                message_tag.textContent = `Wygrałaś ${final_money} zł!`;
                return
            }
        } else {
            message_tag.textContent = `Niestety przegrałaś, otrzymujesz zdobytą kwotę ${final_money} zł`;
            message_tag.classList.remove("hidden");
            return
        }

        event.currentTarget.classList.remove("hover");
        for (element of container_tag.getElementsByClassName("hidden")) {
            element.classList.remove("hidden");
        }
        confirm_tag.classList.remove("unblocked");
        confirm_tag.classList.add("blocked");
        chosen_tag.classList.remove("chosen");
        chosen_tag.classList.add("hover");
        chosen_tag = null;
        level++;

        await new Promise(r => setTimeout(r, 4000));

        message_tag.classList.add("hidden");
        render_level()
    }
});

render_level();