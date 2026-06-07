import React, { useState } from "react";
import styles from "./Listening.module.css";

/* ---------------------------- DATA ---------------------------- */
type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: string; // correct answer text
};

type Exercise = {
  id: string;
  title: string;
  videoUrl: string; // YouTube embed URL
  questions: Question[];
};

const A1_EXERCISES: Exercise[] = [
  /* ---- Cooking ---------------------------------------------------- */
  {
    id: "cooking",
    title: "Cooking",
    videoUrl: "https://www.youtube.com/embed/uVGV8LG3HHM",
    questions: [
      {
        id: "c1",
        prompt:
          "According to the author, why is he able to “eat well” despite his own lack of cooking skills?",
        options: [
          "He eats at expensive restaurants every night.",
          "His mother lives with him and cooks all his meals.",
          "His wife has a natural talent for cooking.", // ✅
          "He buys high‑quality pre‑made meals from the grocery store.",
        ],
        answer: "His wife has a natural talent for cooking.",
      },
      {
        id: "c2",
        prompt:
          "What specific detail does the author mention about his wife’s pasta that makes it taste better?",
        options: [
          "She uses a special type of expensive imported flour.",
          "She makes the noodles by hand instead of buying them in a box.", // ✅
          "She only cooks it for exactly eight minutes.",
          "She adds Mexican spices to the traditional Italian recipes.",
        ],
        answer:
          "She makes the noodles by hand instead of buying them in a box.",
      },
      {
        id: "c3",
        prompt:
          "How is meat typically prepared in the author's household, and why?",
        options: [
          "On a grill, because they prefer the smoky flavor.",
          "In the oven, to make the steak healthier.",
          "In a pan, because they do not own a grill.", // ✅
          "Raw, because the author prefers a “blue” steak.",
        ],
        answer: "In a pan, because they do not own a grill.",
      },
      {
        id: "c4",
        prompt:
          "Which “strange” food combination does the author enjoy for breakfast?",
        options: [
          "Tacos with scrambled eggs and salsa.",
          "Ravioli with maple syrup.",
          "Pancakes with maple syrup and peanut butter.", // ✅
          "Tortilla chips with cream and chocolate.",
        ],
        answer: "Pancakes with maple syrup and peanut butter.",
      },
      {
        id: "c5",
        prompt:
          "What is the author's perspective on dinner times in other countries compared to his own preference?",
        options: [
          "He wishes the US would adopt the late dinner culture of 9:00 p.m.",
          "He thinks eating at 6:30 p.m. is much too early.",
          "He finds eating at 8:00 or 9:00 p.m. to be too late for him.", // ✅
          "He believes that the time you eat is less important than what you eat.",
        ],
        answer: "He finds eating at 8:00 or 9:00 p.m. to be too late for him.",
      },
    ],
  },

  /* ---- Weather ---------------------------------------------------- */
  {
    id: "weather",
    title: "Weather",
    videoUrl: "https://www.youtube.com/embed/eYAaLWdx_h0",
    questions: [
      {
        id: "w1",
        prompt:
          "How does the author feel about extremely hot cities like Las Vegas?",
        options: [
          "He thinks they are the perfect place for a summer vacation.",
          "He likes heat, but finds those cities so hot that you must stay indoors with air‑conditioning.", // ✅
          "He believes no one should live there because it is dangerous.",
          "He prefers them to sunny beaches.",
        ],
        answer:
          "He likes heat, but finds those cities so hot that you must stay indoors with air‑conditioning.",
      },
      {
        id: "w2",
        prompt:
          "Why does the author disagree with his wife regarding rainy days?",
        options: [
          "She finds the sound of rain calming, but he finds it annoying because he can't go outside.", // ✅
          "She likes to walk in the rain, but he is afraid of getting his clothes dirty.",
          "She thinks rain is good for the plants, but he thinks it causes too many car accidents.",
          "She loves the smell of rain, but he cannot smell it.",
        ],
        answer:
          "She finds the sound of rain calming, but he finds it annoying because he can't go outside.",
      },
      {
        id: "w3",
        prompt:
          "Under what specific condition can wind be a positive thing, according to the video?",
        options: [
          "In a cold city, because it blows the snow away.",
          "In a hot city, because it helps to cool the city down.", // ✅
          "In a forest, because it helps trees grow stronger.",
          "It is never positive because it causes trees to fall down.",
        ],
        answer: "In a hot city, because it helps to cool the city down.",
      },
      {
        id: "w4",
        prompt:
          "What is the main reason the author does not want to live in a snowy city?",
        options: [
          "He hates skiing and snowboarding.",
          "It is too cold, and daily life becomes much more difficult.", // ✅
          "He is afraid of getting stuck in his house during a blizzard.",
          "He doesn't like the way the city looks when it is covered in white.",
        ],
        answer: "It is too cold, and daily life becomes much more difficult.",
      },
      {
        id: "w5",
        prompt: "Which aspect of a storm does the author find truly “scary”?",
        options: [
          "The loud sound of the thunder.",
          "The high winds of a hurricane.",
          "The lightning.", // ✅
          "The possibility of a tornado.",
        ],
        answer: "The lightning.",
      },
    ],
  },

  /* ---- Language Learning ------------------------------------------ */
  {
    id: "language",
    title: "Language Learning",
    videoUrl: "https://www.youtube.com/embed/erjMgola4fQ",
    questions: [
      {
        id: "l1",
        prompt:
          "What does the author identify as the most important requirement for learning a language?",
        options: [
          "Having a natural, born talent for linguistics.",
          "Finding a native speaker to marry.",
          "Spending a significant amount of time studying.", // ✅
          "Living in the country where the language is spoken.",
        ],
        answer: "Spending a significant amount of time studying.",
      },
      {
        id: "l2",
        prompt:
          "What does the author consider to be “the best part” of learning a new language?",
        options: [
          "Getting a promotion at work.",
          "Being able to talk to people from other countries and make friends.", // ✅
          "Understanding the lyrics of popular songs.",
          "Passing a difficult English exam.",
        ],
        answer:
          "Being able to talk to people from other countries and make friends.",
      },
      {
        id: "l3",
        prompt:
          "According to the author, why are mistakes necessary during the learning process?",
        options: [
          "They show the teacher which grammar rules are too hard.",
          "You cannot improve or get better without making them.", // ✅
          "They make the conversation more humorous and fun.",
          "They prove that you are trying to use advanced vocabulary.",
        ],
        answer: "You cannot improve or get better without making them.",
      },
      {
        id: "l4",
        prompt:
          "What strategy does the author suggest for choosing reading materials in English?",
        options: [
          "You should only read classic literature to learn “proper” English.",
          "You should read children's books because they are the easiest.",
          "You should read things that are interesting to you, like sports or technology.", // ✅
          "You should avoid fiction and only read non‑fiction textbooks.",
        ],
        answer:
          "You should read things that are interesting to you, like sports or technology.",
      },
      {
        id: "l5",
        prompt:
          "Where does the author suggest you look if you want to find an English practice group in your city?",
        options: [
          "Local newspapers.",
          "The website meetup.com.", // ✅
          "Facebook community groups.",
          "Public library bulletin boards.",
        ],
        answer: "The website meetup.com.",
      },
    ],
  },

  /* ---- New Year’s Resolutions ------------------------------------ */
  {
    id: "newyear",
    title: "New Year’s Resolutions",
    videoUrl: "https://www.youtube.com/embed/98pYyFdHw38",
    questions: [
      {
        id: "n1",
        prompt:
          "Why do many people fail to achieve their resolution of losing weight in January?",
        options: [
          "Gym memberships become too expensive after the first week.",
          "It is difficult, and many people quit before reaching their goal.", // ✅
          "They realize they don't actually enjoy exercising.",
          "The weather is usually too bad to go for runs outside.",
        ],
        answer:
          "It is difficult, and many people quit before reaching their goal.",
      },
      {
        id: "n2",
        prompt:
          "How does the author suggest that learning English can specifically help a person's career?",
        options: [
          "It allows you to work fewer hours.",
          "It provides better opportunities for certain jobs.", // ✅
          "It makes you more popular with your colleagues.",
          "It is the only way to get a job in a different country.",
        ],
        answer: "It provides better opportunities for certain jobs.",
      },
      {
        id: "n3",
        prompt:
          "What combined resolution does the author propose for someone who wants to improve both their reading habits and their language skills?",
        options: [
          "Reading two books a month in their native language.",
          "Reading books in English.", // ✅
          "Listening to English podcasts while reading a book.",
          "Writing a short book in English.",
        ],
        answer: "Reading books in English.",
      },
      {
        id: "n4",
        prompt:
          "Although the author does not smoke, what other “bad habit” does he mention he might need to address?",
        options: [
          "Spending too much time on his phone.",
          "Eating too much sugar or watching too much TV.", // ✅
          "Drinking too much coffee during work.",
          "Going to bed too late every night.",
        ],
        answer: "Eating too much sugar or watching too much TV.",
      },
      {
        id: "n5",
        prompt:
          "What is the author's advice for someone who wants to learn a new skill or activity?",
        options: [
          "Try to teach yourself using only free online articles.",
          "Look for and take a class in your city.", // ✅
          "Wait until you have a friend who can do it with you.",
          "Buy all the necessary equipment before starting.",
        ],
        answer: "Look for and take a class in your city.",
      },
    ],
  },
];

