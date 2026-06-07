import { useState } from 'react'
import styles from './Grammar.module.css'

type Topic = {
  title: string
  explanation?: string
  rules?: string[]
  examples?: string[]
}

type LevelData = {
  emoji?: string
  topics: Topic[]
}

const grammarData: Record<string, LevelData> = {
  A1: {
    emoji: '🐣',
    topics: [
      {
        title: 'Alphabet & Sounds',
        explanation: 'The English alphabet has 26 letters. Understanding basic sounds helps with pronunciation and spelling.',
        rules: ['A–Z uppercase and lowercase', 'Vowels: a, e, i, o, u (sometimes y)', 'Consonants: all other letters', 'Stress usually falls on the first syllable in simple words'],
        examples: ['Apple – /ˈæp.əl/', 'Computer – /kəmˈpjuː.tər/', 'Happy – /ˈhæp.i/'],
      },
      {
        title: 'Verb "to be"',
        explanation: 'The verb "to be" is the most important verb in English. It describes identity, characteristics, and location.',
        rules: ['I am / You are / He–She–It is / We are / They are', 'Negative: I am not / He isn\'t / They aren\'t', 'Question: Are you…? / Is she…?'],
        examples: ['I am a student.', 'She is happy.', 'They are at home.', 'Are you hungry?'],
      },
      {
        title: 'Personal Pronouns',
        explanation: 'Personal pronouns replace nouns to avoid repetition.',
        rules: ['Subject pronouns: I, you, he, she, it, we, they', 'Object pronouns: me, you, him, her, it, us, them'],
        examples: ['She likes coffee. → She likes it.', 'I saw Tom. → I saw him.'],
      },
      {
        title: 'Articles: a / an / the',
        explanation: 'Articles are used before nouns to indicate specificity.',
        rules: ['a + consonant sound: a book, a university', 'an + vowel sound: an apple, an hour', 'the for specific or unique things: the sun, the book on the table', 'No article for general plurals/uncountables: Dogs bark. Water is clean.'],
        examples: ['I read a book.', 'She ate an orange.', 'The cat is sleeping.', 'I love music.'],
      },
      {
        title: 'Singular & Plural Nouns',
        explanation: 'Most English nouns form plurals by adding -s or -es.',
        rules: ['Regular: add -s (cat → cats)', 'After s, x, ch, sh: add -es (bus → buses, box → boxes)', 'Consonant + y: change y to i + es (baby → babies)', 'Irregular: man → men, child → children, foot → feet'],
        examples: ['dog → dogs', 'city → cities', 'woman → women'],
      },
      {
        title: 'Possessives',
        explanation: 'Possessive adjectives and \'s show ownership.',
        rules: ['Possessive adjectives: my, your, his, her, its, our, their', '\'s for people/animals: Sarah\'s book, the dog\'s tail', 'Plural noun ending in s: add only \': the teachers\' lounge'],
        examples: ['This is my pen.', 'John\'s car is red.', 'The girls\' room is upstairs.'],
      },
      {
        title: 'Demonstratives: this / that / these / those',
        explanation: 'Demonstratives indicate specific objects near or far from the speaker.',
        rules: ['this (singular, near) / that (singular, far)', 'these (plural, near) / those (plural, far)'],
        examples: ['This is my phone. (near)', 'That is her house. (far)', 'These apples are fresh.', 'Those cars are expensive.'],
      },
      {
        title: 'Present Simple',
        explanation: 'Used for habits, routines, and permanent situations.',
        rules: ['Add -s/-es for he/she/it: She works.', 'Negative: don\'t / doesn\'t + base verb', 'Question: Do/Does + subject + base verb?'],
        examples: ['I wake up at 7 AM.', 'He doesn\'t like coffee.', 'Do they live here?'],
      },
      {
        title: 'Questions in Present Simple',
        explanation: 'Forming questions helps you gather information.',
        rules: ['Yes/No questions: Do/Does + subject + verb?', 'Wh-questions: Wh-word + do/does + subject + verb?'],
        examples: ['Do you speak English?', 'Where does she work?', 'What do they eat?'],
      },
      {
        title: 'Basic Negatives',
        explanation: 'Negation lets you say what is not true.',
        rules: ['Use do not (don\'t) / does not (doesn\'t) for most verbs', 'am not, is not (isn\'t), are not (aren\'t) for "to be"', 'never, not + can for ability negation'],
        examples: ['I don\'t like tea.', 'She isn\'t tired.', 'They don\'t play football.', 'He can\'t swim.'],
      },
      {
        title: 'There is / There are',
        explanation: 'Used to say that something exists.',
        rules: ['There is + singular/uncountable noun', 'There are + plural noun', 'Negative: There isn\'t / There aren\'t', 'Question: Is there…? / Are there…?'],
        examples: ['There is a cat on the roof.', 'There are three books.', 'Is there a bank nearby?', 'There aren\'t any cars.'],
      },
      {
        title: 'Basic Prepositions',
        explanation: 'Prepositions show relationships of time, place, and direction.',
        rules: ['in (enclosed space), on (surface), under (below)', 'at (specific point), near (close to), next to (beside)'],
        examples: ['The keys are in my bag.', 'The cup is on the table.', 'The cat is under the chair.', 'I live at 12 Main Street.'],
      },
      {
        title: 'Can / Can\'t',
        explanation: '"Can" expresses ability, possibility, and permission.',
        rules: ['can + base verb for ability', 'can\'t = cannot for inability or strong impossibility', 'Questions: Can you…?', 'All forms are the same for all subjects'],
        examples: ['I can play piano.', 'She can\'t come tomorrow.', 'Can you help me?', 'They can speak French.'],
      },
      {
        title: 'Imperatives',
        explanation: 'Imperatives give instructions, orders, or invitations.',
        rules: ['Base verb without a subject (you is implied)', 'Negative: Don\'t + base verb', 'Use Please for politeness'],
        examples: ['Open the door.', 'Don\'t run!', 'Please sit down.', 'Listen carefully.'],
      },
      {
        title: 'Basic Adjectives',
        explanation: 'Adjectives describe nouns and tell us more about them.',
        rules: ['Usually come before the noun: a big house', 'Or after "to be": The house is big.', 'Common adjectives: big, small, beautiful, good, bad, happy, sad'],
        examples: ['She is happy.', 'It is a cold day.', 'He has a blue car.'],
      },
      {
        title: 'Comparatives (basic)',
        explanation: 'Comparatives compare two things.',
        rules: ['Short adjective: add -er (tall → taller)', 'Long adjective: use more (beautiful → more beautiful)', 'Irregular: good → better, bad → worse, far → farther'],
        examples: ['My car is faster than yours.', 'She is taller than me.', 'This is more interesting.'],
      },
    ],
  },
  A2: {
    emoji: '🌱',
    topics: [
      {
        title: 'Past Simple',
        explanation: 'Past Simple describes completed actions at a specific time in the past.',
        rules: ['Regular verbs: add -ed (walked, played)', 'Irregular verbs have unique forms (went, ate, saw)', 'Negative: didn\'t + base verb', 'Time markers: yesterday, last week, in 2020'],
        examples: ['I visited Paris last year.', 'She didn\'t watch TV.', 'They played football yesterday.'],
      },
      {
        title: 'Future with "going to"',
        explanation: '"Going to" expresses plans, intentions, and predictions based on present evidence.',
        rules: ['am/is/are + going to + base verb', 'Negative: am/is/are + not + going to + base verb', 'Used for plans and predictions (see smoke → going to fire)'],
        examples: ['I am going to study medicine.', 'She isn\'t going to travel.', 'Look! It\'s going to rain.'],
      },
      {
        title: 'Present Continuous',
        explanation: 'Present Continuous describes actions happening now or around now.',
        rules: ['am/is/are + verb-ing', 'Negative: am/is/are + not + verb-ing', 'Question: Am/Is/Are + subject + verb-ing?', 'Many verbs ending in -e drop e first (write → writing)'],
        examples: ['I am learning Spanish.', 'She isn\'t working.', 'Are they coming?', 'He is writing a letter.'],
      },
      {
        title: 'Present Simple vs Continuous',
        explanation: 'Present Simple is for habits; Present Continuous is for temporary/ongoing actions.',
        rules: ['Simple: habits, routines, permanent situations', 'Continuous: actions happening now, temporary situations, changing situations', 'Stative verbs (know, like, love) are usually NOT continuous'],
        examples: ['I live in Kyiv. (permanent)', 'I\'m staying with friends. (temporary)', 'She knows the answer. (stative)', 'I\'m thinking about it. (action)'],
      },
      {
        title: 'Countable & Uncountable Nouns',
        explanation: 'Countable nouns can be counted; uncountable nouns cannot.',
        rules: ['Countable: a book, two books, many books', 'Uncountable: some water, much money, a piece of advice', 'Some can be both: a chicken (live) / some chicken (food)'],
        examples: ['I have three cats.', 'She drinks much tea.', 'There is some rice.', 'I need a piece of information.'],
      },
      {
        title: 'Some / Any',
        explanation: 'Used with plural and uncountable nouns in questions, negatives, and positives.',
        rules: ['Some: positive sentences, offers/requests', 'Any: negative sentences and questions', 'Can be used with countable and uncountable nouns'],
        examples: ['I have some questions.', 'Do you have any brothers?', 'There isn\'t any milk.', 'Would you like some coffee?'],
      },
      {
        title: 'Much / Many / A lot of',
        explanation: 'Quantifiers tell us about quantity.',
        rules: ['Much + uncountable (in questions/negatives)', 'Many + countable (in questions/negatives)', 'A lot of + any noun (positive, questions, negatives)', 'How much/How many for questions'],
        examples: ['How much sugar?', 'How many people?', 'I don\'t have many friends.', 'She has a lot of patience.'],
      },
      {
        title: 'Comparative & Superlative',
        explanation: 'Comparatives compare two things; superlatives compare three or more.',
        rules: ['One syllable: taller, fastest', 'Two syllables ending in -y: happier, the happiest', 'Two+ syllables: more beautiful, the most beautiful', 'Irregular: good → better → best, bad → worse → worst'],
        examples: ['He is the tallest.', 'This is the most interesting book.', 'She runs faster than me.'],
      },
      {
        title: 'Adverbs of Frequency',
        explanation: 'Adverbs of frequency describe how often something happens.',
        rules: ['Order: always (100%) → usually → often → sometimes → rarely → never (0%)', 'Position: before main verb but after "to be"', 'Also: every day, once a week'],
        examples: ['I always drink coffee.', 'She is usually late.', 'They often travel.', 'He never eats meat.'],
      },
      {
        title: 'Modal Verbs: must / should / have to',
        explanation: 'Modals express necessity, advice, and obligation.',
        rules: ['must: strong obligation (personal rule)', 'have to: external obligation (law, rules)', 'should: advice, recommendation', 'All modals + base verb (no to)'],
        examples: ['You must wear a seatbelt. (law)', 'I have to work tomorrow. (boss\'s rule)', 'You should see a doctor.', 'He must study harder.'],
      },
      {
        title: 'Basic Conditionals',
        explanation: 'Conditionals talk about possible or imaginary situations.',
        rules: ['Zero Conditional: If + present, present (general truth)', 'First Conditional: If + present, will + verb (real future)', 'If-clause can come first or second'],
        examples: ['If you heat ice, it melts. (zero)', 'If it rains, I will stay home. (first)', 'I\'ll call you if I finish early.'],
      },
      {
        title: 'Object Pronouns',
        explanation: 'Object pronouns replace the object of a verb or preposition.',
        rules: ['me, you, him, her, it, us, them', 'Used after verbs: I saw him.', 'Used after prepositions: with me, for her'],
        examples: ['Give me the book.', 'She called us.', 'I\'m thinking about it.'],
      },
      {
        title: 'Gerunds & Infinitives (basic)',
        explanation: 'Gerunds (-ing) and infinitives (to + verb) can function as nouns.',
        rules: ['Like + gerund OR like + to-infinitive', 'Some verbs only take gerund: enjoy, mind, suggest, finish', 'Some verbs only take infinitive: want, decide, hope, plan'],
        examples: ['I like swimming.', 'She enjoys reading.', 'I want to go home.', 'He decided to leave.'],
      },
    ],
  },
  B1: {
    emoji: '🚀',
    topics: [
      {
        title: 'Present Perfect',
        explanation: 'Present Perfect connects past actions/experiences to the present.',
        rules: ['have/has + past participle (V3)', 'For experiences, actions without a specific time, or actions continuing to now', 'Negative: haven\'t/hasn\'t + V3', 'Question: Have/Has + subject + V3?', 'Time markers: already, yet, just, ever, never, since, for'],
        examples: ['I have visited Japan twice.', 'She has lived here since 2020.', 'Have you ever tried sushi?', 'They haven\'t finished yet.'],
      },
      {
        title: 'Present Perfect vs Past Simple',
        explanation: 'Both refer to the past, but with different emphasis.',
        rules: ['Past Simple: finished past time (I saw him yesterday)', 'Present Perfect: indefinite past or connection to now (I have seen that movie)', 'Use Past Simple with "yesterday, last week, in 2019"', 'Use Present Perfect with "already, yet, since, for, ever, never"'],
        examples: ['I ate breakfast. (specific time)', 'I have eaten breakfast. (relevant to now)', 'She left at 9 AM.', 'She has left. (she is not here now)'],
      },
      {
        title: 'Future Forms (will / going to / present continuous)',
        explanation: 'English has several ways to talk about the future.',
        rules: ['will: spontaneous decision, prediction, promise', 'be going to: plan/intention, prediction based on evidence', 'present continuous: fixed arrangement (usually with time expressions)', 'future continuous: action in progress at a future time'],
        examples: ['I\'ll help you. (spontaneous)', 'I\'m going to learn guitar. (plan)', 'I\'m meeting him at 5 PM. (arrangement)', 'At 8 PM, I\'ll be watching TV.'],
      },
      {
        title: 'First Conditional',
        explanation: 'First conditional describes real possible situations in the future.',
        rules: ['If + present simple, will + base verb', 'If + present, may/might/can + verb', 'Unless = if not', 'Imperative in the main clause for orders'],
        examples: ['If it rains, we\'ll cancel the picnic.', 'If you study hard, you will pass.', 'I\'ll call you unless something happens.', 'Call me if you need help.'],
      },
      {
        title: 'Second Conditional',
        explanation: 'Second conditional describes unreal or unlikely situations in the present/future.',
        rules: ['If + past simple, would + base verb', 'Were is used for all subjects in formal English: If I were…', 'Could / might in the main clause for possibility', 'If I had money → hypothetical'],
        examples: ['If I had wings, I would fly.', 'If she were here, she would know.', 'If I won the lottery, I would travel.', 'I would buy a house if I could.'],
      },
      {
        title: 'Passive Voice (basic)',
        explanation: 'In the passive voice, the object becomes the subject of the sentence.',
        rules: ['am/is/are + past participle (V3)', 'was/were + V3 (past)', 'Present perfect: has/have been + V3', 'Used when the action is more important than who does it'],
        examples: ['The letter was sent yesterday.', 'English is spoken worldwide.', 'The cake was eaten.', 'The book has been translated.'],
      },
      {
        title: 'Reported Speech (basic)',
        explanation: 'Reported speech tells what someone said without quoting directly.',
        rules: ['Present → past (He said he is happy → He said he was happy.)', 'can → could, will → would, am/is/are → was/were', 'that is optional in statements', 'Yes/No questions: if/whether + question word order', 'Wh-questions keep the wh-word'],
        examples: ['She said she was tired.', 'He told me that he would come.', 'She asked if I was ready.', 'They wanted to know where I lived.'],
      },
      {
        title: 'Relative Clauses (who, which, that)',
        explanation: 'Relative clauses give more information about a person or thing.',
        rules: ['who = people', 'which = things/animals', 'that = people or things (informal)', 'Defining clause (no comma) = essential info', 'Non-defining clause (with commas) = extra info'],
        examples: ['The man who called you is here.', 'The book which I bought is great.', 'That\'s the restaurant that serves vegan food.', 'My brother, who lives in Berlin, is visiting.'],
      },
      {
        title: 'Modals of Advice & Obligation',
        explanation: 'Modals express necessity, permission, and advice.',
        rules: ['must: personal obligation', 'have to: rule/authority', 'should / ought to: advice (weak obligation)', 'don\'t have to / needn\'t: no obligation'],
        examples: ['You must try this. (strong recommendation)', 'I have to wear a uniform. (company rule)', 'You should see a doctor.', 'You don\'t have to come if you\'re busy.'],
      },
      {
        title: 'Quantifiers',
        explanation: 'Quantifiers describe an amount or number.',
        rules: ['a lot of / lots of: any noun, any sentence', 'enough: after the noun (money enough / enough money)', 'too much/too many + noun (negative)', 'All / most / some / any / no + noun', 'every / each + singular noun'],
        examples: ['There are too many people.', 'I have enough time.', 'All students must attend.', 'Each book has a cover.'],
      },
      {
        title: 'Phrasal Verbs (basic)',
        explanation: 'A verb + particle (preposition/adverb) changes meaning.',
        rules: ['Separable: turn on / turn it on / turn it on quickly', 'Inseparable: look after, run into', 'Some change the meaning completely: give up, take off, put on'],
        examples: ['She turned on the light.', 'He looked after his sister.', 'They gave up smoking.', 'The plane took off.'],
      },
      {
        title: 'Used to',
        explanation: '"Used to" describes past habits or states that are no longer true.',
        rules: ['used to + base verb', 'Negative: didn\'t use to', 'Question: Did you use to…?', 'Be/get used to + noun/gerund: accustomed to'],
        examples: ['I used to walk to school.', 'He didn\'t use to drink coffee.', 'She is used to waking up early.', 'It took me a while to get used to it.'],
      },
      {
        title: 'Too / Enough',
        explanation: '"Too" and "enough" express degree or quantity.',
        rules: ['Too + adjective/adverb: more than needed (too big, too quickly)', 'Enough after adjective/adverb: sufficient (big enough, quickly enough)', 'Enough + noun: sufficient amount (enough time, enough people)'],
        examples: ['The box is too heavy.', 'He is tall enough.', 'We have enough chairs.', 'She ran fast enough.'],
      },
    ],
  },
  B2: {
    emoji: '⚡',
    topics: [
      {
        title: 'Passive Voice (advanced)',
        explanation: 'Advanced passive forms include modals, perfect tenses, and reporting structures.',
        rules: ['modal + be + V3: The work must be finished.', 'Present perfect passive: has/have been + V3', 'Past perfect passive: had been + V3', 'Reported speech passive: He said the work had been done', 'Causative: have something done'],
        examples: ['The report should be submitted today.', 'The bridge had been built by 1990.', 'I had my hair cut.', 'The thief was believed to have escaped.'],
      },
      {
        title: 'Reported Speech (advanced)',
        explanation: 'Reported speech includes questions, commands, and modal shifts.',
        rules: ['Commands: He told me to open it.', 'Prohibitions: She told him not to go.', 'Modals: can → could, must → had to / would have to', 'Time shifts: now → then, today → that day, yesterday → the day before'],
        examples: ['She asked me where I lived.', 'He ordered them to leave immediately.', 'He said he had to go.', 'She told me she would meet me.'],
      },
      {
        title: 'Third Conditional',
        explanation: 'Third conditional imagines different past results — things that did not happen.',
        rules: ['If + past perfect, would have + V3', 'Also: could have / might have / should have + V3', 'Mixed conditional: If + past perfect, would + base (past condition → present result)'],
        examples: ['If I had studied, I would have passed.', 'If you had told me, I could have helped.', 'If I hadn\'t eaten, I would be hungry now.'],
      },
      {
        title: 'Mixed Conditionals',
        explanation: 'Mixed conditionals combine different times: past condition + present result, or present/future condition + past result.',
        rules: ['Past condition + present result: If + past perfect, would + base verb', 'The condition is impossible now, but the result still affects the present'],
        examples: ['If I had studied medicine, I would be a doctor now. (I didn\'t study → I\'m not a doctor)', 'If she had married him, she would be living in Paris.'],
      },
      {
        title: 'Modal Verbs for Deduction',
        explanation: 'Modals express certainty or possibility about past/present situations.',
        rules: ['Present deduction: must be, can\'t be, might/could be', 'Past deduction: must have + V3, can\'t/couldn\'t have + V3, might/may/could have + V3', 'Strong certainty → must; weak → might/could; negative certainty → can\'t'],
        examples: ['She must be at home. (I\'m sure)', 'He can\'t be serious.', 'They must have left already.', 'She might have missed the train.'],
      },
      {
        title: 'Future Perfect',
        explanation: 'Future Perfect describes something that will be finished before a certain future time.',
        rules: ['will + have + past participle (V3)', 'By + time expression', 'Negative: won\'t have + V3', 'Question: Will + subject + have + V3?'],
        examples: ['By 2030, I will have graduated.', 'She will have finished the work by then.', 'Will they have arrived by 10 PM?'],
      },
      {
        title: 'Future Continuous',
        explanation: 'Future Continuous describes an action in progress at a specific future time.',
        rules: ['will + be + verb-ing', 'For polite inquiries about future plans', 'Often with: at this time tomorrow, when you arrive'],
        examples: ['This time tomorrow, I\'ll be flying to Rome.', 'I\'ll be working at 6 PM.', 'Will you be using the car tonight?'],
      },
      {
        title: 'Past Continuous vs Past Perfect',
        explanation: 'Past Continuous sets the scene; Past Perfect shows the earlier action.',
        rules: ['Past Continuous: was/were + -ing (background action)', 'Past Perfect: had + V3 (action that happened before)', 'Past Perfect Continuous: had been + -ing (duration before another past action)'],
        examples: ['I was reading when she called. (interrupted action)', 'I had read the book before she gave it to me. (first)', 'She had been waiting for an hour when I arrived.'],
      },
      {
        title: 'Relative Clauses (advanced)',
        explanation: 'Advanced relative clauses include relative adverbs, reduced clauses, and participle clauses.',
        rules: ['where (places), when (times), why (reasons)', 'Reduced: The man talking to Mary is my boss.', 'Preposition at end: the person I spoke to', 'whose for possession'],
        examples: ['That\'s the house where I grew up.', 'The day when we met was special.', 'The man whose bike was stolen called.', 'The book I bought is interesting.'],
      },
      {
        title: 'Inversion (basic)',
        explanation: 'Inversion changes normal word order — the verb comes before the subject.',
        rules: ['Negative adverbial at sentence start: Never have I…, Rarely does…, Not only… but also', 'Conditional inversion: Had I known…, Were I you…', 'So / Neither / Nor at start for agreement'],
        examples: ['Never have I seen such a mess.', 'Rarely does he go out.', 'Had I known, I would have helped.', 'So do I.'],
      },
      {
        title: 'Complex Linking Words',
        explanation: 'Linking words connect ideas and show relationships.',
        rules: ['Contrast: although, despite, whereas, even though', 'Reason: because, due to, since, as', 'Result: therefore, thus, consequently, so', 'Addition: moreover, furthermore, in addition'],
        examples: ['Although it rained, we went out.', 'Despite the rain, we went out.', 'It was late; therefore, we left.', 'She\'s smart; moreover, she\'s hardworking.'],
      },
      {
        title: 'Advanced Phrasal Verbs',
        explanation: 'Many phrasal verbs have idiomatic meanings that differ from the base verb.',
        rules: ['Separable vs inseparable: check a dictionary', 'Some have 3+ meanings: take off (remove clothes / leave / succeed)', 'Many are common in informal English'],
        examples: ['Can you fill in the form?', 'She broke down crying.', 'He came across an old photo.', 'Put on your coat.', 'Give in to pressure.'],
      },
      {
        title: 'Advanced Articles',
        explanation: 'Articles are tricky beyond the basics.',
        rules: ['抽象名词通常不加冠词: Love is beautiful.', 'the + adjective = a group: the rich, the elderly', 'unique things: the sun, the internet', 'Meals without article: I had breakfast.', 'Institutions: in prison, at school (as a user)'],
        examples: ['The rich should help the poor.', 'She is in hospital. (as patient)', 'He goes to school. (as student)', 'Life is beautiful.'],
      },
    ],
  },
  C1: {
    emoji: '🌟',
    topics: [
      {
        title: 'Advanced Inversion',
        explanation: 'Inversion for emphasis, formality, and literary style.',
        rules: ['Not only… but also: Not only did she win, but…', 'Hardly / Scarcely / Barely + past simple, when…', 'Only after/before/if/when + clause, auxiliary + subject', 'On no account / Under no circumstances + auxiliary + subject'],
        examples: ['Hardly had I sat down when the phone rang.', 'Only after reading it twice did I understand.', 'On no account should you open this.'],
      },
      {
        title: 'Cleft Sentences',
        explanation: 'Cleft sentences emphasize a specific part of a sentence.',
        rules: ['It + be + emphasized part + who/that/which + rest', 'Wh- cleft: What I need is a break.', 'All cleft: All I want is peace.'],
        examples: ['It was John who broke the window. (not Mary)', 'It is in Paris that I met her.', 'What she said was very kind.', 'All you need is love.'],
      },
      {
        title: 'Advanced Discourse Markers',
        explanation: 'Discourse markers structure text and manage conversation.',
        rules: ['Admittedly, Needless to say, Be that as it may', 'On the contrary, Having said that', 'To cut a long story short, All in all', 'Frankly, To be honest, In my view'],
        examples: ['Needless to say, I was disappointed.', 'Having said that, I still believe it.', 'On the contrary, I think it\'s great.', 'To be honest, I don\'t know.'],
      },
      {
        title: 'Nominalization',
        explanation: 'Turning verbs or adjectives into nouns for a more formal style.',
        rules: ['decide → decision, strong → strength, to analyze → analysis', 'Often used in academic and formal writing', 'Helps make sentences more compact and objective'],
        examples: ['We decided → We made a decision.', 'They improved → They showed an improvement.', 'She demonstrated → She gave a demonstration.'],
      },
      {
        title: 'Advanced Conditionals',
        explanation: 'Mixed conditionals and subtle conditional uses.',
        rules: ['Mixed: 2nd + 3rd conditionals together', 'Conditionals in reported speech', 'Conditionals with modals: might have, would have', 'Unless, provided (that), as long as'],
        examples: ['If I had studied harder, I would have a better job now.', 'If you had seen it, you would understand.', 'I wouldn\'t say that unless I were sure.'],
      },
      {
        title: 'Ellipsis & Substitution',
        explanation: 'Omitting words that are understood from context, or replacing them.',
        rules: ['Ellipsis: So do I / Neither can she / I will if you will.', 'One/ones: The red one, the bigger ones', 'Do/so: I love jazz. – So do I. / I hope so.'],
        examples: ['She can speak French. – So can I.', 'I don\'t like it. – Neither do I.', 'That was a good movie. – Yes, it was a good one.', 'Is it working? – It looks like it might be.'],
      },
      {
        title: 'Hedging Language',
        explanation: 'Hedging makes statements less direct, more cautious, and polite.',
        rules: ['Modal-like: may, might, could, would', 'Adverbs: apparently, arguably, presumably, essentially', 'Verbs: seem, appear, tend to, suggest', 'Phrases: It could be argued that…, Based on…, If I\'m not mistaken'],
        examples: ['It could be argued that social media harms mental health.', 'He apparently left early.', 'This would suggest a change.', 'I tend to agree, but…'],
      },
      {
        title: 'Advanced Modal Nuances',
        explanation: 'Subtle differences between similar modals for precision.',
        rules: ['may/might: slight possibility / permission', 'could: ability in the past / polite request', 'should/ought to: advice / expectation', 'must (deduction) vs have to (obligation)', 'would (habitual past) vs used to'],
        examples: ['He may come later. (possible)', 'Could you pass the salt? (polite)', 'She should be here by now. (expected)', 'I would always walk to school.'],
      },
      {
        title: 'Formal vs Informal Grammar',
        explanation: 'Grammar choices change depending on register (formal vs informal).',
        rules: ['Formal: contracted negatives avoided (do not instead of don\'t)', 'Nominalizations, passive voice, complex sentences — formal', 'Phrasal verbs, contracted forms, imperatives — informal', 'Conditional modals (would, could) soften requests formally'],
        examples: ['Formal: I would be grateful if you could…', 'Informal: Can you…?', 'Formal: We regret to inform you…', 'Informal: Sorry to say…'],
      },
      {
        title: 'Complex Participle Clauses',
        explanation: 'Participle clauses add information concisely.',
        rules: ['Present participle (-ing): active meaning (Walking home, I saw… → While I was walking)', 'Past participle (-ed/-en): passive meaning (Injured in the crash, she was taken…)', 'Having + V3: earlier action (Having finished, she left)', 'Absolute phrases: Weather permitting, we\'ll go.'],
        examples: ['Having lived abroad, she speaks well.', 'Known for his kindness, he is respected.', 'Weather permitting, we will have the event.', 'The report having been approved, we proceeded.'],
      },
    ],
  },
  C2: {
    emoji: '🏆',
    topics: [
      {
        title: 'Stylistic Inversion',
        explanation: 'Inversion used for rhetorical effect in formal or literary contexts.',
        rules: ['Not until / Not since / Not only with inversion after', 'So / Such + auxiliary inversion for emphasis', 'In questions with negative implication', 'Rare in speech, common in writing'],
        examples: ['Not until I arrived did I realize.', 'So quickly did he run that no one caught him.', 'Little did she know the truth.', 'Seldom do we see such skill.'],
      },
      {
        title: 'Rhetorical Structures',
        explanation: 'Patterns used for persuasion and argumentation.',
        rules: ['Anaphora: repetition at the start', 'Chiasmus: reversed structure', 'Antithesis: contrasting ideas', 'Rhetorical questions', 'Parallelism: balanced structures'],
        examples: ['We shall fight on the beaches… (anaphora)', 'He makes a living; he has a life. (antithesis)', 'If not us, who? If not now, when? (rhetorical)', 'She likes reading, he likes writing, and I like talking. (parallelism)'],
      },
      {
        title: 'Highly Advanced Discourse',
        explanation: 'Managing complex text structure and cohesion across longer passages.',
        rules: ['Cohesive ties: reference, substitution, ellipsis, conjunction', 'Thematic progression: given → new information', 'Signposting: To begin with, In light of this, In conclusion', 'Cross-reference: As mentioned above, This being said'],
        examples: ['Having discussed X, we now turn to Y.', 'This, however, is not the whole story.', 'Insofar as these conditions apply, the model holds.', 'Paradoxically, the result was the opposite.'],
      },
      {
        title: 'Register Shifting',
        explanation: 'Choosing the right level of formality for audience and purpose.',
        rules: ['Five main registers: frozen, formal, consultative, casual, intimate', 'Formal: nominalizations, passives, Latinate vocabulary', 'Casual: phrasal verbs, contractions, ellipsis', 'Register mismatch causes communication problems'],
        examples: ['Formal: It is requested that…', 'Casual: Could you…?', 'Frozen: I do (wedding vow)', 'Intimate: Wanna grab a bite?'],
      },
      {
        title: 'Literary Grammar',
        explanation: 'Grammar devices used in literature for artistic effect.',
        rules: ['Stream of consciousness: no standard sentence boundaries', 'Anacoluthon: sudden break in sentence structure', 'Aposiopesis: trailing off for dramatic effect', 'Hypotaxis: complex subordination', 'Parataxis: short, equal clauses'],
        examples: ['He ran — and why shouldn\'t he?', 'I will not — I cannot — (aposiopesis)', 'Call me Ishmael. (parataxis)', 'Though he tried, though he wished, in the end… (hypotaxis)'],
      },
      {
        title: 'Advanced Idiomatic Structures',
        explanation: 'Fixed expressions and idioms that follow grammatical rules.',
        rules: ['Idiomatic collocations: make a mistake (not do)', 'Preposition patterns: depend on, interested in, good at', 'Set phrases used as grammatical units: It\'s time we left, I wish I had…'],
        examples: ['She made a decision. (not did)', 'He depends on me.', 'It\'s high time we left.', 'I\'d rather you didn\'t come.'],
      },
      {
        title: 'Subtle Modal Meaning',
        explanation: 'Fine distinctions between modals in specific contexts.',
        rules: ['may vs might for formality and past possibility', 'should for expectation (You should be here by now)', 'must vs have to in deduction', 'would/could for unattainable wishes'],
        examples: ['May I ask…? (formal)', 'He might have known. (remote possibility)', 'You should be home by 8. (I expect it)', 'I wish I could fly.'],
      },
      {
        title: 'Complex Cohesion Devices',
        explanation: 'Words and structures that link ideas across sentences and paragraphs.',
        rules: ['Lexical cohesion: synonymy, collocation, repetition', 'Referencing: this, that, such, the former, the latter', 'Connectives: conversely, notwithstanding, whereby', 'Textual deixis: in the following chapter, as shown above'],
        examples: ['In light of the foregoing, we conclude that…', 'The former increases, the latter decreases.', 'Notwithstanding the difficulties, progress was made.', 'Music, especially jazz, soothes the mind.'],
      },
    ],
  },
}

