export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category = 'science' | 'history' | 'geography' | 'sports' | 'entertainment' | 'general';

export interface Question {
  id: number;
  category: Category;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  description: string;
  questionCount: number;
}

export const categories: CategoryInfo[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Test your knowledge of physics, chemistry, and biology',
    questionCount: 15,
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'Explore events that shaped our world',
    questionCount: 15,
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Countries, capitals, and landmarks',
    questionCount: 15,
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    description: 'From Olympics to World Cups',
    questionCount: 15,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    description: 'Movies, music, and pop culture',
    questionCount: 15,
  },
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '💡',
    description: 'A mix of everything',
    questionCount: 15,
  },
];

export const difficultyConfig = {
  easy: { label: 'Easy', timePerQuestion: 30, color: 'success' },
  medium: { label: 'Medium', timePerQuestion: 20, color: 'warning' },
  hard: { label: 'Hard', timePerQuestion: 15, color: 'destructive' },
};

export const questions: Question[] = [
  // Science - Easy
  { id: 1, category: 'science', difficulty: 'easy', question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correctAnswer: 0, timeLimit: 30 },
  { id: 2, category: 'science', difficulty: 'easy', question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, timeLimit: 30 },
  { id: 3, category: 'science', difficulty: 'easy', question: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Skin', 'Liver'], correctAnswer: 2, timeLimit: 30 },
  { id: 4, category: 'science', difficulty: 'easy', question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], correctAnswer: 1, timeLimit: 30 },
  { id: 5, category: 'science', difficulty: 'easy', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, timeLimit: 30 },
  
  // Science - Medium
  { id: 6, category: 'science', difficulty: 'medium', question: 'What is the speed of light in vacuum?', options: ['299,792 km/s', '150,000 km/s', '1,080 km/h', '343 m/s'], correctAnswer: 0, timeLimit: 20 },
  { id: 7, category: 'science', difficulty: 'medium', question: 'Which element has the atomic number 79?', options: ['Silver', 'Platinum', 'Gold', 'Copper'], correctAnswer: 2, timeLimit: 20 },
  { id: 8, category: 'science', difficulty: 'medium', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Body'], correctAnswer: 2, timeLimit: 20 },
  { id: 9, category: 'science', difficulty: 'medium', question: 'What type of bond involves sharing electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correctAnswer: 1, timeLimit: 20 },
  { id: 10, category: 'science', difficulty: 'medium', question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correctAnswer: 2, timeLimit: 20 },
  
  // Science - Hard
  { id: 11, category: 'science', difficulty: 'hard', question: 'What is the Heisenberg Uncertainty Principle about?', options: ['Energy conservation', 'Position and momentum', 'Mass-energy equivalence', 'Wave-particle duality'], correctAnswer: 1, timeLimit: 15 },
  { id: 12, category: 'science', difficulty: 'hard', question: 'What is the half-life of Carbon-14?', options: ['5,730 years', '1,000 years', '10,000 years', '100,000 years'], correctAnswer: 0, timeLimit: 15 },
  { id: 13, category: 'science', difficulty: 'hard', question: 'Which particle is responsible for the strong nuclear force?', options: ['Photon', 'Gluon', 'W boson', 'Graviton'], correctAnswer: 1, timeLimit: 15 },
  { id: 14, category: 'science', difficulty: 'hard', question: 'What is the Chandrasekhar limit?', options: ['1.4 solar masses', '2.5 solar masses', '3.2 solar masses', '5.0 solar masses'], correctAnswer: 0, timeLimit: 15 },
  { id: 15, category: 'science', difficulty: 'hard', question: 'What enzyme unwinds DNA during replication?', options: ['DNA Polymerase', 'Helicase', 'Ligase', 'Primase'], correctAnswer: 1, timeLimit: 15 },

  // History - Easy
  { id: 16, category: 'history', difficulty: 'easy', question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2, timeLimit: 30 },
  { id: 17, category: 'history', difficulty: 'easy', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'], correctAnswer: 1, timeLimit: 30 },
  { id: 18, category: 'history', difficulty: 'easy', question: 'Which ancient wonder was located in Egypt?', options: ['Hanging Gardens', 'Colossus', 'Great Pyramid', 'Lighthouse'], correctAnswer: 2, timeLimit: 30 },
  { id: 19, category: 'history', difficulty: 'easy', question: 'What year did the Titanic sink?', options: ['1910', '1912', '1914', '1916'], correctAnswer: 1, timeLimit: 30 },
  { id: 20, category: 'history', difficulty: 'easy', question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'], correctAnswer: 2, timeLimit: 30 },

  // History - Medium
  { id: 21, category: 'history', difficulty: 'medium', question: 'What year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, timeLimit: 20 },
  { id: 22, category: 'history', difficulty: 'medium', question: 'Who was the first Emperor of Rome?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Caligula'], correctAnswer: 1, timeLimit: 20 },
  { id: 23, category: 'history', difficulty: 'medium', question: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correctAnswer: 2, timeLimit: 20 },
  { id: 24, category: 'history', difficulty: 'medium', question: 'Who discovered America in 1492?', options: ['Amerigo Vespucci', 'Christopher Columbus', 'Ferdinand Magellan', 'Vasco da Gama'], correctAnswer: 1, timeLimit: 20 },
  { id: 25, category: 'history', difficulty: 'medium', question: 'What was the name of the ship that carried the Pilgrims?', options: ['Santa Maria', 'Mayflower', 'Victoria', 'Endeavour'], correctAnswer: 1, timeLimit: 20 },

  // History - Hard
  { id: 26, category: 'history', difficulty: 'hard', question: 'What treaty ended World War I?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Vienna', 'Treaty of Ghent'], correctAnswer: 1, timeLimit: 15 },
  { id: 27, category: 'history', difficulty: 'hard', question: 'Who was the last Tsar of Russia?', options: ['Alexander III', 'Nicholas II', 'Peter III', 'Ivan IV'], correctAnswer: 1, timeLimit: 15 },
  { id: 28, category: 'history', difficulty: 'hard', question: 'In what year was the Magna Carta signed?', options: ['1066', '1215', '1492', '1776'], correctAnswer: 1, timeLimit: 15 },
  { id: 29, category: 'history', difficulty: 'hard', question: 'What ancient civilization built Machu Picchu?', options: ['Aztec', 'Maya', 'Inca', 'Olmec'], correctAnswer: 2, timeLimit: 15 },
  { id: 30, category: 'history', difficulty: 'hard', question: 'Who was the longest-reigning British monarch before Elizabeth II?', options: ['Queen Victoria', 'George III', 'Henry VIII', 'Elizabeth I'], correctAnswer: 0, timeLimit: 15 },

  // Geography - Easy
  { id: 31, category: 'geography', difficulty: 'easy', question: 'What is the largest continent?', options: ['Africa', 'North America', 'Asia', 'Europe'], correctAnswer: 2, timeLimit: 30 },
  { id: 32, category: 'geography', difficulty: 'easy', question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correctAnswer: 3, timeLimit: 30 },
  { id: 33, category: 'geography', difficulty: 'easy', question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2, timeLimit: 30 },
  { id: 34, category: 'geography', difficulty: 'easy', question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correctAnswer: 1, timeLimit: 30 },
  { id: 35, category: 'geography', difficulty: 'easy', question: 'Which country has the largest population?', options: ['India', 'USA', 'China', 'Russia'], correctAnswer: 2, timeLimit: 30 },

  // Geography - Medium
  { id: 36, category: 'geography', difficulty: 'medium', question: 'What is the smallest country in the world?', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], correctAnswer: 2, timeLimit: 20 },
  { id: 37, category: 'geography', difficulty: 'medium', question: 'Which desert is the largest hot desert?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], correctAnswer: 2, timeLimit: 20 },
  { id: 38, category: 'geography', difficulty: 'medium', question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, timeLimit: 20 },
  { id: 39, category: 'geography', difficulty: 'medium', question: 'Which mountain is the tallest in the world?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], correctAnswer: 2, timeLimit: 20 },
  { id: 40, category: 'geography', difficulty: 'medium', question: 'How many countries are in Africa?', options: ['44', '54', '64', '74'], correctAnswer: 1, timeLimit: 20 },

  // Geography - Hard
  { id: 41, category: 'geography', difficulty: 'hard', question: 'What is the deepest point in the ocean?', options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Philippine Trench'], correctAnswer: 1, timeLimit: 15 },
  { id: 42, category: 'geography', difficulty: 'hard', question: 'Which country has the most time zones?', options: ['Russia', 'USA', 'France', 'China'], correctAnswer: 2, timeLimit: 15 },
  { id: 43, category: 'geography', difficulty: 'hard', question: 'What is the capital of Kazakhstan?', options: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'], correctAnswer: 1, timeLimit: 15 },
  { id: 44, category: 'geography', difficulty: 'hard', question: 'Which African country was never colonized?', options: ['Ghana', 'Nigeria', 'Ethiopia', 'Kenya'], correctAnswer: 2, timeLimit: 15 },
  { id: 45, category: 'geography', difficulty: 'hard', question: 'What is the driest place on Earth?', options: ['Sahara Desert', 'Death Valley', 'Atacama Desert', 'Antarctic Dry Valleys'], correctAnswer: 3, timeLimit: 15 },

  // Sports - Easy
  { id: 46, category: 'sports', difficulty: 'easy', question: 'How many players are on a soccer team?', options: ['9', '10', '11', '12'], correctAnswer: 2, timeLimit: 30 },
  { id: 47, category: 'sports', difficulty: 'easy', question: 'In which sport would you perform a slam dunk?', options: ['Volleyball', 'Tennis', 'Basketball', 'Handball'], correctAnswer: 2, timeLimit: 30 },
  { id: 48, category: 'sports', difficulty: 'easy', question: 'How many rings are on the Olympic flag?', options: ['3', '4', '5', '6'], correctAnswer: 2, timeLimit: 30 },
  { id: 49, category: 'sports', difficulty: 'easy', question: 'What sport is played at Wimbledon?', options: ['Golf', 'Cricket', 'Tennis', 'Football'], correctAnswer: 2, timeLimit: 30 },
  { id: 50, category: 'sports', difficulty: 'easy', question: 'In which sport do you use a puck?', options: ['Lacrosse', 'Ice Hockey', 'Field Hockey', 'Polo'], correctAnswer: 1, timeLimit: 30 },

  // Sports - Medium
  { id: 51, category: 'sports', difficulty: 'medium', question: 'Which country won the first FIFA World Cup?', options: ['Brazil', 'Argentina', 'Uruguay', 'Italy'], correctAnswer: 2, timeLimit: 20 },
  { id: 52, category: 'sports', difficulty: 'medium', question: 'How many Grand Slam tennis tournaments are there?', options: ['3', '4', '5', '6'], correctAnswer: 1, timeLimit: 20 },
  { id: 53, category: 'sports', difficulty: 'medium', question: 'What is the maximum break in snooker?', options: ['137', '147', '155', '170'], correctAnswer: 1, timeLimit: 20 },
  { id: 54, category: 'sports', difficulty: 'medium', question: 'In which year were the first modern Olympics held?', options: ['1892', '1896', '1900', '1904'], correctAnswer: 1, timeLimit: 20 },
  { id: 55, category: 'sports', difficulty: 'medium', question: 'How long is a marathon in kilometers?', options: ['40.195', '42.195', '44.195', '46.195'], correctAnswer: 1, timeLimit: 20 },

  // Sports - Hard
  { id: 56, category: 'sports', difficulty: 'hard', question: 'Who has won the most Grand Slam titles in tennis (men)?', options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Pete Sampras'], correctAnswer: 2, timeLimit: 15 },
  { id: 57, category: 'sports', difficulty: 'hard', question: 'What is the diameter of a basketball hoop in inches?', options: ['16', '17', '18', '19'], correctAnswer: 2, timeLimit: 15 },
  { id: 58, category: 'sports', difficulty: 'hard', question: 'In cricket, what is a score of 111 called?', options: ['Century', 'Nelson', 'Duck', 'Maiden'], correctAnswer: 1, timeLimit: 15 },
  { id: 59, category: 'sports', difficulty: 'hard', question: 'What country invented golf?', options: ['England', 'Ireland', 'Scotland', 'Netherlands'], correctAnswer: 2, timeLimit: 15 },
  { id: 60, category: 'sports', difficulty: 'hard', question: 'How many dimples are on a standard golf ball?', options: ['252', '336', '392', '482'], correctAnswer: 1, timeLimit: 15 },

  // Entertainment - Easy
  { id: 61, category: 'entertainment', difficulty: 'easy', question: 'What is the name of Mickey Mouse\'s dog?', options: ['Goofy', 'Pluto', 'Donald', 'Max'], correctAnswer: 1, timeLimit: 30 },
  { id: 62, category: 'entertainment', difficulty: 'easy', question: 'Who played Jack in Titanic?', options: ['Brad Pitt', 'Tom Cruise', 'Leonardo DiCaprio', 'Matt Damon'], correctAnswer: 2, timeLimit: 30 },
  { id: 63, category: 'entertainment', difficulty: 'easy', question: 'What is the highest-grossing film of all time?', options: ['Titanic', 'Avengers: Endgame', 'Avatar', 'Star Wars'], correctAnswer: 2, timeLimit: 30 },
  { id: 64, category: 'entertainment', difficulty: 'easy', question: 'Who sang "Thriller"?', options: ['Prince', 'Michael Jackson', 'Whitney Houston', 'Stevie Wonder'], correctAnswer: 1, timeLimit: 30 },
  { id: 65, category: 'entertainment', difficulty: 'easy', question: 'What is the name of Harry Potter\'s owl?', options: ['Errol', 'Hedwig', 'Pigwidgeon', 'Scabbers'], correctAnswer: 1, timeLimit: 30 },

  // Entertainment - Medium
  { id: 66, category: 'entertainment', difficulty: 'medium', question: 'Which film won the Oscar for Best Picture in 2020?', options: ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'], correctAnswer: 2, timeLimit: 20 },
  { id: 67, category: 'entertainment', difficulty: 'medium', question: 'Who directed "Inception"?', options: ['Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese', 'James Cameron'], correctAnswer: 1, timeLimit: 20 },
  { id: 68, category: 'entertainment', difficulty: 'medium', question: 'What year was the first "Star Wars" film released?', options: ['1975', '1977', '1979', '1981'], correctAnswer: 1, timeLimit: 20 },
  { id: 69, category: 'entertainment', difficulty: 'medium', question: 'Which band performed "Bohemian Rhapsody"?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], correctAnswer: 2, timeLimit: 20 },
  { id: 70, category: 'entertainment', difficulty: 'medium', question: 'How many seasons of "Friends" were there?', options: ['8', '9', '10', '11'], correctAnswer: 2, timeLimit: 20 },

  // Entertainment - Hard
  { id: 71, category: 'entertainment', difficulty: 'hard', question: 'Who was the first actor to refuse an Oscar?', options: ['Marlon Brando', 'George C. Scott', 'Katharine Hepburn', 'Dustin Hoffman'], correctAnswer: 1, timeLimit: 15 },
  { id: 72, category: 'entertainment', difficulty: 'hard', question: 'What was the first feature-length animated film?', options: ['Fantasia', 'Snow White', 'Pinocchio', 'Bambi'], correctAnswer: 1, timeLimit: 15 },
  { id: 73, category: 'entertainment', difficulty: 'hard', question: 'Which Beatles album was released first?', options: ['Rubber Soul', 'Help!', 'Please Please Me', 'A Hard Day\'s Night'], correctAnswer: 2, timeLimit: 15 },
  { id: 74, category: 'entertainment', difficulty: 'hard', question: 'What is the name of the fictional metal in Marvel\'s Black Panther?', options: ['Adamantium', 'Vibranium', 'Uru', 'Carbonadium'], correctAnswer: 1, timeLimit: 15 },
  { id: 75, category: 'entertainment', difficulty: 'hard', question: 'Who composed the music for "Jaws"?', options: ['Hans Zimmer', 'John Williams', 'Danny Elfman', 'Howard Shore'], correctAnswer: 1, timeLimit: 15 },

  // General Knowledge - Easy
  { id: 76, category: 'general', difficulty: 'easy', question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correctAnswer: 2, timeLimit: 30 },
  { id: 77, category: 'general', difficulty: 'easy', question: 'What is the capital of Japan?', options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'], correctAnswer: 2, timeLimit: 30 },
  { id: 78, category: 'general', difficulty: 'easy', question: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'], correctAnswer: 2, timeLimit: 30 },
  { id: 79, category: 'general', difficulty: 'easy', question: 'What is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], correctAnswer: 1, timeLimit: 30 },
  { id: 80, category: 'general', difficulty: 'easy', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, timeLimit: 30 },

  // General Knowledge - Medium
  { id: 81, category: 'general', difficulty: 'medium', question: 'What is the hardest natural substance?', options: ['Platinum', 'Titanium', 'Diamond', 'Tungsten'], correctAnswer: 2, timeLimit: 20 },
  { id: 82, category: 'general', difficulty: 'medium', question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], correctAnswer: 1, timeLimit: 20 },
  { id: 83, category: 'general', difficulty: 'medium', question: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], correctAnswer: 2, timeLimit: 20 },
  { id: 84, category: 'general', difficulty: 'medium', question: 'In what year was the Internet invented?', options: ['1969', '1975', '1983', '1991'], correctAnswer: 0, timeLimit: 20 },
  { id: 85, category: 'general', difficulty: 'medium', question: 'What is the currency of Switzerland?', options: ['Euro', 'Swiss Franc', 'Swiss Mark', 'Swiss Dollar'], correctAnswer: 1, timeLimit: 20 },

  // General Knowledge - Hard
  { id: 86, category: 'general', difficulty: 'hard', question: 'What is the fear of long words called?', options: ['Logophobia', 'Hippopotomonstrosesquippedaliophobia', 'Verbophobia', 'Glossophobia'], correctAnswer: 1, timeLimit: 15 },
  { id: 87, category: 'general', difficulty: 'hard', question: 'How many keys does a standard piano have?', options: ['76', '82', '88', '92'], correctAnswer: 2, timeLimit: 15 },
  { id: 88, category: 'general', difficulty: 'hard', question: 'What is the only mammal capable of true flight?', options: ['Flying Squirrel', 'Sugar Glider', 'Bat', 'Colugo'], correctAnswer: 2, timeLimit: 15 },
  { id: 89, category: 'general', difficulty: 'hard', question: 'Which element has the chemical symbol "Sb"?', options: ['Silicon', 'Antimony', 'Silver', 'Sodium'], correctAnswer: 1, timeLimit: 15 },
  { id: 90, category: 'general', difficulty: 'hard', question: 'What is the longest bone in the human body?', options: ['Tibia', 'Humerus', 'Femur', 'Fibula'], correctAnswer: 2, timeLimit: 15 },
];

export const getQuestionsByCategory = (category: Category, difficulty: Difficulty): Question[] => {
  return questions.filter(q => q.category === category && q.difficulty === difficulty);
};

export const getRandomQuestions = (category: Category, difficulty: Difficulty, count: number): Question[] => {
  const filtered = getQuestionsByCategory(category, difficulty);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
};