/* -------------------------- COMPONENT -------------------------- */
export default function ListeningA1() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (ex: Exercise) => {
    setSelectedExercise(ex);
    setAnswers({});
    setChecked(false);
  };

  const toggleOption = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const checkAnswers = () => setChecked(true);

  return (
    <div className={styles.container}>
      {/* ---- exercise navigation ---- */}
      <div className={styles.exerciseList}>
        {A1_EXERCISES.map((ex) => (
          <button
            key={ex.id}
            className={styles.exerciseButton}
            onClick={() => handleSelect(ex)}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div className={styles.separated_line}>

      </div>

      <div className={styles.content}>
        <div className={styles.content_container}>
          <h1 className={styles.title_content}>Listening – A1 Level</h1>

            {/* ---- selected exercise ---- */}
            {selectedExercise && (
            <section className={styles.exerciseDetail}>
              <h2 className={styles.sub_title}>{selectedExercise.title}</h2>

              {/* video */}
              <div className={styles.videoWrapper}>
                <iframe
                  width="560"
                  height="315"
                  src={selectedExercise.videoUrl}
                  title={selectedExercise.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* questions */}
              <ol className={styles.questionList}>
                {selectedExercise.questions.map((q) => (
                  <li key={q.id} className={styles.questionItem}>
                    <p>{q.prompt}</p>
                    <ul>
                      {q.options.map((opt) => {
                        const isChecked = answers[q.id] === opt;
                        const isCorrect = q.answer === opt;
                        const showResult = checked && isChecked;
                        return (
                          <li key={opt}>
                            <label
                              style={{
                                cursor: "pointer",
                                color:
                                  showResult && isCorrect
                                    ? "green"
                                    : showResult && !isCorrect
                                      ? "red"
                                      : "inherit",
                              }}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={isChecked}
                                onChange={() => toggleOption(q.id, opt)}
                                disabled={checked}
                              />{" "}
                              {opt}
                            </label>
                            {showResult && isChecked && (
                              <span style={{ marginLeft: "0.5rem" }}>
                                {isCorrect ? "✅" : "❌"}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ol>

              {/* check button */}
              <button
                className={styles.checkBtn}
                onClick={checkAnswers}
                disabled={checked}
              >
                {checked ? "Checked" : "Check Answers"}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