export default function Grammar() {
  const [selectedLevel, setSelectedLevel] = useState('A1')
  const defaultTopic = grammarData[selectedLevel].topics[0]?.title || ''
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic)
  const [expandedLevel, setExpandedLevel] = useState<string | null>('A1')

  function openTopic(level: string, topicTitle: string) {
    setSelectedLevel(level)
    setSelectedTopic(topicTitle)
    setExpandedLevel(level)
  }

  function toggleLevel(level: string) {
    if (expandedLevel === level) {
      setExpandedLevel(null)
    } else {
      setExpandedLevel(level)
      const first = grammarData[level].topics[0]?.title
      if (first) {
        setSelectedLevel(level)
        setSelectedTopic(first)
      }
    }
  }

  const current = grammarData[selectedLevel]
  const topicObj = current.topics.find((t) => t.title === selectedTopic) || current.topics[0]

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sideTitle}>Levels</h2>
        <nav className={styles.nav}>
          {Object.entries(grammarData).map(([level, data]) => {
            const isExpanded = expandedLevel === level
            return (
              <div key={level} className={styles.levelBlock + (isExpanded ? ' ' + styles.expanded : '')}>
                <button className={styles.levelToggle} onClick={() => toggleLevel(level)}>
                  <span className={styles.levelLabel}><span className={styles.levelEmoji}>{data.emoji ?? ''}</span> {level}</span>
                  <span className={styles.chev + (isExpanded ? ' ' + styles.chevOpen : '')}>▸</span>
                </button>

                <ul className={styles.topicList + (isExpanded ? ' ' + styles.open : '')} aria-hidden={!isExpanded}>
                  {data.topics.map((topic) => (
                    <li key={topic.title}>
                      <button
                        className={
                          styles.topicButton +
                          (selectedLevel === level && selectedTopic === topic.title ? ' ' + styles.active : '')
                        }
                        onClick={() => openTopic(level, topic.title)}
                      >
                        {topic.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </nav>
      </aside>

      <main className={styles.content}>
        <h1 className={styles.title}>Grammar</h1>
        <p className={styles.lead}>
          Mastering grammar gives you the tools to build clear, correct sentences — a foundation for all language
          skills.
        </p>

        <section className={styles.topicView}>
          <h2 className={styles.topicTitle}>{selectedLevel} — {topicObj.title}</h2>
          {topicObj.explanation && (
            <p className={styles.explanation}>{topicObj.explanation}</p>
          )}
          {topicObj.rules && topicObj.rules.length > 0 && (
            <>
              <h3 className={styles.subTitle}>Rules</h3>
              <ul className={styles.topicItems}>
                {topicObj.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {topicObj.examples && topicObj.examples.length > 0 && (
            <>
              <h3 className={styles.subTitle}>Examples</h3>
              <ul className={styles.examplesList}>
                {topicObj.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
    </div>
  )
}